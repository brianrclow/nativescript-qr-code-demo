import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ScannerModalComponent } from './scanner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ScannerModalComponent],
  exports: [ScannerModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ScannerModule {}
