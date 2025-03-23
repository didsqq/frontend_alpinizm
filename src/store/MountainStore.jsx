import { makeAutoObservable } from "mobx";

export default class MountainStore {
  constructor() {
    this._mountains = [
      {
        id: 1,
        title: "Киллиманджаро",
        height: "5432",
        mountain_range: "такой вот хребет",
      },
      {
        id: 2,
        title: "Эверест",
        height: "6231",
        mountain_range: "такой вот хребет",
      },
    ];
    makeAutoObservable(this);
  }

  setMountains(mountains) {
    this._mountains = mountains;
  }

  get mountains() {
    return this._mountains;
  }
}
