import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL, HTTP_OPTINDS } from '../constants/links';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public getData(partUrl: string): Observable<any> {
    return this.http.get(URL + partUrl);
  }

  public addData(insideUrl: string, obj: any): Observable<any> {
    return this.http.post(URL + insideUrl, obj, HTTP_OPTINDS);
  }

  public updateData(insideUrl: string, obj: any): Observable<any> {
    return this.http.put(URL + insideUrl, obj, HTTP_OPTINDS);
  }

}
