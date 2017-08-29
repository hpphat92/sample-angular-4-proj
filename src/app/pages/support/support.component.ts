import { AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: 'support',
  styleUrls: ['./support.scss'],
  templateUrl: './support.html'
})
export class Support implements AfterViewInit {

  constructor(private elementRef: ElementRef, private _renderer2: Renderer2) {
  }

  private loadScript(selector, src) {
    return new Promise((resolve, reject) => {
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.onload = (e) => {
        document.write = oldDocumentWrite;
        this.elementRef.nativeElement.querySelector(selector).innerHTML = stringHtml;
        resolve();
      };
      s.src = src;
      // this.elementRef.nativeElement.appendChild(s);
      let oldDocumentWrite = document.write;
      let stringHtml = '';
      document.write = (node) => {
        stringHtml += node;
      }
      this._renderer2.appendChild(this.elementRef.nativeElement, s);
    })

  }

  ngAfterViewInit() {
    // this.loadScript('.container-faq-iframe', "https://alythex.formstack.com/forms/js.php/fv_faq").then(() => {
    //   this.loadScript('.container-iframe', "https://alythex.formstack.com/forms/js.php/fv_support");
    // });
  }


  // let u = document.createElement('noscript');
  // u.innerText = '<a href="https://alythex.formstack.com/forms/fv_support" title="Online Form">Online Form - FV - Embedded Support</a>';
  // this._renderer2.appendChild(this.elementRef.nativeElement, u);
}
