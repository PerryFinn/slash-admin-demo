/**
 * 此文件为示例文件，用于演示 MobX 的使用方式，不作为业务代码使用
 */

import { makeAutoObservable } from "mobx";

export class DemoStore {
  name: string = "";

  age: number = 0;

  constructor() {
    makeAutoObservable(
      this,
      {
        name: false, // 对于 name 字段不让 MobX 处理
        setName: false,
      },
      { autoBind: true },
    );
  }

  setName(value: string) {
    this.name = value;
  }

  setAge(value: number) {
    this.age = value;
  }
}

export const demoStore = new DemoStore();
