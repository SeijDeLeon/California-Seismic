import ChordForceCard from "./ChordForceCard";
import CollectorForceCard from "./CollectorForceCard";
import Input from "./Input";
//min-h-[calc(100vh-200px)]
export default function Output({inputs, solution, setSolution}) {
  return (
    <>
    <div className=" flex p-4">
      <div className=" rounded-lg border-2 border-blue-500 p-4 w-full max-w-2xl">
        <h1 className="text-blue-600 text-xl font-semibold mb-4 text-left">
          Output
        </h1>
        <div className="space-y-3">
          <CollectorForceCard inputs={inputs} solution={solution} setSolution={setSolution}/>
          <ChordForceCard inputs={inputs} solution={solution} setSolution={setSolution}/>
        </div>
      </div>
    </div>
    </>
  );
}
