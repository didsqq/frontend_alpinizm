import { makeAutoObservable } from "mobx";
import CategoryStore from "./CategoryStore";
import ClimbsStore from "./ClimbsStore";
import GroupStore from "./GroupStore";
import MountainStore from "./MountainStore";

export default class MainStore {
  constructor() {
    makeAutoObservable(this);
    this._categoryStore = new CategoryStore();
    this._mountainStore = new MountainStore();
    this._groupStore = new GroupStore();
    this._climbsStore = new ClimbsStore();
  }

  get categoryStore() {
    return this._categoryStore;
  }

  get mountainStore() {
    return this._mountainStore;
  }

  get groupStore() {
    return this._groupStore;
  }

  get climbsStore() {
    return this._climbsStore;
  }
}
