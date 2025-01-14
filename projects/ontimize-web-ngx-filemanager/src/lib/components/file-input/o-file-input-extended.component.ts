import { CommonModule } from '@angular/common';
import { Component, forwardRef, NgModule } from '@angular/core';
import { DEFAULT_INPUTS_O_FILE_INPUT, DEFAULT_OUTPUTS_O_FILE_INPUT, OFileInputComponent, OFileItem, OSharedModule } from 'ontimize-web-ngx';

import { OFileUploaderExtended } from './o-file-uploader-extended';

@Component({
  selector: 'o-file-input-extended',
  templateUrl: './o-file-input-extended.component.html',
  styleUrls: ['./o-file-input-extended.component.scss'],
  inputs: [
    ...DEFAULT_INPUTS_O_FILE_INPUT,
    'workspaceKey: workspace-key',
    'parentKey: parent-key'
  ],
  outputs: DEFAULT_OUTPUTS_O_FILE_INPUT,
  providers: [
    {
      provide: OFileInputComponent,
      useExisting: forwardRef(() => OFileInputExtendedComponent)
    }
  ]
})
export class OFileInputExtendedComponent extends OFileInputComponent {
  uploader: OFileUploaderExtended;
  protected workspaceKey: string;
  parentKey: string;

  initialize() {
    super.initialize();
    this.uploader = new OFileUploaderExtended(this.fileService, this.entity, this.form, this.workspaceKey, this.parentKey, this.fileService);
    this.uploader.splitUpload = this.splitUpload;
  }

  fileSelected(event: Event): void {
    let value: string = '';
    if (event) {
      const files: FileList = event.target['files'];

      for (let i = 0, f: File; f = files[i]; i++) {
        const fileItem: OFileItem = new OFileItem(f, this.uploader);
        this.uploader.addFile(fileItem);
      }
      value = this.uploader.files.map(file => file.name).join(', ');
    }
    window.setTimeout(() => {
      this.setValue(value !== '' ? value : undefined);
      this.inputFile.nativeElement.value = '';
      if (this._fControl) {
        this._fControl.markAsTouched();
      }
    }, 0);
  }

}

@NgModule({
  declarations: [OFileInputExtendedComponent],
  imports: [OSharedModule, CommonModule],
  exports: [OFileInputExtendedComponent]
})
export class OFileInputExtendedModule { }
