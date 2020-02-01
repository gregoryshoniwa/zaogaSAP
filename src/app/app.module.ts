import { ItemsPageModule } from './../pages/items/items.module';
import { ItemsPage } from './../pages/items/items';
import { ReportmodelPageModule } from './../pages/reportmodel/reportmodel.module';
import { ReportmodelPage } from './../pages/reportmodel/reportmodel';
import { PastorprofilePageModule } from './../pages/pastorprofile/pastorprofile.module';
import { AddeducationPageModule } from './../pages/addeducation/addeducation.module';
import { MissionsdeploymentPageModule } from './../pages/missionsdeployment/missionsdeployment.module';
import { ProfilePageModule } from './../pages/profile/profile.module';
import { DistrictlistPageModule } from './../pages/districtlist/districtlist.module';
import { DistrictaddPageModule } from './../pages/districtadd/districtadd.module';
import { DeploypastorPageModule } from './../pages/deploypastor/deploypastor.module';
import { DeployhistoryPageModule } from './../pages/deployhistory/deployhistory.module';
import { UpdatepastorPageModule } from './../pages/updatepastor/updatepastor.module';
import { UpdatepastorPage } from './../pages/updatepastor/updatepastor';
import { AddpastorPageModule } from './../pages/addpastor/addpastor.module';
import { AddpastorPage } from './../pages/addpastor/addpastor';
import { CashbdPageModule } from './../pages/cashbd/cashbd.module';

import { Home2PageModule } from './../pages/home2/home2.module';
import { Login2PageModule } from './../pages/login2/login2.module';
import { ViewinvoicesPageModule } from './../pages/viewinvoices/viewinvoices.module';
import { InvoicelistPageModule } from './../pages/invoicelist/invoicelist.module';
import { AddunknownPageModule } from './../pages/addunknown/addunknown.module';
import { UnknownlistPageModule } from './../pages/unknownlist/unknownlist.module';
import { UpdateaccountPageModule } from './../pages/updateaccount/updateaccount.module';
import { AddaccountPageModule } from './../pages/addaccount/addaccount.module';
import { RestapiserviceProvider } from './../providers/restapiservice/restapiservice';
import { AccountdPageModule } from './../pages/accountd/accountd.module';
import { UsersPageModule } from './../pages/users/users.module';
import { PopmenuComponent } from './../components/popmenu/popmenu';

import { PrintPageModule } from './../pages/print/print.module';
import { AdditemPageModule } from './../pages/additem/additem.module';
import { AdditemPage} from './../pages/additem/additem';

import { ImageviewPageModule } from './../pages/imageview/imageview.module';
import { ImageviewPage } from './../pages/imageview/imageview';
import { CustomersPageModule } from './../pages/customers/customers.module';
import { ReportsPageModule } from './../pages/reports/reports.module';
import { UnknownPageModule } from './../pages/unknown/unknown.module';

import { LatePageModule } from './../pages/late/late.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpModule} from '@angular/http';

import { SignupPageModule } from './../pages/signup/signup.module';
import { LoginPageModule } from './../pages/login/login.module';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { PrintPage} from './../pages/print/print';

import { LatePage } from './../pages/late/late';
import { UnknownPage } from './../pages/unknown/unknown';
import { ReportsPage} from './../pages/reports/reports';
import { CustomersPage} from './../pages/customers/customers';
import { SapservicesProvider } from '../providers/sapservices/sapservices';
import { GlobleProvider } from '../providers/globle/globle';
import {HttpClientModule} from '@angular/common/http';
import { AccountdPage} from './../pages/accountd/accountd';
import { UsersPage} from './../pages/users/users';

import {ChartsModule} from 'ng2-charts';
import * as highcharts from 'Highcharts';
import { AddaccountPage} from './../pages/addaccount/addaccount';
import { UpdateaccountPage} from './../pages/updateaccount/updateaccount';
import { UnknownlistPage} from './../pages/unknownlist/unknownlist';
import { AddunknownPage} from './../pages/addunknown/addunknown';

import { InvoicelistPage} from './../pages/invoicelist/invoicelist';
import { ViewinvoicesPage} from './../pages/viewinvoices/viewinvoices';
import { Login2Page} from './../pages/login2/login2';
import { Home2Page} from './../pages/home2/home2';

import { CashbdPage} from './../pages/cashbd/cashbd';
//import { CouchdbProvider } from '../providers/couchdb/couchdb';
import { DeploypastorPage} from './../pages/deploypastor/deploypastor';
import { DeployhistoryPage} from './../pages/deployhistory/deployhistory';
import { DistrictaddPage} from './../pages/districtadd/districtadd';
import { DistrictlistPage} from './../pages/districtlist/districtlist';

import { ProfilePage} from './../pages/profile/profile';
import { MissionsdeploymentPage} from './../pages/missionsdeployment/missionsdeployment';
import { AddeducationPage} from './../pages/addeducation/addeducation';
import { PastorprofilePage} from './../pages/pastorprofile/pastorprofile';

import { EdititemPageModule } from '../pages/edititem/edititem.module';
import { EdititemPage } from '../pages/edititem/edititem';


@NgModule({
  declarations: [
    MyApp,HomePage,PopmenuComponent

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,SignupPageModule,HttpModule,LatePageModule,UnknownPageModule,ReportsPageModule,CustomersPageModule,ImageviewPageModule,
    AdditemPageModule,HttpClientModule,PrintPageModule,UsersPageModule,AccountdPageModule,AddaccountPageModule,UpdateaccountPageModule,
    UnknownlistPageModule,AddunknownPageModule,InvoicelistPageModule,ViewinvoicesPageModule,Login2PageModule,Home2PageModule,CashbdPageModule,
    AddpastorPageModule,UpdatepastorPageModule,DeployhistoryPageModule,DeploypastorPageModule,DistrictaddPageModule,DistrictlistPageModule,ProfilePageModule,
    MissionsdeploymentPageModule,AddeducationPageModule,PastorprofilePageModule,ReportmodelPageModule,ItemsPageModule,ChartsModule,EdititemPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,LoginPage,SignupPage,LatePage,UnknownPage,ReportsPage,CustomersPage,ImageviewPage,AdditemPage,PrintPage,PopmenuComponent,
    UsersPage,AccountdPage,AddaccountPage,UpdateaccountPage,UnknownlistPage,AddunknownPage,InvoicelistPage,ViewinvoicesPage,Login2Page,Home2Page,
    CashbdPage,AddpastorPage,UpdatepastorPage,DeployhistoryPage,DeploypastorPage,DistrictaddPage,DistrictlistPage,ProfilePage,PastorprofilePage,AddeducationPage,
    MissionsdeploymentPage,ReportmodelPage,ItemsPage,EdititemPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SapservicesProvider,
    GlobleProvider,RestapiserviceProvider,
    //CouchdbProvider
  ]
})
export class AppModule {}
