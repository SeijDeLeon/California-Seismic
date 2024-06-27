import { sections as chapter1 } from '../../../assets/data/ASCE7/CH1/sections.js';
import { sections as chapter2 } from '../../../assets/data/ASCE7/CH2/sections.js';
import { sections as chapter10 } from '../../../assets/data/ASCE7/CH10/sections.js';
import { sections as chapter12 } from '../../../assets/data/ASCE7/CH12/sections.js';
import { sections as chapter13 } from '../../../assets/data/ASCE7/CH13/sections.js';
import { sections as chapter20 } from '../../../assets/data/ASCE7/CH20/sections.js';

const chapters = {
    1: chapter1,
    2: chapter2,
    10: chapter10,
    12: chapter12,
    13: chapter13,
    20: chapter20,
  };

export default function Viewer({ section }) {
    let images = [];
    let title = "Section was not found.";

    const currentChapterNumber = section.split('.')[0];
    const currentChapter = chapters[currentChapterNumber];

    if (currentChapter) {
        const dotCount = section.split('.').length - 1;
        if (dotCount === 1) {
            const sectionData = currentChapter[section];
            if (sectionData) {
                images = sectionData.imgs.map(img => `${process.env.PUBLIC_URL}/ASCE7/CH${currentChapterNumber}/${img}`);
                title = sectionData.title;
            }
        }
        else {
            const [part1, part2] = section.split('.');
            const subsection = currentChapter[`${part1}.${part2}`]?.subsections?.[section];
            if (subsection) {
                images = subsection.imgs.map(img => `${process.env.PUBLIC_URL}/ASCE7/CH${currentChapterNumber}/${img}`);
                title = subsection.title;
            }
        }
    }
    return(
        <div>
            <h1 className="text-lg">{title}</h1>
            <div className="mt-5 h-96 overflow-y-auto">
                {images.map((image, index) => (
                    <img key={index} className="w-4/5 mx-auto" src={image} alt={`Image ${index + 1}`} />
                ))}
            </div>
        </div>
    )
}