import React, { useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../context";
import { Card, Row } from "react-bootstrap";
import { fetchClimbCategories } from "../http/climbsAPI";

const CatBar = observer(() => {
  const { store } = useContext(Context);

  const clearFilters = () => {
    store.categoryStore.setSelectedCategory(null);
    store.mountainStore.setSelectedMountain(null);
  };

  useEffect(() => {
    fetchClimbCategories().then(data => {
      store.categoryStore.setCategories(data)
    })
  }, [])

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <h2 className="text-lg font-semibold">Фильтры</h2>
        <button
          onClick={clearFilters}
          className="border-none ml-auto inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-[#778DA9] hover:bg-[#778DA9]/90 transition-colors shadow-sm hover:shadow-md"
        >
          Очистить фильтры
        </button>
      </div>

      <Row className="d-flex flex-row flex-wrap gap-2 mt-4">
      <div className="flex flex-wrap gap-2">
        {store.categoryStore.categories.map((category) => (
          <button
          key={category.ID}
          className={`text-[#0D1B2A] border-none  px-3 py-1 rounded-full text-sm transition-colors ${
            store.categoryStore.selectedCategories.includes(category.ID)
              ? "bg-[#778DA9] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => store.categoryStore.setSelectedCategory(category)}
        >
          {category.Title}
        </button>
        ))}
        </div>
      </Row>
    </div>
  );
});

export default CatBar;
