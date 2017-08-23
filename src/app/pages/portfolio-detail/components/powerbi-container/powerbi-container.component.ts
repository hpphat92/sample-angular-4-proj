import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { isViewDebugError } from "@angular/core/src/view/errors";
import'./powerbi.js';
@Component({
  selector: 'powerbi-container',
  styleUrls: ['./powerbi-container.scss'],
  templateUrl: './powerbi-container.html'
})
export class PowerbiContainerComponent implements AfterViewInit {

  @Input()
  public config: any;

  ngAfterViewInit() {
    let config = {
      type: 'report',
      tokenType: 1,
      accessToken: this.config.embedToken,
      embedUrl: this.config.embedUrl,
      id: this.config.reportId,
      permissions: 7,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true
      }
    };
    (window as any).powerbi.embed(this.elementRef.nativeElement, config);
  }

  constructor(private elementRef: ElementRef) {

  }
}
