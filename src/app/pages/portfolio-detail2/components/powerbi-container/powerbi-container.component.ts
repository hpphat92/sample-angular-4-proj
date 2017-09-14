import { AfterViewInit, Component, ElementRef, HostListener, Input } from "@angular/core";
import "./powerbi.js";
import { ExtendedHttpService } from "../../../../shared/services/http/http.service";
import { AppConstant } from "../../../../app.constant";
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
  // public ratioHeightPerWidth: number = 1.83722037125;
  public ratioHeightPerWidth: number = 1.815;
  public powerBiRecord;
  public iOS: boolean = false;
  public isIPhone: boolean = !!navigator.platform && /iPhone/.test(navigator.platform);
  public isFullScreen: boolean = false;
  public currentStyle: any;


  private calculateFrameSize(nativeSize) {
    if (nativeSize.width > nativeSize.height * this.ratioHeightPerWidth) {
      let iframeWidth = (nativeSize.height - 36) * this.ratioHeightPerWidth;
      return {
        width: (iframeWidth),
        height: (+nativeSize.height)
      }
    } else {
      let iframeWidth = nativeSize.width;
      let iframeHeight = (iframeWidth) / this.ratioHeightPerWidth + 36;
      return {
        width: (iframeWidth),
        height: Math.max(+iframeHeight, 320)
      }
    }

  }

  configPowerbiReport() {
    let config = {
      type: 'report',
      tokenType: 1,
      accessToken: this.config.embedConfig.embedToken,
      embedUrl: this.config.embedConfig.embedUrl,
      id: this.config.embedConfig.reportId,
      permissions: 7,
      settings: {
        // filterPaneEnabled: true,
        // navContentPaneEnabled: true
      }
    };
    let nativeSize = this.elementRef.nativeElement.getBoundingClientRect();

    this.powerBiRecord = (window as any).powerbi.embed(this.elementRef.nativeElement.querySelector('div'), config);
    this.iframe = this.elementRef.nativeElement.querySelector('iframe');
    this.iframe.setAttribute('frameBorder', 0);
    this.iframe.setAttribute('allowfullscreen', '');
    let size = this.calculateFrameSize({
      width: nativeSize.width,
      height: Math.max(nativeSize.height - (this.isIPhone ? 0 : 50), 320)
    });
    this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;${'height:' + (size.height) + 'px'};left:0px;right:0px;width:${size.width}px; margin: auto;`);
  }

  ngAfterViewInit() {
    this.iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    this.configPowerbiReport();
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
    this.isFullScreen = true;
    if (!this.iOS) {
      this.powerBiRecord.fullscreen();
    } else {
      this.currentStyle = this.iframe.getAttribute('style');
      let size = this.calculateFrameSize({
        width: window.innerWidth,
        height: Math.max(window.innerHeight - (this.isIPhone ? 0 : 50), 320)
      });
      this.iframe.setAttribute('style', `position:fixed; top:0; left:0; right: 0; width:${size.width}px; height:${size.height}px; border:none; margin:auto; overflow:hidden; z-index:999999;`);
    }
  }

  public exitFullScreen(): void {
    if (this.iOS && this.isFullScreen) {
      this.isFullScreen = false;
      this.iframe.setAttribute('style', this.currentStyle);
      // let nativeSize = this.elementRef.nativeElement.getBoundingClientRect();
      // let size = this.calculateFrameSize({
      //   width: nativeSize.width,
      //   height: nativeSize.height - (this.isIPhone?0:50)
      // });
      // this.iframe.setAttribute('style', `overflow:hidden;overflow-x:hidden;overflow-y:hidden;${'height:' + (size.height) + 'px'};position:absolute;left:0px;right:0px;width:${size.width}px; margin: auto;`);
    }
  }

  public refreshDataset() {
    this._http.post(`${AppConstant.domain}/w-api/portfolios/${this.config.datasetId}/refresh`, null)
      .map((resp) => resp.json())
      .subscribe((resp) => {
        this.powerBiRecord && this.powerBiRecord.refresh();
        setTimeout(() => {
          this.configPowerbiReport();
        }, 500);

      })
  }

  constructor(private elementRef: ElementRef, private _http: ExtendedHttpService) {

  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    if (!this.iOS || !this.isFullScreen) {
      let nativeSize = this.elementRef.nativeElement.getBoundingClientRect();
      let size = this.calculateFrameSize({
        width: nativeSize.width,
        height: Math.max(nativeSize.height - (this.isIPhone ? 0 : 50), 320)
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
    } else {
      let size = this.calculateFrameSize({
        width: window.innerWidth,
        height: Math.max(window.innerHeight - (this.isIPhone ? 0 : 50), 320)
      });
      this.iframe.style.width = `${size.width}px`;
      this.iframe.style.height = `${size.height}px`;
    }
  }

}