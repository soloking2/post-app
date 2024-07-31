import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  MatDialogModule,
  CommonModule,
  ReactiveFormsModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];
@NgModule({
    imports: [...modules],
    exports: [...modules]
})

export class SharedModule {}