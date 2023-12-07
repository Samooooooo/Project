import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckRoutingModule } from './check-routing.module';
import { CheckQDetailsComponent } from './check-q-details/check-q-details.component';

@NgModule({
  declarations: [CheckQDetailsComponent],
  imports: [CommonModule, CheckRoutingModule, FormsModule],
})
export class CheckModule {}
