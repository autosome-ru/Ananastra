import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {UploadService} from '../../../../services/upload.service';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'astra-upload-file-component',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit, OnDestroy {
  @ViewChild('fileDropRef')
  private fileDropRef: HTMLInputElement;
  public fileProgress$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private subscriptions = new Subscription();
  @Output()
  private fileTicketEmitter = new EventEmitter<string>();
  private ticket: string;
  constructor(private uploadService: UploadService) { }


  file = null;

  fileDropped($event: FileList): void {
    this.prepareFileList($event);
  }

  fileBrowseHandler(files: FileList): void {
    this.prepareFileList(files);
  }


  deleteFile(): void {
    if (this.file) {
      this.file = null;
      this.fileTicketEmitter.emit(null);
      if (this.ticket) {
        this.uploadService.deleteFile(this.ticket).subscribe(
          () => null,
          error => console.error(error)
        );
        this.ticket = null;
      }
      this.subscriptions.unsubscribe();
      this.subscriptions = new Subscription();
    }
  }
  uploadFiles(): void {
    this.fileProgress$.next(0);
    this.subscriptions.add(
      this.uploadService.getFileTicket().subscribe(
        s => {
          this.ticket = s;
          this.fileTicketEmitter.emit(s);
        }
      )
    );
    const formData = new FormData();
    formData.append('file', this.file);
    this.subscriptions.add(
      this.uploadService.uploadFile(this.file, formData).subscribe(
        percent => this.fileProgress$.next(percent)
      )
    );


  }
  prepareFileList(files: FileList): void {
    if (files.length > 0) {
      this.deleteFile();
      this.file = Object.defineProperty(files[0], 'progress', {value: 0});
    }
    this.uploadFiles();
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
