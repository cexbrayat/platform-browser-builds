/**
 * @license Angular v7.0.0-rc.1-1c561a833c
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */
import { Inject, Injectable, InjectionToken, NgModule, NgZone, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { BrowserModule, DOCUMENT, ɵDomRendererFactory2 } from '@angular/platform-browser';
import { __extends } from 'tslib';
import { AnimationBuilder, AnimationFactory, sequence } from '@angular/animations';
import { AnimationDriver, ɵAnimationEngine, ɵAnimationStyleNormalizer, ɵCssKeyframesDriver, ɵNoopAnimationDriver, ɵWebAnimationsDriver, ɵWebAnimationsStyleNormalizer, ɵsupportsWebAnimations } from '@angular/animations/browser';
import { DOCUMENT as DOCUMENT$1 } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var BrowserAnimationBuilder = /** @class */ (function (_super) {
    __extends(BrowserAnimationBuilder, _super);
    function BrowserAnimationBuilder(rootRenderer, doc) {
        var _this = _super.call(this) || this;
        _this._nextAnimationId = 0;
        /** @type {?} */
        var typeData = /** @type {?} */ ({
            id: '0',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: { animation: [] }
        });
        _this._renderer = /** @type {?} */ (rootRenderer.createRenderer(doc.body, typeData));
        return _this;
    }
    /**
     * @param {?} animation
     * @return {?}
     */
    BrowserAnimationBuilder.prototype.build = /**
     * @param {?} animation
     * @return {?}
     */
    function (animation) {
        /** @type {?} */
        var id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        /** @type {?} */
        var entry = Array.isArray(animation) ? sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
    };
    BrowserAnimationBuilder.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BrowserAnimationBuilder.ctorParameters = function () { return [
        { type: RendererFactory2 },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return BrowserAnimationBuilder;
}(AnimationBuilder));
var BrowserAnimationFactory = /** @class */ (function (_super) {
    __extends(BrowserAnimationFactory, _super);
    function BrowserAnimationFactory(_id, _renderer) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this._renderer = _renderer;
        return _this;
    }
    /**
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    BrowserAnimationFactory.prototype.create = /**
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    function (element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    };
    return BrowserAnimationFactory;
}(AnimationFactory));
var RendererAnimationPlayer = /** @class */ (function () {
    function RendererAnimationPlayer(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    RendererAnimationPlayer.prototype._listen = /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    function (eventName, callback) {
        return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
    };
    /**
     * @param {?} command
     * @param {...?} args
     * @return {?}
     */
    RendererAnimationPlayer.prototype._command = /**
     * @param {?} command
     * @param {...?} args
     * @return {?}
     */
    function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDone = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._listen('done', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onStart = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._listen('start', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDestroy = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._listen('destroy', fn); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.init = /**
     * @return {?}
     */
    function () { this._command('init'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.hasStarted = /**
     * @return {?}
     */
    function () { return this._started; };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.play = /**
     * @return {?}
     */
    function () {
        this._command('play');
        this._started = true;
    };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.pause = /**
     * @return {?}
     */
    function () { this._command('pause'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.restart = /**
     * @return {?}
     */
    function () { this._command('restart'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.finish = /**
     * @return {?}
     */
    function () { this._command('finish'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.destroy = /**
     * @return {?}
     */
    function () { this._command('destroy'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.reset = /**
     * @return {?}
     */
    function () { this._command('reset'); };
    /**
     * @param {?} p
     * @return {?}
     */
    RendererAnimationPlayer.prototype.setPosition = /**
     * @param {?} p
     * @return {?}
     */
    function (p) { this._command('setPosition', p); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.getPosition = /**
     * @return {?}
     */
    function () { return 0; };
    return RendererAnimationPlayer;
}());
/**
 * @param {?} renderer
 * @param {?} element
 * @param {?} id
 * @param {?} command
 * @param {?} args
 * @return {?}
 */
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, "@@" + id + ":" + command, args);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var ANIMATION_PREFIX = '@';
/** @type {?} */
var DISABLE_ANIMATIONS_FLAG = '@.disabled';
var AnimationRendererFactory = /** @class */ (function () {
    function AnimationRendererFactory(delegate, engine, _zone) {
        this.delegate = delegate;
        this.engine = engine;
        this._zone = _zone;
        this._currentId = 0;
        this._microtaskId = 1;
        this._animationCallbacksBuffer = [];
        this._rendererCache = new Map();
        this._cdRecurDepth = 0;
        this.promise = Promise.resolve(0);
        engine.onRemovalComplete = function (element, delegate) {
            // Note: if an component element has a leave animation, and the component
            // a host leave animation, the view engine will call `removeChild` for the parent
            // component renderer as well as for the child component renderer.
            // Therefore, we need to check if we already removed the element.
            if (delegate && delegate.parentNode(element)) {
                delegate.removeChild(element.parentNode, element);
            }
        };
    }
    /**
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    AnimationRendererFactory.prototype.createRenderer = /**
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    function (hostElement, type) {
        var _this = this;
        /** @type {?} */
        var EMPTY_NAMESPACE_ID = '';
        /** @type {?} */
        var delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation']) {
            /** @type {?} */
            var renderer = this._rendererCache.get(delegate);
            if (!renderer) {
                renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                // only cache this result when the base renderer is used
                this._rendererCache.set(delegate, renderer);
            }
            return renderer;
        }
        /** @type {?} */
        var componentId = type.id;
        /** @type {?} */
        var namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        this.engine.register(namespaceId, hostElement);
        /** @type {?} */
        var animationTriggers = /** @type {?} */ (type.data['animation']);
        animationTriggers.forEach(function (trigger) { return _this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger); });
        return new AnimationRenderer(this, namespaceId, delegate, this.engine);
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.begin = /**
     * @return {?}
     */
    function () {
        this._cdRecurDepth++;
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype._scheduleCountTask = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // always use promise to schedule microtask instead of use Zone
        this.promise.then(function () { _this._microtaskId++; });
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} count
     * @param {?} fn
     * @param {?} data
     * @return {?}
     */
    AnimationRendererFactory.prototype.scheduleListenerCallback = /**
     * \@internal
     * @param {?} count
     * @param {?} fn
     * @param {?} data
     * @return {?}
     */
    function (count, fn, data) {
        var _this = this;
        if (count >= 0 && count < this._microtaskId) {
            this._zone.run(function () { return fn(data); });
            return;
        }
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then(function () {
                _this._zone.run(function () {
                    _this._animationCallbacksBuffer.forEach(function (tuple) {
                        var fn = tuple[0], data = tuple[1];
                        fn(data);
                    });
                    _this._animationCallbacksBuffer = [];
                });
            });
        }
        this._animationCallbacksBuffer.push([fn, data]);
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.end = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._cdRecurDepth--;
        // this is to prevent animations from running twice when an inner
        // component does CD when a parent component insted has inserted it
        if (this._cdRecurDepth == 0) {
            this._zone.runOutsideAngular(function () {
                _this._scheduleCountTask();
                _this.engine.flush(_this._microtaskId);
            });
        }
        if (this.delegate.end) {
            this.delegate.end();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.whenRenderingDone = /**
     * @return {?}
     */
    function () { return this.engine.whenRenderingDone(); };
    AnimationRendererFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AnimationRendererFactory.ctorParameters = function () { return [
        { type: RendererFactory2 },
        { type: ɵAnimationEngine },
        { type: NgZone }
    ]; };
    return AnimationRendererFactory;
}());
var BaseAnimationRenderer = /** @class */ (function () {
    function BaseAnimationRenderer(namespaceId, delegate, engine) {
        this.namespaceId = namespaceId;
        this.delegate = delegate;
        this.engine = engine;
        this.destroyNode = this.delegate.destroyNode ? function (n) { return ((delegate.destroyNode))(n); } : null;
    }
    Object.defineProperty(BaseAnimationRenderer.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () { return this.delegate.data; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BaseAnimationRenderer.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.engine.destroy(this.namespaceId, this.delegate);
        this.delegate.destroy();
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createElement = /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    function (name, namespace) {
        return this.delegate.createElement(name, namespace);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createComment = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { return this.delegate.createComment(value); };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createText = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { return this.delegate.createText(value); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.appendChild = /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    function (parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, false);
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.insertBefore = /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    function (parent, newChild, refChild) {
        this.delegate.insertBefore(parent, newChild, refChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, true);
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeChild = /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    function (parent, oldChild) {
        this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
    };
    /**
     * @param {?} selectorOrNode
     * @param {?=} preserveContent
     * @return {?}
     */
    BaseAnimationRenderer.prototype.selectRootElement = /**
     * @param {?} selectorOrNode
     * @param {?=} preserveContent
     * @return {?}
     */
    function (selectorOrNode, preserveContent) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    BaseAnimationRenderer.prototype.parentNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { return this.delegate.parentNode(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    BaseAnimationRenderer.prototype.nextSibling = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { return this.delegate.nextSibling(node); };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setAttribute = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    function (el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeAttribute = /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    function (el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    BaseAnimationRenderer.prototype.addClass = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) { this.delegate.addClass(el, name); };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeClass = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) { this.delegate.removeClass(el, name); };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?=} flags
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setStyle = /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?=} flags
     * @return {?}
     */
    function (el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?=} flags
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeStyle = /**
     * @param {?} el
     * @param {?} style
     * @param {?=} flags
     * @return {?}
     */
    function (el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setProperty = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
            this.disableAnimations(el, !!value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setValue = /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    function (node, value) { this.delegate.setValue(node, value); };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    BaseAnimationRenderer.prototype.listen = /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    function (target, eventName, callback) {
        return this.delegate.listen(target, eventName, callback);
    };
    /**
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.disableAnimations = /**
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    function (element, value) {
        this.engine.disableAnimations(element, value);
    };
    return BaseAnimationRenderer;
}());
var AnimationRenderer = /** @class */ (function (_super) {
    __extends(AnimationRenderer, _super);
    function AnimationRenderer(factory, namespaceId, delegate, engine) {
        var _this = _super.call(this, namespaceId, delegate, engine) || this;
        _this.factory = factory;
        _this.namespaceId = namespaceId;
        return _this;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    AnimationRenderer.prototype.setProperty = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX) {
            if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                value = value === undefined ? true : !!value;
                this.disableAnimations(el, /** @type {?} */ (value));
            }
            else {
                this.engine.process(this.namespaceId, el, name.substr(1), value);
            }
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    AnimationRenderer.prototype.listen = /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    function (target, eventName, callback) {
        var _this = this;
        var _a;
        if (eventName.charAt(0) == ANIMATION_PREFIX) {
            /** @type {?} */
            var element = resolveElementFromTarget(target);
            /** @type {?} */
            var name_1 = eventName.substr(1);
            /** @type {?} */
            var phase = '';
            // @listener.phase is for trigger animation callbacks
            // @@listener is for animation builder callbacks
            if (name_1.charAt(0) != ANIMATION_PREFIX) {
                _a = parseTriggerCallbackName(name_1), name_1 = _a[0], phase = _a[1];
            }
            return this.engine.listen(this.namespaceId, element, name_1, phase, function (event) {
                /** @type {?} */
                var countId = (/** @type {?} */ (event))['_data'] || -1;
                _this.factory.scheduleListenerCallback(countId, callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
    };
    return AnimationRenderer;
}(BaseAnimationRenderer));
/**
 * @param {?} target
 * @return {?}
 */
function resolveElementFromTarget(target) {
    switch (target) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return target;
    }
}
/**
 * @param {?} triggerName
 * @return {?}
 */
function parseTriggerCallbackName(triggerName) {
    /** @type {?} */
    var dotIndex = triggerName.indexOf('.');
    /** @type {?} */
    var trigger = triggerName.substring(0, dotIndex);
    /** @type {?} */
    var phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}

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
var InjectableAnimationEngine = /** @class */ (function (_super) {
    __extends(InjectableAnimationEngine, _super);
    function InjectableAnimationEngine(doc, driver, normalizer) {
        return _super.call(this, doc.body, driver, normalizer) || this;
    }
    InjectableAnimationEngine.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    InjectableAnimationEngine.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT$1,] }] },
        { type: AnimationDriver },
        { type: ɵAnimationStyleNormalizer }
    ]; };
    return InjectableAnimationEngine;
}(ɵAnimationEngine));
/**
 * @return {?}
 */
function instantiateSupportedAnimationDriver() {
    return ɵsupportsWebAnimations() ? new ɵWebAnimationsDriver() : new ɵCssKeyframesDriver();
}
/**
 * @return {?}
 */
function instantiateDefaultStyleNormalizer() {
    return new ɵWebAnimationsStyleNormalizer();
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
/** *
 * \@experimental Animation support is experimental.
  @type {?} */
var ANIMATION_MODULE_TYPE = new InjectionToken('AnimationModuleType');
/** @type {?} */
var SHARED_ANIMATION_PROVIDERS = [
    { provide: AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: ɵAnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: ɵAnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [ɵDomRendererFactory2, ɵAnimationEngine, NgZone]
    }
];
/** *
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
  @type {?} */
var BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' }
].concat(SHARED_ANIMATION_PROVIDERS);
/** *
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
  @type {?} */
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useClass: ɵNoopAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }
].concat(SHARED_ANIMATION_PROVIDERS);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 * \@experimental
 */
var BrowserAnimationsModule = /** @class */ (function () {
    function BrowserAnimationsModule() {
    }
    BrowserAnimationsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_ANIMATIONS_PROVIDERS,
                },] },
    ];
    return BrowserAnimationsModule;
}());
/**
 * A null player that must be imported to allow disabling of animations.
 * \@experimental
 */
var NoopAnimationsModule = /** @class */ (function () {
    function NoopAnimationsModule() {
    }
    NoopAnimationsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
                },] },
    ];
    return NoopAnimationsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

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
/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { BrowserAnimationsModule, NoopAnimationsModule, ANIMATION_MODULE_TYPE, BrowserAnimationBuilder as ɵBrowserAnimationBuilder, BrowserAnimationFactory as ɵBrowserAnimationFactory, AnimationRenderer as ɵAnimationRenderer, AnimationRendererFactory as ɵAnimationRendererFactory, BaseAnimationRenderer as ɵg, BROWSER_ANIMATIONS_PROVIDERS as ɵe, BROWSER_NOOP_ANIMATIONS_PROVIDERS as ɵf, InjectableAnimationEngine as ɵa, instantiateDefaultStyleNormalizer as ɵc, instantiateRendererFactory as ɵd, instantiateSupportedAnimationDriver as ɵb };
//# sourceMappingURL=animations.js.map
