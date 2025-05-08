import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../context";
import { Card, Row } from "react-bootstrap";

// Трудности (difficulties)
const difficulties = [
  { id: "1", name: "Beginner" },
  { id: "2", name: "Intermediate" },
  { id: "3", name: "Advanced" },
  { id: "4", name: "Expert" },
];

const CatBar = observer(() => {
  const { store } = useContext(Context);

  const toggleDifficulty = (difficultyId) => {
    if (store.categoryStore.selectedCategories.includes(difficultyId)) {
      store.categoryStore.setSelectedCategories(
        store.categoryStore.selectedCategories.filter((id) => id !== difficultyId)
      );
    } else {
      store.categoryStore.setSelectedCategories([
        ...store.categoryStore.selectedCategories,
        difficultyId,
      ]);
    }
  };

  const clearFilters = () => {
    store.categoryStore.setSelectedCategory(null);
    store.mountainStore.setSelectedMountain(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="border-none ml-auto inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
        >
          Clear Filters
        </button>
      </div>

      <Row className="d-flex flex-row flex-wrap gap-2 mt-4">
        {store.categoryStore.categories.map((category) => (
          <Card
            key={category.ID}
            className="p-3"
            style={{ cursor: 'pointer', width: '150px', textAlign: 'center' }}
            onClick={() => store.categoryStore.setSelectedCategory(category)}
            border={store.categoryStore.selectedCategory?.ID === category.ID ? 'danger' : 'light'}
          >
            <span className="text-gray-800">{category.name}</span>
          </Card>
        ))}
      </Row>
    </div>
  );
});

export default CatBar;
