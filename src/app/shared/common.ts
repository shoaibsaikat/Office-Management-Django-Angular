import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Common {

    private baseUrl: string = 'http://127.0.0.1:8000/';

    static readonly DETAIL_NORMAL: number = 0;
    static readonly DETAIL_APPROVAL: number = 1;
    static readonly DETAIL_DISTRIBUTION: number = 2;

    constructor(private http: HttpClient) { }

    getBaseUrl(): string {
        return this.baseUrl;
    }

    getHttpHeader(): {} {
        return {
          headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        })}
    }

}