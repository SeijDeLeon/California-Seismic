import { sections as chapter1 } from '../../../assets/data/ASCE7/CH1/sections.js';
import { sections as chapter2 } from '../../../assets/data/ASCE7/CH2/sections.js';
import { sections as chapter10 } from '../../../assets/data/ASCE7/CH10/sections.js';
import { sections as chapter13 } from '../../../assets/data/ASCE7/CH13/sections.js';
import { sections as chapter20 } from '../../../assets/data/ASCE7/CH20/sections.js';

export default function Viewer({ section }) {
    const images = chapter13['13.2'].subsections[section].imgs.map(img => `${process.env.PUBLIC_URL}/ASCE7/CH13/${img}`);
    return(
        <div>
            <h1 className="text-lg">{chapter13['13.2'].subsections[section].title}</h1>
            <div className="mt-5 max-h-96 overflow-y-auto">
                {images.map((image, index) => (
                    <img className="w-4/5 mx-auto" src={image} alt={`Image ${index + 1}`} />
                ))}
            </div>
        </div>
    )
}