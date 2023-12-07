import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LearnModule } from './learn/learn.module';
import { CheckModule } from './check/check.module';
import { ExamModule } from './exam/exam.module';
import { ScoreComponent } from './shared/score/score.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, ScoreComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LearnModule,
    CheckModule,
    ExamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
