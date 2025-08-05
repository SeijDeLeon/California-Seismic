import DiaphragmViewer from "../components/features/DiaphragmApp/DiaphragmViewer.jsx";
import DiaphragmInput from "../components/features/DiaphragmApp/DiaphragmInput.jsx";
import CollectorForceCard from "../components/features/DiaphragmAnalysis/CollectorForceCard.jsx";
import ChordForceCard from "../components/features/DiaphragmAnalysis/ChordForceCard.jsx";


export default function DiaphragmApp() {
  //state variables for input here

  return (
    <>
    {/* Input */}
    {/* Output */}
    <div className="w-full flex">
      <div className="w-1/2 border border-sky-500 flex flex-col">
          <DiaphragmInput />
          <CollectorForceCard />
          <ChordForceCard />
      
      </div>
      <div className="w-1/2 border border-sky-500">
          <DiaphragmViewer />
      </div>
    </div>
    <div className="w-full flex">
    </div>


    </>
  );
}
