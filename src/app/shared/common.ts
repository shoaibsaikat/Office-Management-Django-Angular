import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Common {

    private baseUrl: string = 'http://127.0.0.1:8000/';

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