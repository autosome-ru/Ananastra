import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ScriptService} from '../../../../services/script.service';
import {AnnotationDataModel, StatsDataModel} from '../../../../models/annotation.model';

@Component({
  selector: 'astra-ticket-stats',
  templateUrl: './ticket-stats.component.html',
  styleUrls: ['./ticket-stats.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketStatsComponent implements OnInit {
  public chartDatasets: Array<any> = [];
  public stats: StatsDataModel;
  @Input()
  set chartData(value: AnnotationDataModel) {
    if (value && value.status === 'Processed') {
      this.stats = value.metaInfo;
      this.chartDatasets = [
        {data:
            [value.metaInfo.notFound, value.metaInfo.asbCount, value.metaInfo.candidatesCount],
          label: 'All ASB'}
      ];
    }
  }

  public chartLabels: string[] = ['Unknown', 'ASB SNPs', 'Non-ASB SNPs'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#B8B8B8', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#BEBEBE', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    legend: {
      display: true,
      position: 'bottom'
    }
  };
  public chartLoaded: boolean;

  constructor(private scriptService: ScriptService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.scriptService.load('charts').then(data => {
      this.chartLoaded = data.filter(v => v.script === 'charts')[0].loaded;
      this.cd.detectChanges();
    }).catch(error => console.log(error));
  }

  public chartClicked(): void { }
  public chartHovered(): void { }
}
