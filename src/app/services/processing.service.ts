import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {
  AnnotationDataBackendModel, AnnotationSnpBackendModel
} from '../models/annotation.model';
import {TfOrCl} from '../models/data.model';
import {apiUrl} from '../helpers/constants/urls';



@Injectable()
export class ProcessingService {
  constructor(private http: HttpClient) {
  }

  startProcessTicket(ticket: string): Observable<object> {
    return this.http.post<object>(`${apiUrl}/process/${ticket}`, {});
  }

  getFileStatsByTicket(ticket: string): Observable<AnnotationDataBackendModel> {
    return this.http.get<AnnotationDataBackendModel>(`${apiUrl}/ticket/${ticket}`);
  }

  getTableData(ticket: string, tfOrCl: TfOrCl): Observable<AnnotationSnpBackendModel[]> {
    return this.http.get<AnnotationSnpBackendModel[]>(`${apiUrl}/result/${ticket}`,
      {params: {result_param: tfOrCl}});
  }
}
