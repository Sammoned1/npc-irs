import { makeAutoObservable } from "mobx";

export default class DataContext {
  constructor() {
    this._users = {};
    this._tasks = {};
    makeAutoObservable(this);
  }

  setUsers(users) {
    this._users = users;
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  get users() {
    return this._users;
  }

  get tasks() {
    return this._tasks;
  }
}
