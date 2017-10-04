import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
// import { MarketplaceComponent } from './marketplace/marketplace.component';
// import { AlbumDetailComponent }   from './album-detail/album-detail.component';
import { LoginComponent }   from './login/login.component';
import { UserProfileComponent }   from './user-profile/user-profile.component';
import { AppComponent } from './app.component';
import { NewTreeComponent } from './new-tree/new-tree.component';
import { AllTreesComponent } from './all-trees/all-trees.component';

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
    component: LoginComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'users/:uid',
    component: UserProfileComponent
},
{
    path: 'new-tree',
    component: NewTreeComponent
  },
  {
    path: 'all-trees',
    component: AllTreesComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
