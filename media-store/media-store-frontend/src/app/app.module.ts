import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminSiteComponent} from './admin-site/admin-site.component';
import {UserSiteComponent} from './user-site/user-site.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './services/auth.interceptor';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ToastrModule} from 'ngx-toastr';
import {BuyStockComponent} from './investments/buy-stock/buy-stock.component';
import {MyStocksComponent} from './investments/my-stocks/my-stocks.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {NgbPopoverModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {StockGraphComponent} from './investments/stock-graph/stock-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminSiteComponent,
    UserSiteComponent,
    BuyStockComponent,
    MyStocksComponent,
    StockGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    ToastrModule.forRoot(),
    CollapseModule,
    NgbTypeaheadModule,
    NgbPopoverModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
