import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class Title {

  public value = 'Angular 2';

  constructor(
    public http: Http
  ) {}

  public getData() {
    return this.http.get('/assets/data.json').map((res: Response) => {
      res = res.json();
      console.log(res);
    });
  }

}
