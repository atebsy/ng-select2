import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
const _c0 = ["selector"];
const _c1 = [[["option"], ["optgroup"]]];
const _c2 = ["option, optgroup"];
export class NgSelect2Component {
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
NgSelect2Component.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgSelect2Component, selectors: [["ng-select2"]], viewQuery: function NgSelect2Component_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.selector = _t.first);
    } }, inputs: { data: "data", placeholder: "placeholder", dropdownParent: "dropdownParent", allowClear: "allowClear", value: "value", width: "width", disabled: "disabled", id: "id", class: "class", required: "required", options: "options" }, outputs: { valueChanged: "valueChanged" }, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgSelect2Component),
                multi: true,
            },
        ]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c2, decls: 3, vars: 3, consts: [["selector", ""]], template: function NgSelect2Component_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c1);
        i0.ɵɵelementStart(0, "select", null, 0);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵattribute("id", ctx.id)("class", ctx.class)("required", ctx.required);
    } }, encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgSelect2Component, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1zZWxlY3QyL3NyYy9saWIvbmctc2VsZWN0Mi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1zZWxlY3QyL3NyYy9saWIvbmctc2VsZWN0Mi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUVWLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBbUJ6RSxNQUFNLE9BQU8sa0JBQWtCO0lBd0M3Qix5QkFBeUI7SUFFekIsWUFBb0IsUUFBbUIsRUFBUyxJQUFZLEVBQVMsUUFBb0I7UUFBckUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBcEN6Rix3QkFBd0I7UUFDZixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBUTVCLDJCQUEyQjtRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLDBCQUEwQjtRQUNqQixPQUFFLEdBQVcsSUFBSSxDQUFDO1FBRTNCLGlDQUFpQztRQUN4QixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBRTlCLDBDQUEwQztRQUNqQyxhQUFRLEdBQVksSUFBSSxDQUFDO1FBS2xDLGdDQUFnQztRQUN0QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBRXZELFlBQU8sR0FBUSxTQUFT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QU0sYUFDcEM7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUM7d0JBQ2pELEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGOzBHQUd3QyxRQUFRO2tCQUFoRCxTQUFTO21CQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFHOUIsSUFBSTtrQkFBWixLQUFLO1lBR0csV0FBVztrQkFBbkIsS0FBSztZQUVHLGNBQWM7a0JBQXRCLEtBQUs7WUFHRyxVQUFVO2tCQUFsQixLQUFLO1lBR0csS0FBSztrQkFBYixLQUFLO1lBR0csS0FBSztrQkFBYixLQUFLO1lBR0csUUFBUTtrQkFBaEIsS0FBSztZQUdHLEVBQUU7a0JBQVYsS0FBSztZQUdHLEtBQUs7a0JBQWIsS0FBSztZQUdHLFFBQVE7a0JBQWhCLEtBQUs7WUFHRyxPQUFPO2tCQUFmLEtBQUs7WUFHSSxZQUFZO2tCQUFyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZm9yd2FyZFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZWxlY3QyT3B0aW9uRGF0YSB9IGZyb20gJy4vbmctc2VsZWN0Mi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ3NlbGVjdDInO1xuXG5kZWNsYXJlIHZhciBqUXVlcnk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0MicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1zZWxlY3QyLmNvbXBvbmVudC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3QyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0MkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnc2VsZWN0b3InLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZWxlY3RvcjogRWxlbWVudFJlZjtcblxuICAvLyBkYXRhIGZvciBzZWxlY3QyIGRyb3AgZG93blxuICBASW5wdXQoKSBkYXRhOiBBcnJheTxTZWxlY3QyT3B0aW9uRGF0YT47XG5cbiAgLy8gdmFsdWUgZm9yIHBsYWNlaG9sZGVyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgZHJvcGRvd25QYXJlbnQgPSAnJztcblxuXG4gIEBJbnB1dCgpIGFsbG93Q2xlYXIgPSBmYWxzZTtcblxuICAvLyB2YWx1ZSBmb3Igc2VsZWN0MlxuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLy8gd2lkdGggb2Ygc2VsZWN0MiBpbnB1dFxuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xuXG4gIC8vIGVuYWJsZSAvIGRpc2FibGUgc2VsZWN0MlxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8vIFNwZWNpZnkgdGhlIHNlbGVjdCdzIElEXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBudWxsO1xuXG4gIC8vIFNwZWNpZnkgdGhlIHNlbGVjdCdzIGNsYXNzKGVzKVxuICBASW5wdXQoKSBjbGFzczogc3RyaW5nID0gbnVsbDtcblxuICAvLyBTcGVjaWZ5IHRoZSBzZWxlY3QncyByZXF1aXJlZCBhdHRyaWJ1dGVcbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gPSBudWxsO1xuXG4gIC8vIGFsbCBhZGRpdGlvbmFsIG9wdGlvbnNcbiAgQElucHV0KCkgb3B0aW9uczogT3B0aW9ucztcblxuICAvLyBlbWl0dGVyIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBzdHJpbmdbXT4oKTtcblxuICBwcml2YXRlIGVsZW1lbnQ6IGFueSA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBjaGVjayA9IGZhbHNlO1xuICAvLyBwcml2YXRlIHN0eWxlID0gYENTU2A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgem9uZTogTmdab25lLCBwdWJsaWMgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGlmICh0aGlzLmNzc0ltcG9ydCkge1xuICAgIC8vICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgLy8gICBjb25zdCBsaW5rOiBhbnkgPSBoZWFkLmNoaWxkcmVuW2hlYWQuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG5cbiAgICAvLyAgIGlmICghbGluay52ZXJzaW9uKSB7XG4gICAgLy8gICAgIGNvbnN0IG5ld0xpbmsgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoaGVhZCwgJ3N0eWxlJyk7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICd2ZXJzaW9uJywgJ3NlbGVjdDInKTtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ2lubmVySFRNTCcsIHRoaXMuc3R5bGUpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2RhdGEnXSAmJiBKU09OLnN0cmluZ2lmeShjaGFuZ2VzWydkYXRhJ10ucHJldmlvdXNWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KGNoYW5nZXNbJ2RhdGEnXS5jdXJyZW50VmFsdWUpKSB7XG4gICAgICB0aGlzLmluaXRQbHVnaW4oKTtcblxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQobmV3VmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddICYmIGNoYW5nZXNbJ3ZhbHVlJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcblxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlO1xuXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSAmJiBjaGFuZ2VzWydkaXNhYmxlZCddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5kaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10gJiYgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5lbGVtZW50LmRhdGEoJ3NlbGVjdDInKS4kY29udGFpbmVyLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcGxhY2Vob2xkZXInKS50ZXh0KHRoaXMucGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydkcm9wZG93blBhcmVudCddICYmIGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCAnIycgKyB0aGlzLmRyb3Bkb3duUGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snYWxsb3dDbGVhciddICYmIGNoYW5nZXNbJ2FsbG93Q2xlYXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydhbGxvd0NsZWFyJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWFsbG93LWNsZWFyJywgdGhpcy5hbGxvd0NsZWFyLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBqUXVlcnkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWRyb3Bkb3duUGFyZW50JywgJyMnICsgdGhpcy5kcm9wZG93blBhcmVudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5pbml0UGx1Z2luKCk7XG5cbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5vbignc2VsZWN0MjpzZWxlY3Qgc2VsZWN0Mjp1bnNlbGVjdCBjaGFuZ2UnLCAoZTogYW55KSA9PiB7XG4gICAgICAvLyBjb25zdCBuZXdWYWx1ZTogc3RyaW5nID0gKGUudHlwZSA9PT0gJ3NlbGVjdDI6dW5zZWxlY3QnKSA/ICcnIDogdGhpcy5lbGVtZW50LnZhbCgpO1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmVsZW1lbnQudmFsKCk7XG5cbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQobmV3VmFsdWUpO1xuICAgICAgaWYgKGUudHlwZSAhPT0gJ2NoYW5nZScpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50Lm9mZignc2VsZWN0MjpzZWxlY3QnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHVnaW4oKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQuc2VsZWN0Mikge1xuICAgICAgaWYgKCF0aGlzLmNoZWNrKSB7XG4gICAgICAgIHRoaXMuY2hlY2sgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygnUGxlYXNlIGFkZCBTZWxlY3QyIGxpYnJhcnkgKGpzIGZpbGUpIHRvIHRoZSBwcm9qZWN0LicgK1xuICAgICAgICAgICdZb3UgY2FuIGRvd25sb2FkIGl0IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3NlbGVjdDIvc2VsZWN0Mi90cmVlL21hc3Rlci9kaXN0L2pzLicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgc2VsZWN0MiBhbHJlYWR5IGluaXRpYWxpemVkIHJlbW92ZSBoaW0gYW5kIHJlbW92ZSBhbGwgdGFncyBpbnNpZGVcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0NsYXNzKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJykgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkZXN0cm95Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsICcnKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zOiBPcHRpb25zID0ge1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgd2lkdGg6ICh0aGlzLndpZHRoKSA/IHRoaXMud2lkdGggOiAncmVzb2x2ZScsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlclxuICAgIH07XG5cbiAgICBpZiAodGhpcy5kcm9wZG93blBhcmVudCkge1xuICAgICAgb3B0aW9ucy5kcm9wZG93blBhcmVudCA9IGpRdWVyeSgnIycgKyB0aGlzLmRyb3Bkb3duUGFyZW50KTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy5tYXRjaGVyKSB7XG4gICAgICBqUXVlcnkuZm4uc2VsZWN0Mi5hbWQucmVxdWlyZShbJ3NlbGVjdDIvY29tcGF0L21hdGNoZXInXSwgKG9sZE1hdGNoZXI6IGFueSkgPT4ge1xuICAgICAgICBvcHRpb25zLm1hdGNoZXIgPSBvbGRNYXRjaGVyKG9wdGlvbnMubWF0Y2hlcik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCB0aGlzLmRpc2FibGVkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuXG4gICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcblxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50Lm9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShvcHRpb24sICdzZWxlY3RlZCcsIChuZXdWYWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xuICAgIH1cbiAgICAvLyB9KTtcbiAgfVxuXG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG5cbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByb3BhZ2F0ZUNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pID0+IHsgfTtcblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoKSB7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5kaXNhYmxlZCk7XG4gIH1cbn1cbiIsIjxzZWxlY3QgI3NlbGVjdG9yIFthdHRyLmlkXT1cImlkXCIgW2F0dHIuY2xhc3NdPVwiY2xhc3NcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJvcHRpb24sIG9wdGdyb3VwXCI+XG4gIDwvbmctY29udGVudD5cbjwvc2VsZWN0PlxuIl19