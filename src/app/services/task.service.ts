import {Injectable} from '@angular/core';
import {Task} from "../models"
import { Http, RequestOptionsArgs } from '@angular/http';
import {environment} from '../enviroment';
import {ContextService} from './context.service';


@Injectable()
export  class TaskService {


    constructor(private http: Http, private  context: ContextService) {
    }

    getAll(): Promise<Array<Task>> {
        return new Promise(resolve =>{
            this.http.get(environment.apiUrl + "/todos?sessionId=" + this.context.user.sessionId)
                .subscribe(result=> {
                    var response = result.json();
                    if(response.status==="success") {
                       let collection = [];
                        for(let item of response.data){
                            item["id"] = item["_id"];
                            collection.push(item);
                        }
                        resolve(collection);
                    }
                }
            );
        });
    }

    save(task:Task): Promise<boolean> {
        return new Promise(resolve => {
           this.http.put(environment.apiUrl + "/todo?sessionId=" + this.context.user.sessionId, task)
               .subscribe(response => {
                  var data  = response.json();
                   resolve(data.status === "success");
               });
        });
    }

    delete(task:Task): Promise<boolean> {
        return new Promise(resolve => {

            let url = environment.apiUrl + "/todo?sessionId=" + this.context.user.sessionId;
            let options ={
                body:  task,
                method: "delete"
            };
            this.http.request(url,options)
                .subscribe(response=> {
                    var data = response.json();
                    resolve(data.status === "success");
                });

        });
    }

}