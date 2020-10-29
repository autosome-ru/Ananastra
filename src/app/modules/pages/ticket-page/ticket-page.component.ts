import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as fromActions from '../../../store/action';
import * as fromSelectors from "src/app/store/selector";
import {AppState} from '../../../store/reducer';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AnnotationDataModel, AnnotationSnpModel} from '../../../models/annotation.model';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'astra-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketPageComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup')
  private tabGroup: MatTabGroup;
  public ticket: string;
  private intervalId: number = null;
  private subscriptions = new Subscription();
  public fileStatistics$: Observable<AnnotationDataModel>;
  public fileStatisticsLoading$: Observable<boolean>;
  public tfTableData$: Observable<{ data: AnnotationSnpModel[]; loading: boolean }>;
  public clTableData$: Observable<{ data: AnnotationSnpModel[]; loading: boolean }>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe(
        s => {
          this.ticket = s.get('id');
        }
      )
    );
    this.fileStatistics$ = this.store.select(
      fromSelectors.selectAnnotationDataById, this.ticket);
    this.fileStatisticsLoading$ = this.store.select(
      fromSelectors.selectAnnotationLoadingById, this.ticket);
    this.intervalId = window.setInterval(
      () => {
        this.store.dispatch(new fromActions.annotation.LoadAnnotationStatsAction(
          this.ticket));
      }, 500);
    this.subscriptions.add(
      this.fileStatisticsLoading$.subscribe(
        s => {
          if (s === false) {
            this.intervalId = this.clearInterval(this.intervalId);
            this.store.dispatch(new fromActions.annotation.LoadAnnotationStatsAction(
              this.ticket));
            this.store.dispatch(new fromActions.annotation.InitAnnotationTableAction(
              {tfOrCl: 'tf', ticket: this.ticket}
            ));
          }
        }
      )
    );
    this.tfTableData$ = this.store.select(fromSelectors.selectAnnotationTfTable, this.ticket);
    this.clTableData$ = this.store.select(fromSelectors.selectAnnotationClTable, this.ticket);

  }

  clearInterval(interval: number): null {
    if (interval) {
      window.clearInterval(interval);
      interval = null;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.clearInterval(this.intervalId);
  }

  tabIndexChanged(index: number): void {
    this.store.dispatch(new fromActions.annotation.InitAnnotationTableAction(
      {ticket: this.ticket,
        tfOrCl: index === 0 ? 'tf' : 'cl'}));
  }
}
