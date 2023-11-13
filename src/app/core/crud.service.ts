import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = this.global.baseUrl + '/v1/api/calculator';
    constructor(private http: HttpClient, private global: Global) {


  }


  save(t: any, url: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + url, t);
  }
  postAny(t: any, url: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + url, t);
  }
  getAny(url: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + url);
  }
  getList(url: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + url);
  }
  getPagination(url: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + url);
  }
  delete(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url);
  }

}
