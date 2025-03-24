import { makeAutoObservable } from "mobx";

export default class ClimbsStore {
  constructor() {
    this._climbs = [
      {
        id: 1, // ID_mountain_climbs
        title: "Восхождение на гору эверест",
        groupId: 1, // ID_groups
        mountainId: 2, // ID_mountain (Эверест)
        categoryId: 3, // ID_category (Hard)
        startDate: "2025-06-01", // Start_date_
        endDate: "2025-06-15", // End_date_
        total: "успешно", // Total, например, 15 человек
      },
      {
        id: 2,
        title: "Восхождение на гору килиманджаро",
        groupId: 2,
        mountainId: 1, // Килиманджаро
        categoryId: 1, // Easy
        startDate: "2025-07-10",
        endDate: "2025-07-20",
        total: "успешно",
      },
    ];
    makeAutoObservable(this);
  }

  setClimbs(climbs) {
    this._climbs = climbs;
  }

  get climbs() {
    return this._climbs;
  }
}
