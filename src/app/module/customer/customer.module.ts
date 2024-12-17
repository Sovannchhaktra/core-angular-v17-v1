import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';


@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerDetailComponent,
        CustomerFormComponent,
    ],
    imports: [
        TableModule,
        PaginatorModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
                {path: '', redirectTo: 'list', pathMatch: 'full'},
                {path: 'list', component: CustomerListComponent},
                {path: 'detail/:id', component: CustomerDetailComponent},
                {path: 'add', component: CustomerFormComponent},
                {path: 'edit/:id', component: CustomerFormComponent},
            ]
        ),
        BadgeModule,
        RadioButtonModule,
        CalendarModule
    ]
})
export class CustomerModule {
}
