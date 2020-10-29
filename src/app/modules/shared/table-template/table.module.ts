import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AsbTableComponent } from "./mat-table/table.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AsbPipesModule} from "../../../pipes/pipe.module";

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        AsbPipesModule,
    ],
    declarations: [
        AsbTableComponent,
    ],
    exports: [
        AsbTableComponent,
    ]
})
export class AsbTablesModule {
}
