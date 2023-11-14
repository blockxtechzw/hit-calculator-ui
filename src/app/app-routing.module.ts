import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BabyInfoComponent } from './baby-info/baby-info.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculate',
    pathMatch: 'full'
  },
  {
    path: 'baby-info',
    component: BabyInfoComponent
  },
  {
    path: 'calculate',
    component: CalculatorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
