import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./complex-form/complex-form.module').then(m => m.ComplexFormModule)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('./rxjs/rxjs.module').then(m => m.RxjsModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatSidenavModule,
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
