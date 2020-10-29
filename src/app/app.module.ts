import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AsbAppIconsModule} from './helpers/svg-icons-sanitizer';
import {MatIconModule} from '@angular/material/icon';
import {UploadService} from './services/upload.service';
import {asbAppReducer} from './store/reducer';
import {EffectsModule} from '@ngrx/effects';
import {asbAppEffects} from './store/effect';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {ProcessingService} from './services/processing.service';
import {ScriptService} from './services/script.service';
import {AsbPopoverComponent} from './modules/shared/popover-template/popover.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    AsbPopoverComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(asbAppReducer),
    EffectsModule.forRoot(asbAppEffects),
    ToastrModule.forRoot(),
    AppRoutingModule,
    AsbAppIconsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    ProcessingService,
    UploadService,
    ScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
