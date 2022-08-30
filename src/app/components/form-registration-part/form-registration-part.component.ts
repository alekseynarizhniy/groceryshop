import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-registration-part',
  templateUrl: './form-registration-part.component.html',
  styleUrls: ['./form-registration-part.component.scss'],
})
export class FormRegistrationPartComponent implements OnInit {
  public currenttErrors!: Record<string, string>;

  @Input() name!: string;
  @Input() parent!: FormGroup;
  @Input() errors!: Record<string, string>;

  ngOnInit(): void {
    this.currenttErrors = this.createErrors(this.errors);
  }

  get currentControl() {
    return this.parent.get(this.name as string);
  }

  private createErrors(obj: any): Record<string, string> {
    return {
      name: obj.name,
      size: obj.size || '',
      get required() { return this['name'] + ' is required.'; },
      get minlength() { return this['name'] + ' must be at least ' + this['size'] + ' characters long.'; },
      get pattern() { return obj.pattern || 'Only alphabetsallowed and numbers.'; }
    };
  }
}
