import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { I18nComponent } from './i18n/i18n.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { Language } from './shared/models/language.enum';
import { ContentCardComponent } from './content-card/content-card.component';

const routes: Routes = [{ path: '', component: I18nComponent }];

/**
 * Create a translation loader that only load translation files found in ./assets/i18n/
 * @param http Http Client required by translation loader
 */
export function TranslateLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [I18nComponent, ContentCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      defaultLanguage: Language.EN,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateStore] // Load TranslateStore to prevent provider not found error
})
export class I18nModule {}
