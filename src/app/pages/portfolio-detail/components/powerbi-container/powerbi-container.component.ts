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

  public powerBiRecord;

  ngAfterViewInit() {
    let config = {
      type: 'report',
      tokenType: 1,
      accessToken: this.config.embedToken,
      embedUrl: this.config.embedUrl,
      id: this.config.reportId,
      permissions: 7,
      settings: {
        // filterPaneEnabled: true,
        // navContentPaneEnabled: true
      }
    };
    this.powerBiRecord = (window as any).powerbi.embed(this.elementRef.nativeElement.querySelector('div'), config);
    let iframe = this.elementRef.nativeElement.querySelector('iframe');
    iframe.setAttribute('frameBorder', 0);
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;position:absolute;top:0px;left:0px;right:0px;bottom:45px`);
    let iframeHeight = iframe.getBoundingClientRect().height;
    let iframeWidth = iframeHeight * 1.625;
    iframe.setAttribute('style', `${iframe.getAttribute('style')};width:${iframeWidth}px; margin: auto;`)

  }

  goFullScreen() {
    this.powerBiRecord.fullscreen();
  }

  constructor(private elementRef: ElementRef) {

  }
}
