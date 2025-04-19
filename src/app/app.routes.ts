import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { CoinDetailComponent } from './coin-detail/coin-detail/coin-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoinData } from './services/crypto-api.model';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'coin/:id',
    component: CoinDetailComponent,
    canActivate: [AuthGuard],
    data: { coinData: {} as CoinData },
  },
];
