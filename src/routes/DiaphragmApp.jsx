import DiaphragmViewer from "../components/features/DiaphragmApp/DiaphragmViewer.jsx";
import Output from "../components/features/DiaphragmAnalysis/Output.jsx";
import DiaphragmInput from '../components/features/DiaphragmApp/DiaphragmInput';
import { useDiaphragm } from "../components/features/DiaphragmApp/useDiaphragm.jsx";

export default function DiaphragmApp() {
  const {
    inputs,
    handleDeleteWall,
    handleAddWall,
    handleAddWallOpening,
    handleEditInputs,
    validateInputState,
    solution,
    setSolution,
  } = useDiaphragm();

  return (
    <>
      {/* Input */}
      {/* Output */}
      <div className="w-full flex">
        <div className="w-1/2 border border-sky-500 flex flex-col">
          <DiaphragmInput
            inputs={inputs}
            handleEditInputs={handleEditInputs}
            handleDeleteWall={handleDeleteWall}
            handleAddWall={handleAddWall}
            handleAddWallOpening={handleAddWallOpening}
          />
          <Output
            inputs={inputs}
            solution={solution}
            setSolution={setSolution}
          />
        </div>
        <div className="w-1/2 border border-sky-500">
          <DiaphragmViewer
            inputs={inputs}
            solution={solution}
            handleAddWall={handleAddWall}
            handleAddWallOpening={handleAddWallOpening}
            handleDeleteWall={handleDeleteWall}
          />
        </div>
      </div>
      <div className="w-full flex"></div>
    </>
  );
}
