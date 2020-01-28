import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MyHttp } from 'src/app/security/my-http';
import { environment } from 'src/environments/environment';
import { Especialidade } from 'src/app/shared/models';

@Injectable()
export class EspecialidadeService {

  basePath: string;

  constructor(private myHttp: MyHttp) {
    this.basePath = `${environment.apiUrl}/v1/especialidades`;
  }

  getAll(): Promise<Especialidade[]> {
    return this.myHttp.get<Especialidade[]>(`${this.basePath}`).toPromise();
  }

  getById(id: number): Promise<Especialidade> {
    return this.myHttp.get<Especialidade>(`${this.basePath}/${id}`).toPromise();
  }

  getByMedicoId(id: number): Promise<Especialidade[]> {
    return this.myHttp.get<Especialidade[]>(`${this.basePath}/medico/${id}`).toPromise();
  }

  save(obj: Especialidade): Promise<Especialidade> {
    return this.myHttp.post<Especialidade>(this.basePath, obj).toPromise();
  }

  update(obj: Especialidade): Promise<Especialidade> {
    return this.myHttp.put<Especialidade>(`${this.basePath}/${obj.id}`, obj).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.myHttp.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }
}
