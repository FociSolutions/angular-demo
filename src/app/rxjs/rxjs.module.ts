import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CombiningObservablesComponent } from './combining-observables/combining-observables.component';

const routes: Routes = [
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent, SequenceListComponent, FibonacciComponent, ShoppingCartComponent, CombiningObservablesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class RxjsModule {}
