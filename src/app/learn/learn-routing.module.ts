import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';

const routes: Routes = [
  { path: '', component: QuestionListComponent },
  {
    path: ':index',
    component: QuestionDetailsComponent,
    data: { comnam: 'hohohoho' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
