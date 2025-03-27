import { useState } from "react";
import { CATEGORIES } from "@/constants";

const CategoryList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("Categories");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category === "Categories" ? null : category);
  };

  return (
    <div className="dropdown dropdown-end relative">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedCategory}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm absolute z-50 mt-2"
      >
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button onClick={() => handleCategoryChange(category)}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
