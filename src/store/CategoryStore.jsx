import { makeAutoObservable } from "mobx";

export default class CategoryStore {
  constructor() {
    this._categories = [
      { id: 1, title: "Eazy" },
      { id: 2, title: "Medium" },
      { id: 3, title: "Hard" },
    ];
    makeAutoObservable(this);
  }

  setCategories(categories) {
    this._categories = categories;
  }

  get categories() {
    return this._categories;
  }
}
