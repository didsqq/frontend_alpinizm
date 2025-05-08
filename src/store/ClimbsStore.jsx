import { makeAutoObservable } from "mobx";

export default class ClimbsStore {
  constructor() {
    this._climbs = [];
    this._selectedCategory = null;
    this._selectedMountain = null;
    this._page = 1;
    this._totalCount = 0;
    makeAutoObservable(this);
  }

  setClimbs(climbs) {
    this._climbs = climbs;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  setSelectedCategory(category) {
    this._selectedCategory = category;
  }

  setPage(page) {
    this._page = page;
  }

  setSelectedMountain(mountain) {
    this._selectedMountain = mountain;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  get climbs() {
    return this._climbs;
  }

  get totalCount() {
    return this._totalCount;
  }
}
