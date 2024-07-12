import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[customIfElse]',
  standalone: true
})
export class CustomIfElseDirective {
  @Input() set appMyIfElse(condition: boolean) {
    this.context.$implicit = this.context.appMyIfElse = condition;
    this.updateView();
  }

  @Input() appMyIfElseElse: TemplateRef<any>;

  private context: any = { $implicit: null, appMyIfElse: null };

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  private updateView() {
    this.viewContainer.clear();
    if (this.context.appMyIfElse) {
      this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    } else if (this.appMyIfElseElse) {
      this.viewContainer.createEmbeddedView(this.appMyIfElseElse, this.context);
    }
  }
}
