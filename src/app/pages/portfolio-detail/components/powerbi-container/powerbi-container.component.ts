import { AfterViewInit, Component, ElementRef, Input } from "@angular/core";
import "./powerbi.js";
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
    this.elementRef.nativeElement.querySelector('iframe').setAttribute('frameBorder', 0);
    this.elementRef.nativeElement.querySelector('iframe').setAttribute('width', '100%');
    this.elementRef.nativeElement.querySelector('iframe').setAttribute('height', '100%');
    this.elementRef.nativeElement.querySelector('iframe').setAttribute('style', 'overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px');
  }

  constructor(private elementRef: ElementRef) {

  }
}
