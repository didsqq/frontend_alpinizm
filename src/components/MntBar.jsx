import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../main";

const MntBar = observer(() => {
  const { store } = useContext(Context);
  return (
    <ListGroup>
      {store.mountainStore.mountains.map((mountain) => (
        <ListGroup.Item key={mountain.id}>{mountain.title}</ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default MntBar;
