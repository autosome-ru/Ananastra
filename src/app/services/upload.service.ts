import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

const url = 'http://localhost:5000/api/v1/ananastra';


@Injectable()
export class UploadService {

  public file = {progress: 0};
  private fileTicket$ = new BehaviorSubject<string>(null);
  private readonly uuid: string;

  constructor(private http: HttpClient) {
    this.uuid = uuidv4();
  }

  getFileTicket(): Observable<string> {
    return this.fileTicket$.asObservable();
  }

  uploadFile(file, body): Observable<number> {
    this.file = {...file, progress: 0};
    return this.http.post<{ticket_id: string}>(`${url}/commit`, body,
      {reportProgress: true, observe: 'events', params: {user_id: this.uuid}}).pipe(
        mergeMap((res) => {
          switch (res.type) {
            case HttpEventType.UploadProgress:
              return of(this.constructLoadedPart(res.loaded, res.total));
            case HttpEventType.Response:
              this.fileTicket$.next(res.body.ticket_id);
              return of(100);
            default:
              return of(this.file.progress);
          }
        },
    ));
  }

  deleteFile(ticket: string): Observable<object> {
    return this.http.delete<object>(`${url}/ticket/${ticket}`, {params : {user_id: this.uuid}});
  }

  constructLoadedPart(loaded: number, total: number): number {
    const part: number = total ?
      (loaded / total * 100 >= 100 ? 100 : loaded / total * 100) : 0;
    this.file.progress = part;
    return part;
  }


}
