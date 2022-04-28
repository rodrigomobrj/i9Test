import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-multiselect-pills',
  templateUrl: './multiselect-pills.component.html',
  styleUrls: ['./multiselect-pills.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectPillsComponent),
      multi: true
    }
  ]
})
export class MultiselectPillsComponent implements OnInit, ControlValueAccessor {
  @Input() primaryKey: string = '';
  @Input() displayWith: string = '';
  @Input() autoCompleteOptions: any[];
  @Input() label: string = '';
  @Input() backgroundColorChip: string = 'primary';
  @Input() textColorChip: string = 'white';
  @Input() iconColorChip: string = 'white';
  @Input() iconChip: string = 'close';
  @Input() iconInput: string = 'search';

  formControl: FormControl = new FormControl();
  itemsSelected: any[] = [];
  autoComplete$: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    this.showOptionsAutocomplete();
  }

  showOptionsAutocomplete() {
    this.autoComplete$ = this.formControl.valueChanges.pipe(
      startWith<string | any>(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(data => this.filterData(data))
    )
  }

  add(event: MatAutocompleteSelectedEvent) {
    const optionSelected = event.option.value;
    const index = this.findIndexItem(this.itemsSelected, optionSelected);
    if (index === -1) {
      this.itemsSelected.push(optionSelected);
      this.writeValue(this.itemsSelected);
    }
  }

  remove(item) {
    const index = this.findIndexItem(this.itemsSelected, item);
    if (index >= 0) {
      this.itemsSelected.splice(index, 1);
      this.writeValue(this.itemsSelected);
    }
  }

  displayView(object?: any): string | null {
    return object ? object[this.displayWith] : null
  }

  filterData(value: string) {
    const filterValue = value ? value.toLowerCase() : '';
    return this.autoCompleteOptions.filter(option => option[this.displayWith].toLowerCase().includes(filterValue));
  }

  findIndexItem(array: any[], item: any): number {
    return array.findIndex(data => data[this.primaryKey] === item[this.primaryKey]);
  }

  // ControlValueAccessor
  propagateChange = (_: any) => { };

  writeValue(value: any[]): void {
    if ((value !== null || value !== undefined) && value.length) {
      this.itemsSelected = value;
      this.formControl.setValue(null);
    } else {
      this.formControl.setValue(null);
    }
    this.propagateChange(this.itemsSelected);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  // TODO Implementar estes dois métodos
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

}
