import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main";
import {Card, Row} from "react-bootstrap";

const CatBar = observer(() => {
    const {store} = useContext(Context)

    return (
        <Row className="d-flex flex-row flex-wrap gap-2">
            {store.categoryStore.categories.map(category =>
                <Card
                    style={{ cursor: 'pointer', width: '150px', textAlign: 'center' }}
                    key={category.ID}
                    className="p-3"
                    onClick={() => store.categoryStore.setSelectedCategory(category)}
                    border={store.categoryStore.selectedCategory?.ID === category.ID ? 'danger' : 'light'}
                >
                    {category.title}
                </Card>
            )}
        </Row> 
    );
});

export default CatBar;