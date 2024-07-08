import { sections as chapter1 } from "../../../assets/data/ASCE7/CH1/sections.js";
import { sections as chapter2 } from "../../../assets/data/ASCE7/CH2/sections.js";
import { sections as chapter10 } from "../../../assets/data/ASCE7/CH10/sections.js";
import { sections as chapter11 } from "../../../assets/data/ASCE7/CH11/sections.js";
import { sections as chapter12 } from "../../../assets/data/ASCE7/CH12/sections.js";
import { sections as chapter13 } from "../../../assets/data/ASCE7/CH13/sections.js";
import { sections as chapter20 } from "../../../assets/data/ASCE7/CH20/sections.js";

const chapters = {
  1: chapter1,
  2: chapter2,
  10: chapter10,
  11: chapter11,
  12: chapter12,
  13: chapter13,
  20: chapter20,
};

export default function Viewer({ section }) {
  let images = [];
  let title = "Section was not found.";

  const isPicture = section.includes("figure") || section.includes("table");
  if (isPicture) {
    const parts = section.split(/figure|table/);
    const subParts = parts[1].split("-");
    const pictureCurrentChapterNumber = subParts[0].split(".")[0];
    const pictureCurrentChapter = chapters[pictureCurrentChapterNumber];
    if (pictureCurrentChapter) {
      const subsection =
        pictureCurrentChapter[subParts[0]]?.subsections?.[section];
      if (subsection) {
        images = subsection.imgs.map(
          (img) =>
            `${process.env.PUBLIC_URL}/ASCE7/CH${pictureCurrentChapterNumber}/${img}`
        );
        title = subsection.title;
      }
    }
  } else {
    const currentChapterNumber = section.split(".")[0];
    const currentChapter = chapters[currentChapterNumber];

    if (currentChapter) {
      const dotCount = section.split(".").length - 1;
      if (dotCount === 1) {
        const sectionData = currentChapter[section];
        if (sectionData) {
          images = sectionData.imgs.map(
            (img) =>
              `${process.env.PUBLIC_URL}/ASCE7/CH${currentChapterNumber}/${img}`
          );
          title = sectionData.title;
        }
      } else {
        const [part1, part2] = section.split(".");
        const subsection =
          currentChapter[`${part1}.${part2}`]?.subsections?.[section];
        if (subsection) {
          images = subsection.imgs.map(
            (img) =>
              `${process.env.PUBLIC_URL}/ASCE7/CH${currentChapterNumber}/${img}`
          );
          title = subsection.title;
        }
      }
    }
  }
  return (
    <div>
      <h1 className="text-lg">{title}</h1>
      <div className="mt-5 max-h-[70vh] overflow-y-auto">
        {images.map((image, index) => {
          const imageName = image.split("/").pop();
          return (
            <img
              key={index}
              className="w-7/8 mb-5 mx-auto"
              src={image}
              alt={imageName}
            />
          );
        })}
      </div>
    </div>
  );
}
