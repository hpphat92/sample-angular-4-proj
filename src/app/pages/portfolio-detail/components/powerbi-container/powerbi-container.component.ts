import { AfterViewInit, Component, ElementRef, HostListener, Input } from "@angular/core";
import "./powerbi.js";
@Component({
  selector: 'powerbi-container',
  styleUrls: ['./powerbi-container.scss'],
  templateUrl: './powerbi-container.html'
})
export class PowerbiContainerComponent implements AfterViewInit {

  @Input()
  public config: any;
  public iframe: any;
  public size: any;
  public ratioHeightPerWidth: number = 1.70;
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
    this.iframe = this.elementRef.nativeElement.querySelector('iframe');
    this.iframe.setAttribute('frameBorder', 0);
    this.iframe.setAttribute('height', '100%');
    this.iframe.setAttribute('allowfullscreen', '');
    this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;position:absolute;top:0px;left:0px;right:0px;bottom:45px`);
    let iframeHeight = this.iframe.getBoundingClientRect().height;
    let iframeWidth = iframeHeight * this.ratioHeightPerWidth;
    this.iframe.setAttribute('style', `${this.iframe.getAttribute('style')};width:${iframeWidth}px; margin: auto;`)
  }

  goFullScreen() {
    this.powerBiRecord.fullscreen();
  }

  constructor(private elementRef: ElementRef) {

  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    let iframeHeight = this.iframe.getBoundingClientRect().height;
    let iframeWidth = iframeHeight * this.ratioHeightPerWidth;
    this.iframe.setAttribute('style', `${this.iframe.getAttribute('style')};width:${iframeWidth}px; margin: auto;`)
  }

}
