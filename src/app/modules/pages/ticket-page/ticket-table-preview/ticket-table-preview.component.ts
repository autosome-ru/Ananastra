import {Component, Input, OnInit} from '@angular/core';
import {AsbTableColumnModel, AsbTableDisplayedColumns} from '../../../../models/table.model';
import {AnnotationSnpModel} from '../../../../models/annotation.model';
import {TfOrCl} from '../../../../models/data.model';
import {MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'astra-ticket-table-preview',
  templateUrl: './ticket-table-preview.component.html',
  styleUrls: ['./ticket-table-preview.component.less']
})
export class TicketTablePreviewComponent implements OnInit {

  @Input()
  public data: AnnotationSnpModel[] = [];

  @Input()
  private tfOrCl: TfOrCl;

  public displayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;
  public columnModel: AsbTableColumnModel<AnnotationSnpModel>;
  public columnsControl: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.displayedColumns = ['chromosome', 'position', 'rsId'];
    this.columnModel = {
      chromosome: {view: 'Chromosome'},
      position: {view: 'Position'},
      rsId: {view: 'rsId'},
    };
    if (this.tfOrCl === 'tf') {
      this.displayedColumns = [
        ...this.displayedColumns,
        'transcriptionFactor',
        'aggregatedCellTypes'
      ];
      this.columnModel = {
        ...this.columnModel,
        transcriptionFactor: {view: 'Transcription factor'},
        aggregatedCellTypes: {view: 'Cell types'}
      };
    } else {
      this.displayedColumns = [
        ...this.displayedColumns,
        'cellType',
        'aggregatedTFs'
      ];
      this.columnModel = {
        ...this.columnModel,
        cellType: {view: 'Cell type'},
        aggregatedTFs: {view: 'TFs'}
      };
    }
    this.columnsControl = this.formBuilder.control(this.displayedColumns);

  }

  _resetFilters(): void {
    this.displayedColumns = ['chromosome', 'position', 'rsId'];
    this.columnsControl.patchValue(['chromosome', 'position', 'rsId']);
  }

  _changeColumns(event: MatSelectChange): void {
    this.displayedColumns = [
      ...event.value
    ];
  }

}
