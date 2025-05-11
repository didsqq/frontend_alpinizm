import React from 'react';
import { useNavigate } from "react-router-dom";
import { CLIMB_ROUTE } from "../utils/consts";
import { Clock, ArrowUpDown, Thermometer, Star } from "lucide-react";

const ClimbItem = ({ climb }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(CLIMB_ROUTE + '/' + climb.ID)}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer"
    >
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
        <div className="h-40 overflow-hidden">
          <img
            src={climb.PhotoUrl || "https://via.placeholder.com/150"}
            alt={climb.Title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{climb.Title}</h3>

          <div className="text-sm text-gray-600 mb-2">
            День отправления: {new Date(climb.StartDate).toLocaleDateString()}
          </div>

          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{climb.Rating || "Нет оценки"}</span>
            <span className="mx-2 text-gray-300">|</span>
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{climb.Duration || "Не указано"}</span>
          </div>

          <div className="flex items-center mb-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600 mr-3">{climb.Distance || "Неизвестно"}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {climb.Types?.map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
            {climb.Difficulty && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                {climb.Difficulty.charAt(0).toUpperCase() + climb.Difficulty.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimbItem;
