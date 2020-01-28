import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { Departamento, Pessoa } from '../shared/models';
import { MyHttp } from '../security/my-http';

@Injectable()
export class DepartamentoService {

  basePath: string;

  constructor(private http: MyHttp) {
    this.basePath = `${environment.apiUrl}/departamentos`;
  }

  findAll(): Promise<Departamento[]> {
    return this.http.get<any>(this.basePath).toPromise();
  }

  findById(id: number): Promise<Departamento> {
    return this.http.get<Departamento>(`${this.basePath}/${id}`).toPromise();
  }

  save(obj: any): Promise<Departamento> {
    return this.http.post<Departamento>(this.basePath, obj).toPromise();
  }

  update(dep: any): Promise<Departamento> {
    return this.http.put<Departamento>(`${this.basePath}/${dep.id}`, dep).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }
}
