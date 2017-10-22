
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../models'


@Component({
    selector: 'task',
    templateUrl: 'task.component.pug',
    styleUrls: [ 'task.component.less']
})
export class TaskComponent {

    private _task : Task;

    private _isEditing :boolean;


    @Output()
    private deleted: EventEmitter<Task> = new EventEmitter();

    @Output()
    private edited: EventEmitter<Task> = new EventEmitter();

    get task(): Task {
        return this._task;
    }

    @Input()
    set task(value: Task) {
        this._task = value;
    }


    get title() {
       return this._task.title;
    }

    set title(value: string) {
        this._task.title = value;
    }

    set description(value: string) {
        this._task.description = value;
    }

    get description(){
        return this._task.description;
    }

    get author() {
        return this._task.author;
    }

    editing(e: any) {
        this.isEditing = false;
        this.edited.emit(this.task);
        e.stopPropagation();
    }

    edit(e: any) {
        this.isEditing = true;
        e.stopPropagation();
    }

    remove(e: any) {
        this.deleted.emit(this.task);
        e.stopPropagation();
    }

    set isEditing(value: boolean) {
        this._isEditing = value;
    }

    get isEditing(): boolean {
        return this._isEditing || this.task.status === "new";
    }

}