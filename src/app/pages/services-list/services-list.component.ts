import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { GlobalState } from "../../global.state";

@Component({
  selector: 'services-list',
  styleUrls: ['./services-list.scss'],
  templateUrl: './services-list.html'
})
export class ServicesList implements AfterViewInit {
  public items = [];
  public position = {
    position: 'top cursor'
  };

  @ViewChildren('allTheseThings') things: QueryList<any>;

  constructor(private _http: ExtendedHttpService,
              private _state: GlobalState,
              private _elementRef: ElementRef) {
    this._http.get(`${AppConstant.domain}/w-api/services/all`).map((json) => json.json()).subscribe((resp) => {
      this.items = resp.data;
      // this._state.notifyDataChanged('menu.activeLink', {
      //   title: 'Alythex Services'
      // });
    });
  }

  public ngAfterViewInit(): void {
    this.things.changes.subscribe(t => {
      let iframes = Array.from(this._elementRef.nativeElement.querySelectorAll('iframe'));
      if (!iframes.length) {
        return;
      }
      this.items.forEach((service) => {
        let iframe = iframes.find((i) => service.id == (i as any).getAttribute('id'));
        if (iframe) {
          (iframe as any).style.width = '100%';
          (iframe as any).contentDocument.open();
          (iframe as any).contentDocument.write(service.description);
          (iframe as any).contentDocument.close();
          (iframe as any).height = (iframe as any).contentWindow.document.body.scrollHeight;
          (iframe as any).contentWindow.document.body.style.overflow = 'hidden';
        }
      })
    })
  }
}
