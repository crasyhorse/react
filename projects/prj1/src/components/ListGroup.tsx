import { useState } from "react";

type PropData = {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: PropData) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const noDataFound = () => {
    return items.length === 0 && <p>No data found!</p>;
  };

  return (
    <>
      <h1>{heading}</h1>
      {noDataFound()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
