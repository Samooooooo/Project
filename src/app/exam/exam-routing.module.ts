import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamQDetailsComponent } from './exam-q-details/exam-q-details.component';

const routes: Routes = [
  { path: '', component: ExamQDetailsComponent },
  {
    path: ':index',
    component: ExamQDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
