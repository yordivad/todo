
import {Directive, Input, OnInit, ElementRef} from '@angular/core';

@Directive({
    selector: '[drag]'
})
export class DragDirective implements OnInit{

    @Input('drag')
    private data: any;

    constructor(private _elementRef: ElementRef) {}

    ngOnInit() {

        let el = this._elementRef.nativeElement.querySelector("*");
        el.draggable = "true";
        el.addEventListener("dragstart", (e:any) => {
            el.classList.add("drag-src");
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text', JSON.stringify(this.data));
        });

        el.addEventListener("dragend", (e:any) => {
            el.classList.remove("drag-src");
        });
    }
}
