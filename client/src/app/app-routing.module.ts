//импорт декоратора NgModule из библиотеки @angular/core
import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";

//Объявляем пустой массив с типом Routes
const routes: Routes = [
  {
    //
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: [

    ]
  }
]
//Объявляем декоратор для класса AppRoutingModule
@NgModule({
  //Модуль NgModule принимает 2 параметра
  //imports - массив, exports - массив
  //в imports принимаем параметр RouterModule,
  //который импортируется из библиотеки @angular/router
  imports: [
    //метод forRoot - статический метод,
    //который регистрирует route для приложения
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
//Объявляем класс AppRoutingModule
export class AppRoutingModule {

}
