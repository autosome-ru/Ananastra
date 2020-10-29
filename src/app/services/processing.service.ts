import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {
  AnnotationDataBackendModel, AnnotationSnpBackendModel
} from '../models/annotation.model';
import {TfOrCl} from '../models/data.model';
const url = 'http://localhost:5000/api/v1/ananastra';


@Injectable()
export class ProcessingService {
  constructor(private http: HttpClient) {
  }

  startProcessTicket(ticket: string): Observable<object> {
    return this.http.post<object>(`${url}/process/${ticket}`, {});
  }

  getFileStatsByTicket(ticket: string): Observable<AnnotationDataBackendModel> {
    return this.http.get<AnnotationDataBackendModel>(`${url}/ticket/${ticket}`);
  }

  getTableData(ticket: string, tfOrCl: TfOrCl): Observable<AnnotationSnpBackendModel[]> {
    return this.http.get<AnnotationSnpBackendModel[]>(`${url}/result/${ticket}`,
      {params: {result_param: tfOrCl}});
  }
}
