## Internationalization (i18n) Module

Demonstrate how to use [ngx-translate](https://github.com/ngx-translate/core) in a lazy loaded feature module. All techniques used in this module are derived from the following tutorials, please give them a read for more indepth understanding:

- https://github.com/ngx-translate/core
- https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate
- https://stackblitz.com/github/ngx-translate/example

This module display a card with language switch button.

_Folder structure of this module loosely follows [the Angular style guide](https://angular.io/guide/styleguide)._

### Components

This module contains 2 components:

- `I18nComponent` is the root component where the language switch functionality resides and also showcase a few ways to retrieve translation value
  - `ContentCardComponent` is used to display the card body and also showcase the most basic usage of the translation service

### Models

This module only contains `Language` enum to represent the available languages.
