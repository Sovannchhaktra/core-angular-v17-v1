import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {UnAuthGuard} from '../../core/interceptor/unAuth.guard';
import {AuthService} from '../../core/interceptor/auth.service';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}])
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UnAuthGuard,
        AuthService
    ]
})
export class LoginModule {
}
