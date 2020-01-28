import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { Acao, Objeto } from '../shared/models';
import { MyHttp } from '../security/my-http';

@Injectable()
export class AcaoService {

  basePath: string;

  constructor(private http: MyHttp) {
    this.basePath = `${environment.apiUrl}/acoes`;
  }

  findAll(): Promise<Acao[]> {
    return this.http.get<any>(this.basePath).toPromise();
  }

  findById(id: number): Promise<Acao> {
    return this.http.get<Acao>(`${this.basePath}/${id}`).toPromise();
  }

  findByDepartamentoID(id: number): Promise<Objeto[]> {
    return this.http.get<Objeto[]>(`${this.basePath}/departamento/${id}`)
      .toPromise()
      .then(response => {
        const obj = response;
        obj.forEach(o => {
          this.inToBoolean(o.acoes);
        });
        return obj;
      });
  }

  save(obj: Acao): Promise<Acao> {
    return this.http.post<Acao>(this.basePath, obj).toPromise();
  }

  update(obj: Acao): Promise<Acao> {
    return this.http.put<Acao>(`${this.basePath}/${obj.id}`, obj).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }

  private inToBoolean(list: Acao[]) {
    for (const a of list) {
      a.ativo = (a.ativo === 1 ? true : false);
    }
  }
}

