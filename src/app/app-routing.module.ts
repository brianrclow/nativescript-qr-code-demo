import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { EventComponent } from './event/event.component';

const routes: Routes = [
  { path: '', redirectTo: '/event', pathMatch: 'full' },
  { path: 'event', component: EventComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
