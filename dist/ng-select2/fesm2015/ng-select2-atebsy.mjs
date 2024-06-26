import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, Input, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

const _c0 = ["selector"];
const _c1 = [[["option"], ["optgroup"]]];
const _c2 = ["option, optgroup"];
class NgSelect2Component {
    // private style = `CSS`;
    constructor(renderer, zone, _element) {
        this.renderer = renderer;
        this.zone = zone;
        this._element = _element;
        // value for placeholder
        this.placeholder = '';
        this.dropdownParent = '';
        this.allowClear = false;
        // enable / disable select2
        this.disabled = false;
        // Specify the select's ID
        this.id = null;
        // Specify the select's class(es)
        this.class = null;
        // Specify the select's required attribute
        this.required = null;
        // emitter when value is changed
        this.valueChanged = new EventEmitter();
        this.element = undefined;
        this.check = false;
        this.propagateChange = (value) => { };
    }
    ngDoCheck() {
        if (!this.element) {
            return;
        }
    }
    ngOnInit() {
        // if (this.cssImport) {
        //   const head = document.getElementsByTagName('head')[0];
        //   const link: any = head.children[head.children.length - 1];
        //   if (!link.version) {
        //     const newLink = this.renderer.createElement(head, 'style');
        //     this.renderer.setElementProperty(newLink, 'type', 'text/css');
        //     this.renderer.setElementProperty(newLink, 'version', 'select2');
        //     this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
        //   }
        // }
    }
    ngOnChanges(changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            const newValue = this.value;
            this.setElementValue(newValue);
            this.valueChanged.emit(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            const newValue = changes['value'].currentValue;
            this.setElementValue(newValue);
            this.valueChanged.emit(newValue);
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.element.data('select2').$container.find('.select2-selection__placeholder').text(this.placeholder);
        }
        if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', '#' + this.dropdownParent);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    }
    ngAfterViewInit() {
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', '#' + this.dropdownParent);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (this.value !== undefined && this.value !== null) {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect change', (e) => {
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            const newValue = this.element.val();
            this.valueChanged.emit(newValue);
            if (e.type !== 'change') {
                this.propagateChange(newValue);
            }
        });
    }
    ngOnDestroy() {
        if (this.element) {
            this.element.off('select2:select');
        }
    }
    initPlugin() {
        if (!this.element.select2) {
            if (!this.check) {
                this.check = true;
                console.log('Please add Select2 library (js file) to the project.' +
                    'You can download it from https://github.com/select2/select2/tree/master/dist/js.');
            }
            return;
        }
        // If select2 already initialized remove him and remove all tags inside
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.renderer.setProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        const options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve',
            placeholder: this.placeholder
        };
        if (this.dropdownParent) {
            options.dropdownParent = jQuery('#' + this.dropdownParent);
        }
        Object.assign(options, this.options);
        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], (oldMatcher) => {
                options.matcher = oldMatcher(options.matcher);
                this.element.select2(options);
                if (typeof this.value !== 'undefined') {
                    this.setElementValue(this.value);
                }
            });
        }
        else {
            this.element.select2(options);
        }
        this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
    }
    setElementValue(newValue) {
        // this.zone.run(() => {
        if (Array.isArray(newValue)) {
            for (const option of this.selector.nativeElement.options) {
                this.renderer.setProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
            }
        }
        else {
            this.renderer.setProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
    }
    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() {
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
    }
}
NgSelect2Component.ɵfac = function NgSelect2Component_Factory(t) { return new (t || NgSelect2Component)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ElementRef)); };
NgSelect2Component.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgSelect2Component, selectors: [["ng-select2"]], viewQuery: function NgSelect2Component_Query(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.selector = _t.first);
        }
    }, inputs: { data: "data", placeholder: "placeholder", dropdownParent: "dropdownParent", allowClear: "allowClear", value: "value", width: "width", disabled: "disabled", id: "id", class: "class", required: "required", options: "options" }, outputs: { valueChanged: "valueChanged" }, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgSelect2Component),
                multi: true,
            },
        ]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c2, decls: 3, vars: 3, consts: [["selector", ""]], template: function NgSelect2Component_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵprojectionDef(_c1);
            i0.ɵɵelementStart(0, "select", null, 0);
            i0.ɵɵprojection(2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵattribute("id", ctx.id)("class", ctx.class)("required", ctx.required);
        }
    }, encapsulation: 2, changeDetection: 0 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgSelect2Component, [{
            type: Component,
            args: [{ selector: 'ng-select2', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgSelect2Component),
                            multi: true,
                        },
                    ], template: "<select #selector [attr.id]=\"id\" [attr.class]=\"class\" [attr.required]=\"required\">\n  <ng-content select=\"option, optgroup\">\n  </ng-content>\n</select>\n" }]
        }], function () { return [{ type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ElementRef }]; }, { selector: [{
                type: ViewChild,
                args: ['selector', { static: true }]
            }], data: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], dropdownParent: [{
                type: Input
            }], allowClear: [{
                type: Input
            }], value: [{
                type: Input
            }], width: [{
                type: Input
            }], disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], class: [{
                type: Input
            }], required: [{
                type: Input
            }], options: [{
                type: Input
            }], valueChanged: [{
                type: Output
            }] });
})();

class NgSelect2Module {
}
NgSelect2Module.ɵfac = function NgSelect2Module_Factory(t) { return new (t || NgSelect2Module)(); };
NgSelect2Module.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgSelect2Module });
NgSelect2Module.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgSelect2Module, [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [NgSelect2Component],
                    exports: [NgSelect2Component]
                }]
        }], null, null);
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgSelect2Module, { declarations: [NgSelect2Component], imports: [CommonModule], exports: [NgSelect2Component] }); })();

/*
 * Public API Surface of ng-select2
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgSelect2Component, NgSelect2Module };
//# sourceMappingURL=ng-select2-atebsy.mjs.map
//# sourceMappingURL=ng-select2-atebsy.mjs.map
