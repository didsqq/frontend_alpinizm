import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import { Context } from "../context";
import {Row} from "react-bootstrap";
import ClimbItem from "./ClimbItem";
import { Star, Users } from "lucide-react";

const ClimbList = observer(() => {
    const {store} = useContext(Context);
    const [sortBy, setSortBy] = useState("rating");

    // Получаем данные из store
    const climbs = store.climbsStore.climbs;
    const selectedMountain = store.mountainStore.selectedMountain;
    const selectedCategory = store.categoryStore.selectedCategory;

    // console.log('Climbs:', climbs);
    // console.log('Selected Mountain:', selectedMountain);
    // console.log('Selected Category:', selectedCategory);

    // // Фильтруем маршруты
    // const filteredClimbs = climbs.filter((climb) => {
    //     // Проверяем наличие всех необходимых полей
    //     if (!climb) return false;

    //     // Фильтр по горе
    //     if (selectedMountain) {
    //         const climbMountainId = climb.MountainID || climb.mountainId || climb.mountain_id;
    //         if (climbMountainId !== selectedMountain.ID) {
    //             return false;
    //         }
    //     }

    //     // Фильтр по категории
    //     if (selectedCategory) {
    //         const climbCategoryId = climb.CategoryID || climb.categoryId || climb.category_id;
    //         if (climbCategoryId !== selectedCategory.ID) {
    //             return false;
    //         }
    //     }

    //     return true;
    // });

    // Сортируем маршруты
    const sortedClimbs = [...climbs].sort((a, b) => {
        if (sortBy === "rating") {
            return (b.Rating || b.rating || 0) - (a.Rating || a.rating || 0);
        } else {
            return (b.Popularity || b.popularity || 0) - (a.Popularity || a.popularity || 0);
        }
    });

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Маршруты восхождений</h2>
            </div>

            {sortedClimbs.length > 0 ? (
                <Row className="d-flex">
                    {sortedClimbs.map(climb => (
                        <ClimbItem key={climb.ID || climb.id} climb={climb}/>
                    ))}
                </Row>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">Нет маршрутов, соответствующих вашим фильтрам</p>
                </div>
            )}
        </div>
    );
});

export default ClimbList;