import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pulpo-test';

  private translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('es');
  }
}
