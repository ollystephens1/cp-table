import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableColumnDirective } from './table-column.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [TableComponent, TableColumnDirective],
  exports: [TableComponent, TableColumnDirective]
})
export class CpTableModule { }