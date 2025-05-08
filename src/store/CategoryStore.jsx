import { makeAutoObservable } from "mobx";

export default class CategoryStore {
  constructor() {
    this._categories = [
      { ID: 1, title: "Easy" },
      { ID: 2, title: "Medium" },
      { ID: 3, title: "Hard" },
    ];
    this._selectedCategory = null;
    makeAutoObservable(this);
  }

  setCategories(categories) {
    this._categories = categories;
  }

  get categories() {
    return this._categories;
  }

  setSelectedCategory(category) {
    this._selectedCategory = category;
    console.log("selected category", this._selectedCategory)
  }

  get selectedCategory() {
    return this._selectedCategory;
  }
}
