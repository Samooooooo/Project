import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckQDetailsComponent } from './check-q-details/check-q-details.component';

const routes: Routes = [
  {
    path: '',
    component: CheckQDetailsComponent,
  },
  {
    path: ':index',
    component: CheckQDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckRoutingModule {}
