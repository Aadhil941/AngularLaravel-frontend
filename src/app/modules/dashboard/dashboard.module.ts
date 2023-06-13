import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MemberCrudComponent } from './member-crud/member-crud.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardViewComponent,
    MemberCrudComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers:[DashboardViewComponent]
})
export class DashboardModule { }
