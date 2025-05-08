import React, {useContext, useEffect} from 'react';
import { Col, Container, Row } from "react-bootstrap";
import MntBar from "../components/MntBar";
import CatBar from "../components/CatBar";
import ClimbList from "../components/ClimbList";
import { observer } from "mobx-react-lite";
import {Context} from "../main";
import { fetchMountains, fetchClimbs } from '../http/climbsAPI';
import FluidArtExperience from "../components/halftone-waves"

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
    <div className="position-relative min-vh-100">
      <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}>
        <FluidArtExperience />
      </div>
      <Container>
        <Row className="mt-2">
          <Col md={3}>
            <MntBar />
          </Col>
          <Col md={9}>
            <CatBar/>
            <ClimbList/>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default Home;