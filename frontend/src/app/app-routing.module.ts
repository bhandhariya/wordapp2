import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:"",component:SearchComponent
  },
  {
    path:"search",component:SearchComponent
  },
  {
    path:"detail",component:DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
