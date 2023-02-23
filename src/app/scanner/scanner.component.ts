import { Component, Optional } from '@angular/core';
import { NativeDialogRef } from '@nativescript/angular';
import { LoadEventData } from '@nativescript/core';
import { BarcodeResult } from '@nativescript/mlkit-barcode-scanning';
import { MLKitView } from '@nativescript/mlkit-core';
import { distinctUntilChanged, Subject, take } from 'rxjs';

@Component({
  selector: 'scanner',
  templateUrl: 'scanner.component.html',
  styleUrls: ['scanner.component.scss'],
})
export class ScannerModalComponent {
  $scannedValue = new Subject<string>();
  camera: MLKitView;

  constructor(@Optional() private ref: NativeDialogRef<ScannerModalComponent>) {
    this.$scannedValue
      .pipe(distinctUntilChanged(), take(1))
      .subscribe((value) => {
        this.close(value);
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

  close(result: string) {
    this.ref.close(result);
  }
}
