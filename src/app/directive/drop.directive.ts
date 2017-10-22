import {Directive, Output, OnInit,EventEmitter, ElementRef} from '@angular/core';

@Directive({
    selector: '[drop]'
})
export class DropDirective implements OnInit{

    @Output()
    private dropped: EventEmitter<any> = new EventEmitter();

    constructor(private _elementRef: ElementRef) {
    }

    ngOnInit() {

        let el = this._elementRef.nativeElement;

        el.addEventListener('dragenter', () => {
            el.classList.add('over');
        });

        el.addEventListener('dragleave', () => {
            el.classList.remove('over');
        });

        el.addEventListener('dragover', (e:any) => {
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            return false;
        });


        el.addEventListener('drop', (e:any) => {
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            el.classList.remove('over');
            let data = JSON.parse(e.dataTransfer.getData('text'));
            this.dropped.emit(data);
            return false;
        })


    }
}
