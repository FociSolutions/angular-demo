import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UnitTestComponent } from './unit-test/unit-test.component';
import { ECHO_URL } from './shared/models/injection-tokens.store';
import { HttpClientModule } from '@angular/common/http';
import { UppercasePipe } from './shared/pipes/uppercase/uppercase.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { EchoTooService } from './shared/services/echo-too/echo-too.service';
import { EchoService } from './shared/services/echo/echo.service';

const routes: Routes = [{ path: '', component: UnitTestComponent }];

@NgModule({
  declarations: [UnitTestComponent, UppercasePipe],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers: [EchoService, EchoTooService, { provide: ECHO_URL, useValue: 'https://httpbin.org/post' }]
})
export class UnitTestModule {}
