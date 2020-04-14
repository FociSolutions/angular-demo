'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angular-demo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/samples.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-7d377028e40d60634c2fb5de1567c9dd"' : 'data-target="#xs-additional-page-7d377028e40d60634c2fb5de1567c9dd"' }>
                                                <span class="link-name">Samples</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-7d377028e40d60634c2fb5de1567c9dd"' : 'id="xs-additional-page-7d377028e40d60634c2fb5de1567c9dd"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/samples/complex-forms.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Complex Forms</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/samples/end-to-end-testing.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">End-To-End Testing</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/samples/i18n.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">i18n</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/samples/input-and-output.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Input and Output</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/samples/rxjs.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">RxJs</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/samples/unit-testing.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Unit Testing</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/samples/web-storage.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Web Storage</a>
                                            </li>
                                        </ul>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5a437933c19d6e77b78bd3afdf86056a"' : 'data-target="#xs-components-links-module-AppModule-5a437933c19d6e77b78bd3afdf86056a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5a437933c19d6e77b78bd3afdf86056a"' :
                                            'id="xs-components-links-module-AppModule-5a437933c19d6e77b78bd3afdf86056a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComplexFormModule.html" data-type="entity-link">ComplexFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' : 'data-target="#xs-components-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' :
                                            'id="xs-components-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' }>
                                            <li class="link">
                                                <a href="components/ComplexFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComplexFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayerListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerListItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayerListItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamNameInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamNameInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' : 'data-target="#xs-injectables-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' :
                                        'id="xs-injectables-links-module-ComplexFormModule-149c83cf3dab991f1f3246365019bffc"' }>
                                        <li class="link">
                                            <a href="injectables/TeamControlService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TeamControlService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/E2eModule.html" data-type="entity-link">E2eModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-E2eModule-5cb7bd8bfac5d5a7bae76b54f4038bb4"' : 'data-target="#xs-components-links-module-E2eModule-5cb7bd8bfac5d5a7bae76b54f4038bb4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-E2eModule-5cb7bd8bfac5d5a7bae76b54f4038bb4"' :
                                            'id="xs-components-links-module-E2eModule-5cb7bd8bfac5d5a7bae76b54f4038bb4"' }>
                                            <li class="link">
                                                <a href="components/DeleteDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/E2eComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">E2eComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessageInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessageListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/I18nModule.html" data-type="entity-link">I18nModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-I18nModule-61867d515d931b7d4109242b6b2c4c55"' : 'data-target="#xs-components-links-module-I18nModule-61867d515d931b7d4109242b6b2c4c55"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-I18nModule-61867d515d931b7d4109242b6b2c4c55"' :
                                            'id="xs-components-links-module-I18nModule-61867d515d931b7d4109242b6b2c4c55"' }>
                                            <li class="link">
                                                <a href="components/ContentCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/I18nComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">I18nComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InputAndOutputModule.html" data-type="entity-link">InputAndOutputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InputAndOutputModule-a25a1f2f27109bb9b5b24111bc7bcf3e"' : 'data-target="#xs-components-links-module-InputAndOutputModule-a25a1f2f27109bb9b5b24111bc7bcf3e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InputAndOutputModule-a25a1f2f27109bb9b5b24111bc7bcf3e"' :
                                            'id="xs-components-links-module-InputAndOutputModule-a25a1f2f27109bb9b5b24111bc7bcf3e"' }>
                                            <li class="link">
                                                <a href="components/MultiInputExampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MultiInputExampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UppercaseTextComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UppercaseTextComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RxjsModule.html" data-type="entity-link">RxjsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RxjsModule-eac3356c47d57ddf6674864ca97b2801"' : 'data-target="#xs-components-links-module-RxjsModule-eac3356c47d57ddf6674864ca97b2801"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RxjsModule-eac3356c47d57ddf6674864ca97b2801"' :
                                            'id="xs-components-links-module-RxjsModule-eac3356c47d57ddf6674864ca97b2801"' }>
                                            <li class="link">
                                                <a href="components/CombiningObservablesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CombiningObservablesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FibonacciComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FibonacciComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequenceListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SequenceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingCartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShoppingCartComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UnitTestModule.html" data-type="entity-link">UnitTestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' : 'data-target="#xs-components-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' :
                                            'id="xs-components-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' }>
                                            <li class="link">
                                                <a href="components/UnitTestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnitTestComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' : 'data-target="#xs-injectables-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' :
                                        'id="xs-injectables-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' }>
                                        <li class="link">
                                            <a href="injectables/EchoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EchoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EchoTooService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EchoTooService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' : 'data-target="#xs-pipes-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' :
                                            'id="xs-pipes-links-module-UnitTestModule-dcba347bc9c3d20812f366a3bb6203e0"' }>
                                            <li class="link">
                                                <a href="pipes/UppercasePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UppercasePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebStorageModule.html" data-type="entity-link">WebStorageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WebStorageModule-c229f307eaae5917fd58585d8fe3a848"' : 'data-target="#xs-components-links-module-WebStorageModule-c229f307eaae5917fd58585d8fe3a848"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WebStorageModule-c229f307eaae5917fd58585d8fe3a848"' :
                                            'id="xs-components-links-module-WebStorageModule-c229f307eaae5917fd58585d8fe3a848"' }>
                                            <li class="link">
                                                <a href="components/WebStorageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WebStorageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/E2ePage.html" data-type="entity-link">E2ePage</a>
                            </li>
                            <li class="link">
                                <a href="classes/InputBase.html" data-type="entity-link">InputBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/Player.html" data-type="entity-link">Player</a>
                            </li>
                            <li class="link">
                                <a href="classes/Team.html" data-type="entity-link">Team</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FibonacciService.html" data-type="entity-link">FibonacciService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link">MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionStorageService.html" data-type="entity-link">SessionStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShoppingCartService.html" data-type="entity-link">ShoppingCartService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/EchoData.html" data-type="entity-link">EchoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KeyValuePair.html" data-type="entity-link">KeyValuePair</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});