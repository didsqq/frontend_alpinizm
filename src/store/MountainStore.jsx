import { makeAutoObservable } from "mobx";

export default class MountainStore {

  constructor() {
    this._mountains = [];
    this._selectedMountain = null;
    this._page = 1;
    makeAutoObservable(this);
  }

  setMountains(mountains) {
    this.setPage(1)
    this._mountains = mountains;
  }
  
  setPage(page) {
    this._page = page
  }

  setSelectedMountain(mountain) {
    this._selectedMountain = mountain;
  }
  
  get mountains() {
    return this._mountains;
  }
  
  get selectedMountain() {
    return this._selectedMountain;
  }

  getMountainById(id) {
    return this._mountains.find(mountain => mountain.Id === id);
  }
}