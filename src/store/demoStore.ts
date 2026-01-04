/**
 * 此文件为示例文件，用于演示 MobX 的使用方式，不作为业务代码使用
 */

import { action, makeObservable, observable } from "mobx";

export class DemoStore {
  @observable
  name: string = "";
  @observable
  age: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  setName(value: string) {
    this.name = value;
  }

  @action
  setAge(value: number) {
    this.age = value;
  }
}

export const demoStore = new DemoStore();
