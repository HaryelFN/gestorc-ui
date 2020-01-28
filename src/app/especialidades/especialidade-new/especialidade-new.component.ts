import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { EspecialidadeService } from '../especialidades.service';

@Component({
  selector: 'app-especialidade-new',
  templateUrl: './especialidade-new.component.html'
})
export class EspecialidadeNewComponent implements OnInit {

  title: string;
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private service: EspecialidadeService
  ) { }

  ngOnInit() {
    this.title = 'Especialidade';
    this.configForm();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadObj(id);
    }
  }

  loadObj(id: number) {
    this.service.getById(id)
      .then(obj => {
        this.form.get('id').setValue(obj.id);
        this.form.get('nome').setValue(obj.nome);
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
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} cadastrada.` });
        this.form.reset();
        this.submitted = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  updateObj() {
    this.service.update(this.form.value)
      .then(obj => {
        this.form.patchValue(obj);
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} atualizada.` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  get isEdit() {
    return Boolean(this.form.get('id').value);
  }

  get f() {
    return this.form.controls;
  }

  private configForm() {
    this.form = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
    });
  }
}
