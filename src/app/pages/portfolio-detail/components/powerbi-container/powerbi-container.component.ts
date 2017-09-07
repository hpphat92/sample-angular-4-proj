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
    let nativeSize = this.elementRef.nativeElement.getBoundingClientRect();
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
    this.iframe.setAttribute('allowfullscreen', '');
    if (nativeSize.width > nativeSize.height * this.ratioHeightPerWidth) {

      this.iframe.setAttribute('height', '100%');
      this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;${'height:' + (nativeSize.height - 25) + 'px'};position:absolute;top:25px;left:0px;right:0px;bottom:50px`);
      let iframeHeight = this.iframe.getBoundingClientRect().height - 50;
      let iframeWidth = iframeHeight * this.ratioHeightPerWidth;
      this.iframe.setAttribute('style', `${this.iframe.getAttribute('style')};width:${iframeWidth}px; margin: auto;`)
    } else {

      this.iframe.setAttribute('width', '100%');
      this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;${'width:100%'};position:absolute;top:25px;left:0px;right:0px;bottom:50px`);
      let iframeWidth = this.iframe.getBoundingClientRect().width;
      let iframeHeight = iframeWidth / this.ratioHeightPerWidth - 50;
      this.iframe.setAttribute('style', `${this.iframe.getAttribute('style')};height:${iframeHeight}px; margin: auto;`)
    }
  }

  goFullScreen() {
    this.powerBiRecord.fullscreen();
  }

  constructor(private elementRef: ElementRef) {

  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    let nativeSize = this.elementRef.nativeElement.getBoundingClientRect();
    if (nativeSize.width > nativeSize.height * this.ratioHeightPerWidth) {
      let iframeHeight = this.iframe.getBoundingClientRect().height - 50;
      let iframeWidth = iframeHeight * this.ratioHeightPerWidth;
      this.iframe.style.width = iframeWidth + 'px';
      this.iframe.style.height = `${nativeSize.height - 25}px`;
    } else {
      let iframeWidth = this.iframe.getBoundingClientRect().width;
      let iframeHeight = iframeWidth / this.ratioHeightPerWidth - 50;
      this.iframe.style.height = iframeHeight + 'px';
      this.iframe.style.width = '100%';
    }
  }

}
