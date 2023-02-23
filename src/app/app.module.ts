import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeDialogService, NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { MLKitModule } from '@nativescript/mlkit-core/angular';
import { ScannerService } from './scanner/scanner.service';
import { ScannerModalComponent } from './scanner/scanner.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, MLKitModule],
  declarations: [AppComponent, EventComponent, ScannerModalComponent],
  providers: [ScannerService, NativeDialogService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
