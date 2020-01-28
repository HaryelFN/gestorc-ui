import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { MyHttp } from 'src/app/security/my-http';
import { environment } from 'src/environments/environment';
import { Pessoa, PessoaNewDTO, Funcionario, Paciente, Prontuario } from 'src/app/shared/models';

// export class PacienteFilter {
//   nome: string;
//   page = 0;
//   size = 8;
//   sort?: string;
//   order?: string;
// }

@Injectable()
export class ProntuarioService {

  basePath: string;

  constructor(private myHttp: MyHttp) {
    this.basePath = `${environment.apiUrl}/v1/prontuarios`;
  }

  // getPageable(filter: PacienteFilter): Promise<any> {

  //   let params = new HttpParams({
  //     fromObject: {
  //       page: filter.page.toString(),
  //       size: filter.size.toString(),
  //       sort: `${filter.sort},${filter.order}`
  //     }
  //   });

  //   if (filter.nome === undefined) {
  //     params = params.append('nome', '');
  //   } else {
  //     params = params.append('nome', filter.nome);
  //   }

  //   return this.myHttp.get<any>(`${this.basePath}?pageable`, { params })
  //     .toPromise()
  //     .then(response => {
  //       const objs = response.content;
  //       const resultado = {
  //         objs,
  //         total: response.totalElements
  //       };
  //       return resultado;
  //     });
  // }

  findByPacienteId(id: number): Promise<Prontuario[]> {
    return this.myHttp.get<Prontuario[]>(`${this.basePath}/paciente/${id}`).toPromise();
  }

  // findByCpf(cpf: string) {
  //   return this.myHttp.get<Paciente>(`${this.basePath}/cpf/${cpf}`)
  //     .toPromise()
  //     .then(response => {
  //       const obj = response;
  //       this.strToDate(obj);
  //       return obj;
  //     });
  // }

  // save(obj: PessoaNewDTO): Promise<Paciente> {
  //   return this.myHttp.post<Paciente>(this.basePath, obj).toPromise();
  // }

  // update(obj: Pessoa): Promise<Paciente> {
  //   return this.myHttp.put<Paciente>(`${this.basePath}/${obj.id}`, obj).toPromise();
  // }

  // private strToDate(p: Paciente) {
  //   p.pessoa.dataNascimento = moment(p.pessoa.dataNascimento, 'YYYY-MM-DD').toDate();
  // }
}
