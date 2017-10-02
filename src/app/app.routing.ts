import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
// import { MarketplaceComponent } from './marketplace/marketplace.component';
// import { AlbumDetailComponent }   from './album-detail/album-detail.component';
import { AdminComponent }   from './admin/admin.component';
import { UserProfileComponent }   from './user-profile/user-profile.component';
import { AppComponent } from './app.component';

// import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: AdminComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
