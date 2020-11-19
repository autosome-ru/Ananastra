import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {apiUrl} from '../helpers/constants/urls';
import {TfOrCl} from '../models/data.model';



@Injectable()
export class DownloadService {
  constructor(private http: HttpClient) {
  }

  downloadTable(ticket: string, tfOrCl: TfOrCl,
                isExpanded: boolean,
                format: string): Observable<Blob> {
    return this.http.get(`${apiUrl}/result/${ticket}`,
      {
        responseType: 'blob',
        params: {
          result_param: tfOrCl + (isExpanded ? '' : '_sum'),
          format: 'tsv'
        }});
  }
}
