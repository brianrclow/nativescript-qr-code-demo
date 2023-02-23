import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ScannerService } from '../scanner/scanner.service';

@Component({
  selector: 'ns-event',
  templateUrl: './event.component.html',
  styleUrls: ['event.component.scss'],
})
export class EventComponent {
  private _scannerService = inject(ScannerService);

  scanNow() {
    const ref = this._scannerService.open();

    firstValueFrom(ref.afterClosed()).then((value) => {
      console.log('value', value);
      if (value != null) {
        setTimeout(() => {
          alert(`${value}`);
        }, 500);
      }
    });
  }
}
