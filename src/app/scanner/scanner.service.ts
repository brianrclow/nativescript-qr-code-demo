import { Injectable } from '@angular/core';
import { ScannerModalComponent } from './scanner.component';

import { isAndroid } from '@nativescript/core';
import { NativeDialogService } from '@nativescript/angular';

@Injectable({ providedIn: 'root' })
export class ScannerService {
  constructor(private _nativeDialogService: NativeDialogService) {}

  open() {
    console.log('OPEN?');
    return this._nativeDialogService.open(ScannerModalComponent, {
      nativeOptions: {
        stretched: true,
        fullscreen: isAndroid ? true : false,
      },
    });
  }
}
