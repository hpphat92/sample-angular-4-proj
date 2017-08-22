import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { isViewDebugError } from "@angular/core/src/view/errors";

@Component({
  selector: 'submit-data',
  styleUrls: ['./submit-data.scss'],
  templateUrl: './submit-data.html'
})
export class SubmitData implements AfterViewInit {

  constructor(private elementRef: ElementRef, private _renderer2: Renderer2) {
  }

  ngAfterViewInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.onload = (e) => {
      document.write = oldDocumentWrite;
    };
    s.src = "https://alythex.app.box.com/upload-widget/embed.js?folderID=33922264492&title=Secure%20File%20Submission%3A%20Client%20Demo&isDescriptionFieldShown=1&isEmailRequired=1&width=385&height=420&token=33c71g6l77ppaugb5c14vz6l1oyr01kb&callback=callback";
    // this.elementRef.nativeElement.appendChild(s);
    let oldDocumentWrite = document.write;
    document.write = (node) => {
      this.elementRef.nativeElement.querySelector('.container-iframe').innerHTML = node;
    }
    this._renderer2.appendChild(this.elementRef.nativeElement, s);
  }
}
