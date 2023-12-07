import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';

@NgModule({
  declarations: [QuestionListComponent, QuestionDetailsComponent],
  imports: [CommonModule, LearnRoutingModule],
})
export class LearnModule {}
