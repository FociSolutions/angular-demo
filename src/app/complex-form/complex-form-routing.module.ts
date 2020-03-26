import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplexFormComponent } from './complex-form/complex-form.component';

const routes: Routes = [{ path: '', component: ComplexFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplexFormRoutingModule {}
