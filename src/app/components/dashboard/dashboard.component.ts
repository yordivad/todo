import {Component, OnInit} from '@angular/core';
import { Task } from '../../models/task';
import { TaskService, ContextService } from '../../services';


@Component({
    selector:"tasks",
    templateUrl: "./daskboard.component.pug",
    styleUrls:[ "./dashboard.component.less"]
})
export class DashboardComponent implements OnInit{

    public completed : Array<Task>;

    public noncompleted : Array<any>;

    constructor(private service: TaskService, private context: ContextService){

    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.service.getAll().then(result=> {
            this.completed = result.filter(c=> c.status === "completed");
            this.noncompleted = result.filter( c=> c.status !== "completed");
        });
    }



    dropped(model:Task) {
        model.status = "completed";
        this.service.save(model).then((result)=> {
            if(result) {
                this.load();
            }
        });
    }

    newone() {
        var task = {
            author : this.context.user,
            title: "",
            description: "",
            status: "new"
        };

        this.noncompleted.splice(0,0, task);
    }

    edit(model:Task){
        if(model.status === "new"){
            model.status = "notCompleted";
        }

        this.service.save(model).then((result)=> {
            if(result) {
                this.load();
            }
        });
    }

    remove( model: Task) {
        this.service.delete(model).then((result)=> {
            if(result) {
                this.load();
            }
        });
    }


}