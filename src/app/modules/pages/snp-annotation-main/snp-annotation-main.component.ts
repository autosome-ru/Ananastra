import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import * as fromActions from "src/app/store/action";
import {Router} from '@angular/router';
import {AppState} from '../../../store/reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'astra-snp-annotation-main',
  templateUrl: './snp-annotation-main.component.html',
  styleUrls: ['./snp-annotation-main.component.less']
})
export class SnpAnnotationMainComponent implements OnInit {
  public textAreaControl: FormControl;
  public fileTicket: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.textAreaControl = this.formBuilder.control('');
  }

  setFileTicket(event: string): void {
    this.fileTicket = event;
  }

  annotationStart(): void {
    this.store.dispatch(new fromActions.annotation.InitAnnotationStartAction(this.fileTicket));
    this.router.navigateByUrl(`/ticket/${this.fileTicket}`).then(
      () => this.store.dispatch(new fromActions.annotation.InitAnnotationStartAction(this.fileTicket))
    );
  }
}
