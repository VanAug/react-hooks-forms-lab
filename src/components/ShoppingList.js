import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [itemList, setItemList] = useState(items);
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = itemList.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const searchItems = itemsToDisplay.filter((item) => 
    item.name.toLowerCase().includes(search.toLowerCase())  
  )

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleItemFormSubmit = (newItem) => {
    setItemList([...itemList, newItem])
  }
  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit}/>
      <Filter 
        onCategoryChange={handleCategoryChange} 
        search={search} 
        onSearchChange={handleSearch}
      />
      <ul className="Items">
        {searchItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

