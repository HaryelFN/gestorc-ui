import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { MyHttp } from 'src/app/security/my-http';
import { environment } from 'src/environments/environment';
import { Medico } from 'src/app/shared/models';

export class MedicoFilter {
  nome: string;
  page = 0;
  size = 8;
  sort?: string;
  order?: string;
}

@Injectable()
export class MedicoService {

  basePath: string;

  constructor(private myHttp: MyHttp) {
    this.basePath = `${environment.apiUrl}/v1/medicos`;
  }

  getAll(): Promise<Medico[]> {
    return this.myHttp.get<Medico[]>(`${this.basePath}`).toPromise();
  }

  findById(id: number): Promise<Medico> {
    return this.myHttp.get<Medico>(`${this.basePath}/${id}`)
      .toPromise()
      .then(response => {
        if (response) {
          this.strToDate(response);
        }
        const obj = response;
        return obj;
      });
  }

  getPageable(filter: MedicoFilter): Promise<any> {

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
  save(obj: Medico): Promise<Medico> {
    return this.myHttp.post<Medico>(this.basePath, obj).toPromise();
  }

  update(obj: Medico): Promise<Medico> {
    return this.myHttp.put<Medico>(`${this.basePath}/${obj.id}`, obj).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.myHttp.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }

  private strToDate(m: Medico) {
    if (m.pessoa.dataNascimento !== null) {
      m.pessoa.dataNascimento = moment(m.pessoa.dataNascimento, 'YYYY-MM-DD').toDate();
    }
  }
}
