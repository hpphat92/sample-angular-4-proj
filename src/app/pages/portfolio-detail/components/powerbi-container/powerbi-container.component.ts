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
  public ratioHeightPerWidth: number = 1.83722037125;
  // public ratioHeightPerWidth: number = 1.815;
  public powerBiRecord;


  private calculateFrameSize(nativeSize) {
    if (nativeSize.width > nativeSize.height * this.ratioHeightPerWidth) {
      let iframeWidth = (nativeSize.height - 36) * this.ratioHeightPerWidth;
      return {
        width: Math.floor(iframeWidth),
        height: Math.floor(+nativeSize.height)
      }
    } else {
      let iframeWidth = nativeSize.width;
      let iframeHeight = (iframeWidth) / this.ratioHeightPerWidth + 36;
      return {
        width: Math.floor(iframeWidth),
        height: Math.floor(+iframeHeight)
      }
    }

  }

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
    let size = this.calculateFrameSize({
      width: nativeSize.width,
      height: nativeSize.height - 50
    });
    this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;${'height:' + (size.height) + 'px'};position:absolute;left:0px;right:0px;width:${size.width}px; margin: auto;`);
    // if (nativeSize.width > nativeSize.height * this.ratioHeightPerWidth) {
    //   let iframeWidth = (nativeSize.height - 36) * this.ratioHeightPerWidth;
    //   this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;${'height:' + (nativeSize.height) + 'px'};position:absolute;left:0px;right:0px;width:${iframeWidth}px; margin: auto;`);
    // } else {
    //
    //   let iframeWidth = nativeSize.width;
    //   let iframeHeight = (iframeWidth) / this.ratioHeightPerWidth + 36;
    //   this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;width:${iframeWidth}px;position:absolute;left:0px;right:0px;height:${iframeHeight}px; margin: auto;`);
    // }
  }

  goFullScreen() {
    this.powerBiRecord.fullscreen();
  }

  constructor(private elementRef: ElementRef) {

  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    let nativeSize = this.elementRef.nativeElement.getBoundingClientRect();
    let size = this.calculateFrameSize({
      width: nativeSize.width,
      height: nativeSize.height - 50
    });

    this.iframe.style.height = size.height + 'px';
    this.iframe.style.width = size.width + 'px';
    // if (nativeSize.width > nativeSize.height * this.ratioHeightPerWidth) {
    //   let iframeWidth = (nativeSize.height - 36) * this.ratioHeightPerWidth;
    //   this.iframe.style.width = iframeWidth + 'px';
    //   this.iframe.style.height = `${nativeSize.height}px`;
    // } else {
    //   let iframeWidth = nativeSize.width;
    //   let iframeHeight = (iframeWidth) / this.ratioHeightPerWidth + 36;
    //   this.iframe.style.height = iframeHeight + 'px';
    //   this.iframe.style.width = iframeWidth + 'px';
    // }
  }

}
