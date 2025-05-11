import React, {useContext, useEffect} from 'react';
import CatBar from "../components/CatBar";
import MntBar from "../components/MntBar";
import ClimbList from "../components/ClimbList";
import { observer } from "mobx-react-lite";
import {Context} from "../context";
import { fetchMountains, fetchClimbs } from '../http/climbsAPI';

const Home = observer(() => {
  const {store} = useContext(Context)
  
  useEffect(() => {
    fetchMountains().then(data => store.mountainStore.setMountains(data))
  }, [])

  useEffect(() => {
    const mountainId = store.mountainStore.selectedMountain?.ID
    const categoryId = store.categoryStore.selectedCategory?.ID
    
    fetchClimbs(mountainId, categoryId).then(data => {
      store.climbsStore.setClimbs(data)
    })
  }, [store.mountainStore.selectedMountain, store.categoryStore.selectedCategory])

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row mt-2 gap-4">
        <div className="w-full md:w-1/4">
          <MntBar/>
        </div>
        <div className="w-full md:w-3/4">
          <CatBar />
          <ClimbList />
        </div>
      </div>
    </div>
  );
});

export default Home;