import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogDetailsComponent } from './log-details.component';

const routes: Routes = [
  {
    path: '',
    component: LogDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogDetailsRoutingModule {}
