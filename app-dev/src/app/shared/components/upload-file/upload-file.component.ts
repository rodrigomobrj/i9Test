import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadFileModel } from './upload-file.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements ControlValueAccessor {

  @Output() emitError: EventEmitter<string> = new EventEmitter();
  files: UploadFileModel[] = [];

  constructor() { }

  public loadFile(event) {
    if (event.target.files.length) {
      if (!this.files) {
        this.files = [];
      }
      const fileList: FileList = event.target.files;

      const length = fileList.length;
      for (let index = 0; index < length; index++) {
        const file = fileList[index];
        // Limite de 5Mb
        if (file.size <= 5000000) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const fileToSave: UploadFileModel = {
              filename: file.name,
              attachment: reader.result
            }
            this.files.push(fileToSave);
            this.writeValue(this.files);
          }
        } else {
          this.emitError.emit('O arquivo não pode ser maior do que 5mb');
        }
      }
    }
  }

  removeFile(index: number) {
    if (this.files[index]) {
      this.files.splice(index, 1);
      this.writeValue(this.files);
    }
  }

  private propagateChange = (_: any) => { }

  // Métodos ControlValueAccessor
  writeValue(files: UploadFileModel[]): void {
    this.files = files;
    this.propagateChange(files)
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  // TODO Implementar estes dois métodos
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

}
