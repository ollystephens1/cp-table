import { Component, ContentChildren, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { TableColumnDirective } from './table-column.directive';
import { TableClickEvent } from './table.models';

@Component({
  moduleId: module.id,
  selector: 'cp-table',
  template: `
    <table [ngClass]="ngClass" [class]="class">
    <thead>
      <tr>
        <th *ngFor="let column of columns" (click)="onHeaderClick($event, column)">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let row of dataSource; let i = index">
        <td *ngFor="let column of columns" (click)="onRowClick($event, column, i)" [ngClass]="column.ngClass" [class]="column.class">
          {{ resolve(row, column) }}
        </td>
      </tr>
    </tbody>
  </table>
  `
})
export class TableComponent {
  @Input() dataSource: Array<any>;
  @Input() ngClass: NgClass;
  @Input() class: string;

  @Output() rowClick: EventEmitter<TableClickEvent>;
  @Output() headerClick: EventEmitter<TableClickEvent>;

  @ContentChildren(TableColumnDirective)
  columns: TableColumnDirective[];

  constructor() {
    this.rowClick = new EventEmitter<TableClickEvent>();
    this.headerClick = new EventEmitter<TableClickEvent>();
  }

  private resolve(row: any, column: TableColumnDirective): any {
    return (column.pipes || []).reduce((state, current) => current.transform(state), row[column.key] || column.empty);
  }

  private onRowClick(event: MouseEvent, column: TableColumnDirective, rowIndex: number): void {
    const rowClicked = this.dataSource[rowIndex];
    this.rowClick.emit({ ...event, column, rowIndex, rowClicked });
  }

  private onHeaderClick(event: MouseEvent, column: TableColumnDirective): void {
    this.headerClick.emit({ ...event, column });
  }

}