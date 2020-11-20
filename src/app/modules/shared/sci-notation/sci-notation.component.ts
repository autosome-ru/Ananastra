import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {writeScientificNum} from 'src/app/helpers/functions/scientific.helper';

@Component({
  selector: 'asb-sci-notation',
  templateUrl: './sci-notation.component.html',
  styleUrls: ['./sci-notation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SciNotationComponent implements OnInit {
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{value: number}>;
    @Input()
    value: number;
    @Input()
    toInvert = false;
    constructor() { }

    ngOnInit(): void {
    }
    writeScientificNum(num, precision): string {
        return writeScientificNum((this.toInvert ? -1 : 1) * num, precision);
    }

}
