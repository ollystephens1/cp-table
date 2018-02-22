import { Component, ContentChildren, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { TableColumnDirective } from '../table-column.directive';
import { TableClickEvent } from './table.models';

@Component({
  selector: 'cp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
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