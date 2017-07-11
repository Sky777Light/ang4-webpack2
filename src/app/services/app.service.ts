import { Injectable } from '@angular/core';

export type ObjectCustomType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: ObjectCustomType = { };

  public get state() {
    return this._state = this._clone(this._state);
  }

  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    return this._state[prop] = value;
  }

  private _clone(object: ObjectCustomType) {
    return JSON.parse(JSON.stringify( object ));
  }
}
