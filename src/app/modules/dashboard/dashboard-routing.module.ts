import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { MemberCrudComponent } from './member-crud/member-crud.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
    data: {
      title: 'dashboard',
      breadcrumb: 'dashboard',
      crud: 'R'
    },
    children: [
      // {
      //   path: 'member',
      //   component: MemberCrudComponent,
      //   data: {
      //     title: 'member',
      //     breadcrumb: 'member',
      //     crud: 'R'
      //   },
      // },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
