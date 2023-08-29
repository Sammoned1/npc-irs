import { makeAutoObservable } from "mobx";

export default class DataContext {
  constructor() {
    this._users = [];
    this._tasks = [];
    this._unassignedTasks = [];
    makeAutoObservable(this);
  }

  setUsers(users) {
    this._users = users;
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  setUnassignedTasks(unassignedTasks) {
    this._unassignedTasks = unassignedTasks;
  }

  get users() {
    return this._users;
  }

  get tasks() {
    return this._tasks;
  }

  get unassignedTasks() {
    return this._unassignedTasks;
  }
}
