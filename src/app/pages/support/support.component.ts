import { AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: 'support',
  styleUrls: ['support.scss'],
  templateUrl: './support.html'
})
export class Support implements AfterViewInit {

  constructor(private elementRef: ElementRef, private _renderer2: Renderer2) {
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
