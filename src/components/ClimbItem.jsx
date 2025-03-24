import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {CLIMB_ROUTE} from "../utils/consts";
import { useNavigate } from "react-router-dom";

const ClimbItem = ({climb}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(CLIMB_ROUTE + '/' + climb.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} /*src={process.env.REACT_APP_API_URL + climb.img}*//>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        {/* <div>{climb.rating}</div> */}
                    </div>
                </div>
                <div>{climb.title}</div>
            </Card>
        </Col>
    );
};

export default ClimbItem;