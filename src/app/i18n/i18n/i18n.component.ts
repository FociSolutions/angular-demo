import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../shared/models/language.enum';

/**
 * Component showcasing how to change language during runtime and
 * also display the different ways to retrieve translation value
 */
@Component({
  selector: 'app-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss']
})
export class I18nComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  langParam = { lang: 'en' };

  constructor(private translate: TranslateService) {
    // Following options only need to be set by the component controlling language change
    // Set list of possible languages
    this.translate.addLangs([Language.EN, Language.FR]);
    // Set the current language
    this.translate.use(Language.EN);
  }

  ngOnInit(): void {
    // Update langParam whenever there is a language change
    this.subscription = this.translate.onLangChange.subscribe(e => (this.langParam.lang = e.lang));
  }

  ngOnDestroy(): void {
    // Always unsubscribe from long live subscriptions
    this.subscription.unsubscribe();
  }

  /**
   * Change current language to the unselected language
   */
  /*istanbul ignore next*/
  changeLanguage() {
    const next = this.translate.currentLang === Language.EN ? Language.FR : Language.EN;
    this.translate.use(next);
  }
}
