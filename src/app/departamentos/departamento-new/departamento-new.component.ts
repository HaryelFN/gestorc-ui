import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { DepartamentoService } from '../departamento.service';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { AuthService } from 'src/app/security/auth.service';
import { Departamento } from 'src/app/shared/models';
import { AcaoService } from 'src/app/acoes/acao.service';
import { FuncionarioFilter, FuncionariosService } from 'src/app/funcionarios/funcionarios.service';

@Component({
  selector: 'app-departamento-new',
  templateUrl: './departamento-new.component.html',
  styles: [`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #F9F9F9;
  }
`],
  encapsulation: ViewEncapsulation.None
})
export class DepartamentoNewComponent implements OnInit {

  title: string;
  submitted = false;
  formulario: FormGroup;
  acoesForm: FormArray;

  totalRecords = 0;
  filter = new FuncionarioFilter();
  allFuncionarios = [];
  depPessoas = [];

  displayAddPessoa = false;

  auxDep = {
    id: 0,
    nome: '',
    objetos: [{
      nome: '',
      acoes: [{
        id: 0,
        nome: '',
        descricao: '',
        ativo: {}
      }]
    }],
    funcionarios: [{
      id: 0,
      cpf: '',
      nome: '',
      telefone: ''
    }]
  };

  constructor(
    public auth: AuthService,
    private service: DepartamentoService,
    private acoaService: AcaoService,
    private funcionariosService: FuncionariosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.title = 'Departamento';
    this.configForm();
    this.loadFuncionarios();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadDepartamento(id);
      this.loadFuncionariosByDep(id);
    } else {
      this.loadAcaos();
    }
  }

  onNextPage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.loadFuncionarios(pagina);
  }

  onSave() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    } else {
      if (this.edit) {
        this.updateObj();
      } else {
        this.addObj();
      }
    }
  }

  addObj() {
    this.auxDep.id = this.formulario.get('id').value;
    this.auxDep.nome = this.formulario.get('nome').value;
    this.auxDep.objetos = this.formulario.get('objetos').value;
    this.auxDep.funcionarios = this.depPessoas.map(d => d.id);

    this.auxDep.objetos.forEach(o => {
      for (const a of o.acoes) {
        a.ativo = a.ativo === true ? 1 : 0;
      }
    });

    this.service.save(this.auxDep)
      .then(() => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} adicionado.` });
        this.submitted = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  updateObj() {
    this.auxDep.id = this.formulario.get('id').value;
    this.auxDep.nome = this.formulario.get('nome').value;
    this.auxDep.objetos = this.formulario.get('objetos').value;
    this.auxDep.funcionarios = this.depPessoas.map(d => d.id);

    this.auxDep.objetos.forEach(o => {
      for (const a of o.acoes) {
        a.ativo = a.ativo === true ? 1 : 0;
      }
    });

    this.service.update(this.auxDep).then(obj => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} atualizado.` });
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      objetos: this.formBuilder.array([])
    });
  }

  get edit() {
    return Boolean(this.formulario.get('id').value);
  }

  get f() {
    return this.formulario.controls;
  }

  private loadDepartamento(id: number) {
    this.service.findById(id).then(obj => {
      this.formulario.get('id').setValue(obj.id);
      this.formulario.get('nome').setValue(obj.nome);
      this.loadAcaos(id);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  private loadAcaos(id = 0) {
    this.acoaService.findByDepartamentoID(id).then(objetos => {
      const control = <FormArray>this.formulario.controls.objetos;
      objetos.forEach(o => {
        control.push(this.formBuilder.group({
          nome: o.nome,
          acoes: this.setAcoes(o)
        }));
      });
    }).catch(erro => this.errorHandler.handle(erro));
  }

  private setAcoes(o) {
    const arr = new FormArray([]);
    o.acoes.forEach(a => {
      arr.push(this.formBuilder.group({
        id: a.id,
        nome: a.nome,
        descricao: a.descricao,
        ativo: a.ativo
      }));
    });
    return arr;
  }

  private loadFuncionarios(page = 0, size = 4, sort = 'nome', order = 'asc') {
    this.filter.page = page;
    this.filter.size = size;
    this.filter.sort = sort;
    this.filter.order = order;
    this.funcionariosService.getPageable(this.filter).then(list => {
      this.totalRecords = list.total;
      this.allFuncionarios = list.objs;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  private loadFuncionariosByDep(id: number) {
    this.funcionariosService.findByDeparmanetoId(id).then(list => {
      this.depPessoas = list;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  showDialog() {
    this.displayAddPessoa = true;
  }

  addPessoaList(obj) {
    if (this.depPessoas.includes(obj) === false) {
      this.depPessoas.push(obj);
      this.formulario.markAsDirty();
    }
  }

  removePessoa(obj) {
    this.depPessoas = this.depPessoas.filter(o => o !== obj);
    this.formulario.markAsDirty();
  }

  get detectmob(): boolean {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

}
