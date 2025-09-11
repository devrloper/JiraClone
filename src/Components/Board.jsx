import { DndContext, DragOverlay,rectIntersection  } from "@dnd-kit/core"; // dnd-kit se drag & drop ka setup
import { Plus, X } from "lucide-react"; // icons
import { useState, useMemo } from "react";
import { useBoard } from "../Utilities/Store/Store"; // custom zustand store
import Column from "./Column";
import Card from "./Card"; //  overlay ke liye real Card component import

//  Card kis column me hai, yeh function find karega
function findColumnIdByCardId(columns, cardId) {
  return (
    Object.values(columns).find((c) => c.cardIds.includes(cardId))?.id || null
  );
}

function Board() {
  // Zustand store se data/functions le rahe hain
  const columns = useBoard((s) => s.columns); // sab columns
  const moveCard = useBoard((s) => s.moveCard); // card move karne ka function
  const cards = useBoard((s) => s.cards); // saare cards overlay ke liye
  const addColumn = useBoard((s) => s.addColumn); // column add karne ka function

  // Local component states
  const [activeCardId, setActiveCardId] = useState(null); // drag ho raha card ka id
  const [isOpen, setIsOpen] = useState(false); // modal open/close
  const [colName, setColName] = useState(""); // new column name

  // columns ko array me convert kiya for easy mapping
  const columnList = useMemo(() => Object.values(columns), [columns]);

  // naya column add karne ka handler
  const handleAddColumn = () => {
    if (colName.trim() !== "") {
      addColumn(colName); // zustand store me column add hoga
      setColName(""); // input reset
      setIsOpen(false); // modal band
    }
  };

  return (
    //  DndContext wrap karta hai drag/drop logic
    <DndContext
     collisionDetection={rectIntersection} // <-- rectIntersection detects column boundaries better
       // kis element se takraya, yeh logic decide karega
      onDragStart={(e) => setActiveCardId(e.active.id)} // jab drag start ho to card ka id save
      onDragEnd={(e) => {
        const { active, over } = e;
        setActiveCardId(null); // drag complete hone par id reset

        if (!over) return; // agr drop nahi hua to kuch mat karo

        const fromColId = findColumnIdByCardId(columns, active.id); // jis column se drag hua
        const toColId =
          findColumnIdByCardId(columns, over.id) ||
          (columns[over.id] ? over.id : null); // jis column me drop ho raha

        if (!fromColId || !toColId) return; // koi column missing to skip

        const toIds = columns[toColId].cardIds; // destination column ke card ids
        const overIndex = toIds.indexOf(over.id); // kis card ke upar drop ho raha
        const toIndex = overIndex >= 0 ? overIndex : toIds.length; // last me add agar specific card nahi mila

        moveCard({ fromColId, toColId, cardId: active.id, toIndex }); // move the card
      }}
    >
      {/* Main Page UI */}
      <div className="min-h-screen ">
        {/* Header */}
        <header className="border-b border-zinc-800 bg-zinc-950 p-4 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Organize your tasks
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              title="Add column"
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white hover:bg-zinc-800 cursor-pointer"
            >
              <Plus className="h-4 w-4 " />

              {/* This span will be hidden below md (768px), and visible on md+ screens */}
              <span className="hidden md:inline ">Add column</span>
            </button>
          </div>
        </header>

        {/* Columns */}
        <div className="flex flex-row gap-4 overflow-auto px-4 py-6  min-h-screen">
          {columnList.map((col) => (
            <div key={col.id} className="min-w-[300px] flex-shrink-0">
              <Column col={col} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-4 md:p-6 rounded-2xl shadow-lg w-[90%] max-w-sm max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Add New Column
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-zinc-400 hover:text-zinc-200 cursor-pointer" />
              </button>
            </div>
            <input
              type="text"
              value={colName}
              onChange={(e) => setColName(e.target.value.slice(0, 70))}
              maxLength={70}
              placeholder="Enter column name"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 border border-zinc-700 text-white hover:bg-gray-400 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColumn}
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-600 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drag Overlay — jab card drag ho raha ho to UI preview yahan se show hoga */}
      <DragOverlay>
        {activeCardId && cards[activeCardId] ? (
          <Card
            id={activeCardId}
            colId={findColumnIdByCardId(columns, activeCardId)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;
