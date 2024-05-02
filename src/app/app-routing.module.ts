import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { LoadPaymentsComponent } from './load-payments/load-payments.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'admin',
    component: AdminTemplateComponent,
    /**
     * Vu qu'il y'a ceux des routes subalternes a celle-ci
     * Alors on peut les mettre sous forme children
     * Pour donc lier les routes, on verra:
     * routerLink="/admin/home"
     */
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'payments', component: PaymentsComponent },
      {
        path: 'load-students',
        component: LoadStudentsComponent,
        canActivate: [AuthorizationGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'load-payments',
        component: LoadPaymentsComponent,
        canActivate: [AuthorizationGuard],
        data: { roles: ['ADMIN'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
