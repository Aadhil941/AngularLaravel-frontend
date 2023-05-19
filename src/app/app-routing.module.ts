import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { RouteNoAuthGuard } from './shared/guards/routenoauth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

  {
    path: '',
    canActivate: [RouteNoAuthGuard],
    canActivateChild: [RouteNoAuthGuard],
    children: [
      { path: 'sign-in', data: { breadcrumb: 'sign-in' }, loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule) },
    ]
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', data: { breadcrumb: 'dashboard' }, loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
