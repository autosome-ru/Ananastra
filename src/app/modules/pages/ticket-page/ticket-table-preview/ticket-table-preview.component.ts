import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AsbTableColumnModel, AsbTableDisplayedColumns} from '../../../../models/table.model';
import {AnnotationSnpModel} from '../../../../models/annotation.model';
import {TfOrCl} from '../../../../models/data.model';
import {MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatButtonToggleChange} from '@angular/material/button-toggle';

@Component({
  selector: 'astra-ticket-table-preview',
  templateUrl: './ticket-table-preview.component.html',
  styleUrls: ['./ticket-table-preview.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketTablePreviewComponent implements OnInit {
  @ViewChild("genomePositionViewTemplate", {static: true})
  public genomePositionViewTemplate: TemplateRef<{row: any, value: any}>;
  @Input()
  public data: AnnotationSnpModel[] = [];

  @Input()
  private tfOrCl: TfOrCl;

  @Input()
  public groupValue = false;

  @Output()
  private groupValueEmitter = new EventEmitter<boolean>();

  public displayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;
  public columnModel: AsbTableColumnModel<AnnotationSnpModel>;
  public columnsControl: FormControl;
  colors: {[base: string]: string} = {
    A: "#0074FF",
    T: "#7900C8",
    G: "#FF4500",
    C: "#FFA500"};


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data)
    this.displayedColumns = ['chr', 'rsId'];
    this.columnModel = {
      chr: {
        view: "Genome position",
        columnTemplate: this.genomePositionViewTemplate,
        disabledSort: true
      },
      rsId: {view: 'rs ID'},
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
        aggregatedCellTypes: {view: 'Cell types', disabledSort: true}
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
    this.displayedColumns = ['chr', 'rsId'];
    this.columnsControl.patchValue(['chr', 'rsId']);
  }

  _changeColumns(event: MatSelectChange): void {
    this.displayedColumns = [
      ...event.value
    ];
  }

  _groupToggled(event: MatButtonToggleChange): void {
    this.groupValue = event.value;
    this.groupValueEmitter.emit(this.groupValue);
  }
}
