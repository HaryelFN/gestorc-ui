import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { MyHttp } from 'src/app/security/my-http';
import { environment } from 'src/environments/environment';
import { Pessoa, PessoaNewDTO, Funcionario } from 'src/app/shared/models';

export class FuncionarioFilter {
  nome: string;
  page = 0;
  size = 8;
  sort?: string;
  order?: string;
}

@Injectable()
export class FuncionariosService {

  basePath: string;

  constructor(private myHttp: MyHttp) {
    this.basePath = `${environment.apiUrl}/funcionarios`;
  }

  findById(id: number): Promise<Funcionario> {
    return this.myHttp.get<Funcionario>(`${this.basePath}/${id}`)
      .toPromise()
      .then(response => {
        if (response) {
          this.strToDate(response);
        }
        const obj = response;
        return obj;
      });
  }

  getPageable(filter: FuncionarioFilter): Promise<any> {

    let params = new HttpParams({
      fromObject: {
        page: filter.page.toString(),
        size: filter.size.toString(),
        sort: `${filter.sort},${filter.order}`
      }
    });

    if (filter.nome === undefined) {
      params = params.append('nome', '');
    } else {
      params = params.append('nome', filter.nome);
    }

    return this.myHttp.get<any>(`${this.basePath}?pageable`, { params })
      .toPromise()
      .then(response => {
        const objs = response.content;
        const resultado = {
          objs,
          total: response.totalElements
        };
        return resultado;
      });
  }

  findByDeparmanetoId(id: number): Promise<any[]> {
    return this.myHttp.get<any>(`${this.basePath}/departamento/${id}`).toPromise();
  }

  save(obj: PessoaNewDTO): Promise<Pessoa> {
    return this.myHttp.post<Pessoa>(this.basePath, obj).toPromise();
  }

  update(obj: Pessoa): Promise<Pessoa> {
    return this.myHttp.put<Pessoa>(`${this.basePath}/${obj.id}`, obj).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.myHttp.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }

  isExists(path: string, value: string) {

    let params = new HttpParams();
    if (value === undefined) {
      params = params.append('name', '');
    } else {
      params = params.append('name', value);
    }

    return this.myHttp.get<any>(`${this.basePath}?${path}`, { params }).toPromise();
  }

  private strToDate(f: Funcionario) {

    f.pessoa.dataNascimento = moment(f.pessoa.dataNascimento, 'YYYY-MM-DD').toDate();

    if (f.dataCriacao !== null) {
      f.dataCriacao = moment(f.dataCriacao, 'YYYY-MM-DD').toDate();
    }
    if (f.dataAtualizacao !== null) {
      f.dataAtualizacao = moment(f.dataAtualizacao, 'YYYY-MM-DD').toDate();
    }
  }
}
