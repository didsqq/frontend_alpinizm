import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main";
import {Card, Row} from "react-bootstrap";

const CatBar = observer(() => {
    const {store} = useContext(Context)

    return (
        <Row className="d-flex">
            {store.categoryStore.categories.map(category =>
                <Card
                    style={{cursor:'pointer'}}
                    key={category.id}
                    className="p-3"
                    // onClick={() => device.setSelectedBrand(brand)}
                    // border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {category.title}
                </Card>
            )}
        </Row>
    );
});

export default CatBar;