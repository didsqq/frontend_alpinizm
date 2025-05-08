import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../main";
import Col from "react-bootstrap/Col";

const MntBar = observer(() => {
  const { store } = useContext(Context);
  
  if (!store.mountainStore.mountains || store.mountainStore.mountains.length === 0) {
    return <div>Нет доступных гор</div>;
  }

  return (
    <ListGroup>
      {store.mountainStore.mountains.map((mountain) => (
        <ListGroup.Item 
          style={{cursor: 'pointer'}}
          key={mountain.ID}
          onClick={() => store.mountainStore.setSelectedMountain(mountain)}
          active={mountain.ID === store.mountainStore.selectedMountain?.ID}
        >
          {mountain.Title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default MntBar;