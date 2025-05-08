import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {CLIMB_ROUTE} from "../utils/consts";
import { useNavigate } from "react-router-dom";

const ClimbItem = ({climb}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(CLIMB_ROUTE + '/' + climb.ID)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image 
                    width={200} 
                    height={200} 
                    src={climb.PhotoUrl || 'https://via.placeholder.com/150'} 
                    alt={climb.Title}
                    style={{objectFit: 'cover'}}
                />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div>{climb.Title}</div>
                    </div>
                </div>
                <div>Дата начала восхождения: {new Date(climb.StartDate).toLocaleDateString()}</div>
            </Card>
        </Col>
    );
};

export default ClimbItem;