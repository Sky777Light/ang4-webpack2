import {ObjectCustomType} from "../services/app.service";

export class Events {

    public events: ObjectCustomType = {};

    constructor( ) { }

    on(args, callback) {
        args.split(",").forEach((name) => {
            name = name.trim();

            if (this.events[name]) {
                this.events[name].push(callback);
            } else {
                this.events[name] = [callback];
            }
        });
    }

    emit(args, ...params) {
        args.split(",").forEach((name) => {
            name = name.trim();

            if (this.events[name]) {
                this.events[name].forEach((event) => {
                    event(...params);
                });
            }
        });
    }
}
