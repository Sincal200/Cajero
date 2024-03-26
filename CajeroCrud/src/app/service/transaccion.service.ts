import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransaccionModel } from '../model/transaccion-model';
import { map } from 'rxjs/operators'
import { catchError, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private httpClient: HttpClient) {
  }

  getTransacciones() : Observable<TransaccionModel[]>{
    return this.httpClient.get<TransaccionModel[]>('https://localhost:7077/api/Tran').pipe(map(res => res));
  }

saveTransacciones(request: any): Observable<any> {
  return this.httpClient.post<any>('https://localhost:7077/api/Tran', request).pipe(
    map(resp => resp),
    catchError((error) => {
      return throwError(error);
    })
  );
}

}


