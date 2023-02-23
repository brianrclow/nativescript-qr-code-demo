import { Component, OnInit } from '@angular/core';
import { LoadEventData } from '@nativescript/core';
import { BarcodeResult } from '@nativescript/mlkit-barcode-scanning';
import { MLKitView } from '@nativescript/mlkit-core';
import { distinctUntilChanged, firstValueFrom, Subject, take } from 'rxjs';
import { ScannerService } from '../scanner/scanner.service';

@Component({
  selector: 'ns-event',
  templateUrl: './event.component.html',
  styleUrls: ['event.component.scss'],
})
export class EventComponent implements OnInit {
  $scannedValue = new Subject<string>();
  camera: MLKitView;
  constructor(private _scannerService: ScannerService) {}

  ngOnInit(): void {
    this.$scannedValue
      .pipe(distinctUntilChanged(), take(1))
      .subscribe((value) => {
        console.log('GOT VALUE');
        console.log('VAL: ', value);
      });
  }

  onDetection(event): void {
    const result = event.data[0] as BarcodeResult;
    this.$scannedValue.next(result.displayValue);
  }

  onLoaded(event: LoadEventData) {
    this.camera = event.object as unknown as MLKitView;
    if (!this.camera.hasCameraPermission()) {
      this.camera.requestCameraPermission();
    }
  }

  scanNow() {
    console.log('Scan Now');
    const ref = this._scannerService.open();

    firstValueFrom(ref.afterClosed()).then((value) => {
      console.log('value', value);
      setTimeout(() => {
        alert(`${value}`);
      }, 500);
    });
  }
}
