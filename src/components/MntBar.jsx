import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../context";
import { ChevronDown, ChevronUp, Mountain } from "lucide-react";

const MntBar = observer(() => {
  const { store } = useContext(Context);
  const mountains = store.mountainStore.mountains || [];
  const selectedMountain = store.mountainStore.selectedMountain;

  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMountains = mountains.filter(
    (mountain) =>
      mountain.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mountain.Region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold flex items-center">
      <Mountain className="mr-2 h-5 w-5 text-blue-600" />
      Горные вершины
    </h2>
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white focus:outline-none border-none"
    >
      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  </div>

  {isExpanded && (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск гор..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-1">
        {filteredMountains.length > 0 ? (
          <ul className="space-y-2 pl-0">
            {filteredMountains.map((mountain) => (
              <li key={mountain.ID}>
              <button
                className={`w-full text-left p-2 rounded-md transition-colors bg-white hover:bg-gray-100 focus:outline-none border-none ${
                  selectedMountain?.ID === mountain.ID
                    ? "bg-blue-100 text-blue-700"
                    : ""
                }`}
                onClick={() =>
                  store.mountainStore.setSelectedMountain(
                    selectedMountain?.ID === mountain.ID ? null : mountain
                  )
                }
              >
                  <div className="font-medium">{mountain.Title}</div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <span>{mountain.MountainRange ?? "Регион неизвестен"}</span>
                    <span>{mountain.Height ? `${mountain.Height} м` : ""}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">Горы не найдены</p>
        )}
      </div>
    </>
  )}
</div>


  );
});

export default MntBar;
