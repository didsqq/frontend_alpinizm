import { makeAutoObservable } from "mobx";

export default class GroupStore {
  constructor() {
    this._groups = [
      { id: 1, name: "Альпинисты 2024" },
      { id: 2, name: "Группа новичков" },
    ];
    makeAutoObservable(this);
  }

  setGroups(groups) {
    this._groups = groups;
  }

  get groups() {
    return this._groups;
  }
}
