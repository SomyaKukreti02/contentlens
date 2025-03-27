import { useState } from "react";
import { CATEGORIES } from "@/constants";

const CategoryList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("Categories");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category === "Categories" ? null : category);
  };

  return (
    <div className="dropdown dropdown-start relative">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedCategory}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm absolute z-50 mt-2"
      >
        {CATEGORIES.map((category) => (
          <li key={category}>
            <a onClick={() => handleCategoryChange(category)}>{category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
