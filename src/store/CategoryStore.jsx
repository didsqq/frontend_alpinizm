import { makeAutoObservable } from "mobx";

export default class CategoryStore {
  constructor() {
    this._categories = [];
    this._selectedCategory = null;
    this._selectedCategories = [];
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
    if (category) {
      if (this._selectedCategories.includes(category.ID)) {
        this._selectedCategories = [];
      } else {
        this._selectedCategories = [category.ID];
      }
    } else {
      this._selectedCategories = [];
    }
    console.log("selected categories", this._selectedCategories);
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  setSelectedCategories(categories) {
    this._selectedCategories = categories;
  }

  get selectedCategories() {
    return this._selectedCategories;
  }
}
