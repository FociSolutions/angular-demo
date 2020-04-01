import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { TextInputComponent } from './text-input/text-input.component';
import { UppercaseTextComponent } from './uppercase-text/uppercase-text.component';
import { MultiInputExampleComponent } from './multi-input-example/multi-input-example.component';

const routes: Routes = [
  {
    path: '**',
    component: ParentComponent
  }
];

@NgModule({
  declarations: [ParentComponent, TextInputComponent, UppercaseTextComponent, MultiInputExampleComponent],
  imports: [RouterModule.forChild(routes), CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class InputAndOutputModule {}
