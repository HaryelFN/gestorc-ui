import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { MedicoService } from '../medico.service';
import { EspecialidadeService } from 'src/app/especialidades/especialidades.service';
import { Especialidade } from 'src/app/shared/models';

@Component({
  selector: 'app-medico-new',
  templateUrl: './medico-new.component.html'
})
export class MedicoNewComponent implements OnInit {

  pt: any;
  today: Date;

  sexos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ];

  ufs = [
    { label: 'AC', value: 'AC' },
    { label: 'AL', value: 'AL' },
    { label: 'AP', value: 'AP' },
    { label: 'AM', value: 'AM' },
    { label: 'BA', value: 'BA' },
    { label: 'CE', value: 'CE' },
    { label: 'DF', value: 'DF' },
    { label: 'ES', value: 'ES' },
    { label: 'GO', value: 'GO' },
    { label: 'MA', value: 'MA' },
    { label: 'MT', value: 'MT' },
    { label: 'MS', value: 'MS' },
    { label: 'MG', value: 'MG' },
    { label: 'PA', value: 'PA' },
    { label: 'PB', value: 'PB' },
    { label: 'PR', value: 'PR' },
    { label: 'PE', value: 'PE' },
    { label: 'PI', value: 'PI' },
    { label: 'RJ', value: 'RJ' },
    { label: 'RN', value: 'RN' },
    { label: 'RS', value: 'RS' },
    { label: 'RO', value: 'RO' },
    { label: 'RR', value: 'RR' },
    { label: 'SC', value: 'SC' },
    { label: 'SP', value: 'SP' },
    { label: 'SE', value: 'SE' },
    { label: 'TO', value: 'TO' }
  ];

  loading = false;
  especialidades: any[];

  title: string;
  form: FormGroup;
  submitted = false;
  loadingFindCep = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private service: MedicoService,
    private especService: EspecialidadeService
  ) { }

  ngOnInit() {
    this.title = 'Médico';
    this.configCalendar();
    this.configForm();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadObj(id);
      this.loadEspecialidades(id);
    } else {
      this.loadEspecialidades();
    }
  }

  get isEdit() {
    return Boolean(this.form.get('id').value);
  }

  get f() {
    return this.form.controls;
  }

  loadObj(id: number) {
    this.service.findById(id)
      .then(obj => {

        this.form.get('id').setValue(obj.id);
        this.form.get('ativo').setValue(obj.ativo);
        this.form.get('ufCrm').setValue(obj.ufCrm);
        this.form.get('crm').setValue(obj.crm);
        this.form.get('ativo').setValue(obj.ativo);

        this.form.get('pessoa.id').setValue(obj.pessoa.id);
        this.form.get('pessoa.sexo').setValue(obj.pessoa.sexo);
        this.form.get('pessoa.dataNascimento').setValue(obj.pessoa.dataNascimento);
        this.form.get('pessoa.nome').setValue(obj.pessoa.nome);
        this.form.get('pessoa.telefone').setValue(obj.pessoa.telefone);
        this.form.get('pessoa.email').setValue(obj.pessoa.email);

        obj.especialidades.forEach(e => {
          this.addEspecialidade(e);
        });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  loadEspecialidades(id = 0) {
    this.loading = true;
    this.especService.getAll().then(list => {
      list.forEach(l => {
        this.especialidades = list.map(e => ({ id: e.id, nome: e.nome, checked: false }));

        if (id !== 0 && this.especialidades.length > 0) {
          this.form.get('especialidades').value.forEach(m => {
            this.especialidades.forEach(p => {
              if (m.id === p.id) {
                p.checked = true;
              }
            });
          });
        }

        this.loading = false;
      });
    }).catch(erro => this.errorHandler.handle(erro));
  }

  pagSelected(obj) {
    console.log(obj);
  }

  onSave() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      if (this.isEdit) {
        this.updateObj();
      } else {
        this.addObj();
      }
    }
  }

  addObj() {
    this.service.save(this.form.value)
      .then(() => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} cadastrado.` });
        this.form.reset();
        this.submitted = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  updateObj() {
    this.service.update(this.form.value)
      .then(obj => {
        this.form.patchValue(obj);
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} atualizado.` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private configForm() {
    this.form = this.formBuilder.group({
      id: [],
      ufCrm: [null, Validators.required],
      crm: [null, Validators.required],
      ativo: [true, Validators.required],
      especialidades: this.formBuilder.array([], Validators.min(1)),
      pessoa: this.formBuilder.group({
        id: [],
        sexo: ['M', Validators.required],
        dataNascimento: [null, Validators.required],
        nome: [null, Validators.required],
        telefone: [null],
        email: [null, [Validators.required, Validators.email]],
      })
    });
  }

  initEspecialidade(): FormGroup {
    return this.formBuilder.group({
      id: [null, Validators.required],
      nome: []
    });
  }

  get especialidadeArray() {
    return <FormArray>this.form.get('especialidades');
  }

  addEspecialidade(obj: any) {
    const formGroup = this.initEspecialidade();
    formGroup.get('id').setValue(obj.id);
    formGroup.get('nome').setValue(obj.nome);
    this.especialidadeArray.push(formGroup);
  }

  removeProduto(index) {
    this.especialidadeArray.removeAt(index);
  }

  detectmob() {
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

  private configCalendar() {
    this.today = new Date();

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }
}
