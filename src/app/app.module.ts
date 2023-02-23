import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeDialogService, NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { MLKitModule } from '@nativescript/mlkit-core/angular';
import { ScannerModule } from './scanner/scanner.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, MLKitModule, ScannerModule],
  declarations: [AppComponent, EventComponent],
  providers: [NativeDialogService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
