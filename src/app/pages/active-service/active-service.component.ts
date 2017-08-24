import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalState } from "../../global.state";

@Component({
  selector: 'active-service',
  styleUrls: ['./active-service.scss'],
  templateUrl: './active-service.html'
})
export class ActiveService implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._state.notifyDataChanged('menu.activeLink', {
        title: 'Service Activation Request'
      });
    }, 500);
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.onload = (e) => {
      this.elementRef.nativeElement.querySelector('.container-iframe').innerHTML = strHtml;
      document.write = oldDocumentWrite;
    };
    s.src = "https://alythex.formstack.com/forms/js.php/fv_activate";
    // this.elementRef.nativeElement.appendChild(s);
    let oldDocumentWrite = document.write;
    let strHtml = '';
    document.write = (node) => {
      strHtml += node;
    };
    this._renderer2.appendChild(this.elementRef.nativeElement, s);
  }

  public activeService = [];

  constructor(private _state: GlobalState, private elementRef: ElementRef, private _renderer2: Renderer2) {

  }
}
