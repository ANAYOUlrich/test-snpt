import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BaseComponent } from './views/layouts/base.component';

import { routes } from './app.routes';
import { FooterComponent } from './views/layouts/includes/footer/footer.component';
import { HeadbarComponent } from './views/layouts/includes/headbar/headbar.component';
import { NavbarComponent } from './views/layouts/includes/navbar/navbar.component';
import { IndexRouePelleComponent } from './views/roues-pelles/index/index.component';
import { IndexComposantComponent } from './views/composants/index/index.component';
import { CreateEditComponent } from './views/roues-pelles/create-edit/create-edit.component';
import { ListComponent } from './views/roues-pelles/list/list.component';
import { CreateComposantComponent } from './views/composants/create/create.component';
import { SearchComponent } from './views/composants/search/search.component';
import { AlertComponent } from './views/layouts/includes/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    FooterComponent,
    NavbarComponent,
    HeadbarComponent,
    IndexRouePelleComponent,
    IndexComposantComponent,
    CreateEditComponent,
    ListComponent,
    CreateComposantComponent,
    SearchComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
