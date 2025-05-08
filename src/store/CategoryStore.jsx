import { makeAutoObservable } from "mobx";

export default class CategoryStore {
  constructor() {
    this._categories = [
      { ID: 1, name: "Beginner" },
      { ID: 2, name: "Intermediate" },
      { ID: 3, name: "Advanced" },
      { ID: 4, name: "Expert" },
    ];
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
    console.log("selected category", this._selectedCategory)
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
