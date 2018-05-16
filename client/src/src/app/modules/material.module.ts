import {
  MatButtonModule,
  MatMenuModule,
  MatSidenavModule
  ,
  MatFormFieldModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSelectModule
} from '@angular/material';
import {NgModule} from "@angular/core";
import { MatInputModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [MatButtonModule, MatMenuModule, MatSidenavModule, MatFormFieldModule, MatInputModule,MatListModule,MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  MatToolbarModule,
  MatDialogModule,
  FormsModule,
  ReactiveFormsModule,
  MatSlideToggleModule,
    MatSelectModule
  ],
  exports: [MatButtonModule, MatMenuModule, MatSidenavModule, MatFormFieldModule, MatInputModule,MatListModule,MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  MatToolbarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule],
})
export class MaterialModule { }
