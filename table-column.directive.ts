import { Directive, Input, PipeTransform, OnInit } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Directive({
  selector: 'cp-table-column'
})
export class TableColumnDirective implements OnInit{
  @Input() title: string;
  @Input() key: string;
  @Input() empty: string;
  @Input() pipes: PipeTransform[];
  @Input() ngClass: NgClass;
  @Input() class: string;

  ngOnInit() {
    if (!this.title) {
      this.title = this.key.charAt(0).toUpperCase() + this.key.slice(1);
    }
  }
}