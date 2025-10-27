import ListGroup from "@/components/ListGroup";
import MyButton from "./components/Button";
import { useState } from "react";
import Alert from "@/components/Alert";

function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London"];
  const [showAlert, setShowAlert] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <MyButton buttonType="btn-primary" onClick={handleClick}>
        Hallo
      </MyButton>
      {showAlert && (
        <Alert
          text="This is an alert!"
          type="primary"
          onClose={handleClose}
        ></Alert>
      )}
    </>
  );
}

export default App;
