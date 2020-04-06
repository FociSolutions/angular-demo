import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./complex-form/complex-form.module').then(m => m.ComplexFormModule)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('./rxjs/rxjs.module').then(m => m.RxjsModule)
  },
  { path: 'i18n', loadChildren: () => import('./i18n/i18n.module').then(m => m.I18nModule) },
  {
    path: 'storage',
    loadChildren: () => import('./web-storage/web-storage.module').then(m => m.WebStorageModule)
  },
  { path: 'unit', loadChildren: () => import('./unit-test/unit-test.module').then(m => m.UnitTestModule) },
  {
    path: 'input-and-output',
    loadChildren: () => import('./input-and-output/input-and-output.module').then(m => m.InputAndOutputModule)
  },
  { path: 'e2e', loadChildren: () => import('./e2e/e2e.module').then(m => m.E2eModule) }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
