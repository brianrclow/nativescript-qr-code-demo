import { Component, Optional } from '@angular/core';
import { NativeDialogRef } from '@nativescript/angular';
import { LoadEventData } from '@nativescript/core';
import { BarcodeResult } from '@nativescript/mlkit-barcode-scanning';
import { MLKitView } from '@nativescript/mlkit-core';
import { distinctUntilChanged, Subject, take } from 'rxjs';

@Component({
  selector: 'scanner',
  template: `
  <GridLayout class="scanner-modal" iosOverflowSafeArea="true">
    <MLKitView
      iosOverflowSafeArea="true"
      class="camera-view"
      cameraPosition="back"
      detectionType="barcode"
      aspectRatio="fill"
      (loaded)="onLoaded($event)"
      (detection)="onDetection($event)"
    ></MLKitView>
    <Button class="btn-primary cancel-button" text="Cancel Scan" (tap)="close(null)"></Button>
  </GridLayout>
  `,
  styles: [
    `
    .scanner-modal {
      rows: *, auto;
      columns: 10*, 80*, 10*;
      vertical-alignment: bottom;
      height: 100%;
      width: 100%;
      background-color: black;
    }

    .cancel-button {
      row: 1;
      col: 1;
    }

    .camera-view {
      row-span: 2;
      col-span: 3;
      width: 100%;
      height: 100%;
    }
  `,
  ],
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
