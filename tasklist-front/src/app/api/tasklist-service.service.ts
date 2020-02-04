import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasklistServiceService {

  apiRestUrl = 'http://localhost:8080/tasks/';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Array<any>>(this.apiRestUrl);
  }

  criar(task: any) {
    return this.http.post(this.apiRestUrl, task);
  }

  editar(task: any) {
    return this.http.put(this.apiRestUrl + task.id, task);
  }

  deletar(task: any) {
    return this.http.delete(this.apiRestUrl + task.id);
  }

}
