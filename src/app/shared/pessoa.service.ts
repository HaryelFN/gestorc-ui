import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { MyHttp } from 'src/app/security/my-http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PessoaService {

  basePath: string;

  constructor(private myHttp: MyHttp) {
    this.basePath = `${environment.apiUrl}/v1/pessoas`;
  }

  isExists(path: string, value: string): Promise<any> {

    let params = new HttpParams();
    if (path !== undefined && value !== undefined) {
      params = params.append(path, value);
    }

    return this.myHttp.get<any>(`${this.basePath}/exists`, { params })
      .toPromise()
      .then(response => {
        const obj = response;
        this.strToDate(obj);
        return obj;
      });
  }

  private strToDate(p: any) {
    p.dataNascimento = moment(p.dataNascimento, 'YYYY-MM-DD').toDate();
  }
}
