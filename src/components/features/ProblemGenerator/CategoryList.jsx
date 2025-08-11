import { useState } from "react";
import fundamentalPeriodIcon from "./categoryIcons/fundamentalPeriod.png";
import nonstructuralComponentIcon from "./categoryIcons/nonstructuralComponent.png";
import baseShearIcon from "./categoryIcons/baseShear.png";
import randomIcon from "./categoryIcons/random.png";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const CategoryList = ({ category, setCategory, resetTimer }) => {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const categories = [
    { title: "Fundamental Period", icon: fundamentalPeriodIcon },
    { title: "Nonstructural Component", icon: nonstructuralComponentIcon },
    { title: "Base Shear", icon: baseShearIcon },
    { title: "Random", icon: randomIcon },
  ];
  const handleCategoryChange = (title) => {
    setCategory(title);
    resetTimer();
  }

  return (
    <section className="text-sm">
      <button
        className="flex items-center text-sky-800 mb-1"
        onClick={() => setCategoryOpen(!categoryOpen)}
      >
        <ChevronDownIcon className="h-4 w-4" aria-hidden />
        Category: {category}
      </button>

      {categoryOpen &&
        <ul className="flex flex-wrap text-gray-500 mb-5">
          {categories.map(({ title, icon }) => (
            <li key={title}>
              <button
                className={`flex items-center gap-2 p-2 pr-5 rounded ${category === title ? " bg-yellow-50 text-yellow-700 font-semibold" : ""}`}
                onClick={() => handleCategoryChange(title)}
              >
                <img src={icon} alt={title} className="size-8" />
                {title}
              </button>
            </li>
          ))}
        </ul>
      }
    </section>
  )
}

export default CategoryList;