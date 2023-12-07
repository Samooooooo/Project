import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamQDetailsComponent } from './exam-q-details/exam-q-details.component';

@NgModule({
  declarations: [ExamQDetailsComponent],
  imports: [CommonModule, ExamRoutingModule],
})
export class ExamModule {}
