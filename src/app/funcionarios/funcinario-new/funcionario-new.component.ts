import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { MessageService } from 'primeng/components/common/messageservice';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Valid } from '../../shared/validators/valid';
import { FuncionariosService } from '../funcionarios.service';
import { PessoaService } from 'src/app/shared/pessoa.service';

@Component({
  selector: 'app-funcionario-new',
  templateUrl: './funcionario-new.component.html'
})
export class FuncionarioNewComponent implements OnInit {

  pt: any;
  today: Date;

  sexos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ];

  statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false },
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

  title: string;
  form: FormGroup;
  submitted = false;
  loadingFindCep = false;
  closeContrato: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private viacep: NgxViacepService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private service: FuncionariosService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.title = 'Funcionário';
    this.configCalendar();
    this.configForm();
    this.closeContrato = true;
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadObj(id);
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

        this.form.get('pessoa.id').setValue(obj.pessoa.id);
        this.form.get('pessoa.sexo').setValue(obj.pessoa.sexo);
        this.form.get('pessoa.dataNascimento').setValue(obj.pessoa.dataNascimento);
        this.form.get('pessoa.nome').setValue(obj.pessoa.nome);
        this.form.get('pessoa.cpf').setValue(obj.pessoa.cpf);
        this.form.get('pessoa.telefone').setValue(obj.pessoa.telefone);
        this.form.get('pessoa.email').setValue(obj.pessoa.email);

        this.form.get('pessoa.endereco.id').setValue(obj.pessoa.endereco.id);

        this.form.get('pessoa.endereco.cep.id').setValue(obj.pessoa.endereco.cep.id);
        this.form.get('pessoa.endereco.cep.numero').setValue(obj.pessoa.endereco.cep.numero);
        this.form.get('pessoa.endereco.cep.uf').setValue(obj.pessoa.endereco.cep.uf);
        this.form.get('pessoa.endereco.cep.cidade').setValue(obj.pessoa.endereco.cep.cidade);
        this.form.get('pessoa.endereco.bairro').setValue(obj.pessoa.endereco.bairro);

        this.form.get('pessoa.endereco.logradouro').setValue(obj.pessoa.endereco.logradouro);
        this.form.get('pessoa.endereco.numero').setValue(obj.pessoa.endereco.numero);
        this.form.get('pessoa.endereco.complemento').setValue(obj.pessoa.endereco.complemento);

        this.form.get('login').setValue(obj.login);
        this.form.get('ativo').setValue(obj.ativo);
      })
      .catch(erro => this.errorHandler.handle(erro));
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
        this.closeContrato = true;
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
      pessoa: this.formBuilder.group({
        id: [],
        sexo: ['M', Validators.required],
        dataNascimento: [null, Validators.required],
        nome: [null, Validators.required],
        cpf: [null, Validators.required],
        telefone: [null],
        email: [null, [Validators.required, Validators.email]],
        endereco: this.formBuilder.group({
          id: [],
          cep: this.formBuilder.group({
            id: [],
            numero: [null, Validators.required],
            uf: [null, Validators.required],
            cidade: [null, Validators.required]
          }),
          bairro: [null, Validators.required],
          logradouro: [null, Validators.required],
          numero: [null],
          complemento: [null]
        })
      }),
      login: [null, Validators.required],
      ativo: [true, Validators.required],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      confirmSenha: [null, Validators.required]
    }, {
        validator: this.MustMatch('senha', 'confirmSenha')
      });
  }

  // custom validator password and confirmPassword
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  isCpf() {
    if (!Valid.isCpf(this.form.get('pessoa.cpf').value)) {
      this.messageService.add({ key: 'toast', severity: 'warn', summary: 'Atenção', detail: 'CPF Inválido!' });
      this.form.get('pessoa.cpf').setValue(null);
    } else {
      this.service.isExists('isCpf', (this.form.get('pessoa.cpf').value.replace(/[^\d]+/g, '')))
        .catch(erro => {
          this.messageService.add({ key: 'toast', severity: 'warn', summary: 'Atenção', detail: erro.error.mesageUser });
          this.form.get('pessoa.cpf').setValue(null);
        });
    }
  }

  removeChars() {
    this.form.get('pessoa.cpf').setValue(this.form.get('pessoa.cpf').value.replace(/[^\d]+/g, ''));
  }

  isTelefone() {
    if (!Valid.isCpf(this.form.get('pessoa.telefone').value)) {
      this.pessoaService.isExists('isTelefone', this.form.get('pessoa.telefone').value)
        .catch(erro => {
          this.messageService.add({ key: 'toast', severity: 'warn', summary: 'Atenção', detail: `Telefone ${erro.error.mesageUser}` });
        });
    }
  }

  isEmail() {
    if (!Valid.isCpf(this.form.get('pessoa.email').value)) {
      this.pessoaService.isExists('isEmail', this.form.get('pessoa.email').value)
        .catch(erro => {
          this.messageService.add({ key: 'toast', severity: 'warn', summary: 'Atenção', detail: `E-mail ${erro.error.mesageUser}` });
        });
    }
  }

  searchCep() {
    this.loadingFindCep = true;
    this.viacep.buscarPorCep(this.form.get('pessoa.endereco.cep.numero').value).then((endereco: Endereco) => {
      this.form.get('pessoa.endereco.cep.uf').setValue(endereco.uf);
      this.form.get('pessoa.endereco.cep.cidade').setValue(endereco.localidade);
      this.form.get('pessoa.endereco.bairro').setValue(endereco.bairro);
      this.form.get('pessoa.endereco.logradouro').setValue(endereco.logradouro);
      this.form.get('pessoa.endereco.complemento').setValue(endereco.complemento);

      this.loadingFindCep = false;
    }).catch((error: ErroCep) => {
      console.log(error.message);
      this.loadingFindCep = false;
    });
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
