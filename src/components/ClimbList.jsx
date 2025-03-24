import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main";
import {Row} from "react-bootstrap";
import ClimbItem from "./ClimbItem";

const ClimbList = observer(() => {
    const {store} = useContext(Context)

    return (
        <Row className="d-flex">
            {store.climbsStore.climbs.map(climb =>
                <ClimbItem key={climb.id} climb={climb}/>
            )}
        </Row>
    );
});

export default ClimbList;