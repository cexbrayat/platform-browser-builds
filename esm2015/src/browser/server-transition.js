/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_INITIALIZER, ApplicationInitStatus, InjectionToken, Injector } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
/** *
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
  @type {?} */
export const TRANSITION_ID = new InjectionToken('TRANSITION_ID');
/**
 * @param {?} transitionId
 * @param {?} document
 * @param {?} injector
 * @return {?}
 */
export function appInitializerFactory(transitionId, document, injector) {
    return () => {
        // Wait for all application initializers to be completed before removing the styles set by
        // the server.
        injector.get(ApplicationInitStatus).donePromise.then(() => {
            /** @type {?} */
            const dom = getDOM();
            /** @type {?} */
            const styles = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
            styles.filter(el => dom.getAttribute(el, 'ng-transition') === transitionId)
                .forEach(el => dom.remove(el));
        });
    };
}
/** @type {?} */
export const SERVER_TRANSITION_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFactory,
        deps: [TRANSITION_ID, DOCUMENT, Injector],
        multi: true
    },
];
//# sourceMappingURL=server-transition.js.map