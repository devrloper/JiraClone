import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";   // import from dnd-kit for drag & drop
// icons from lucide-react
import { Plus, X } from "lucide-react"; 
// react hooks
import { useState, useMemo } from "react";
// custom store hook
import { useBoard } from "../Utilities/Store/Store";
// column component
import Column from "./Column";

// Yai function cardId ka pta lagae ga kay kis column may hai
function findColumnIdByCardId(columns, cardId) {
  return (
    Object.values(columns).find((c) => c.cardIds.includes(cardId))?.id || null // first convert all columns to array and find card column
  );
}

function Board() {
  // get columns, moveCard, addColumn from store
  const columns = useBoard((s) => s.columns);
  const moveCard = useBoard((s) => s.moveCard);
  const addColumn = useBoard((s) => s.addColumn);

  // drag kertay waqt active card ka id save karega
  const [activeCardId, setActiveCardId] = useState(null);
  // modal open/close state
  const [isOpen, setIsOpen] = useState(false);
  // new column name
  const [colName, setColName] = useState("");

  // convert columns object → array, useMemo taa kay unnecessary re-render na ho
  const columnList = useMemo(() => Object.values(columns), [columns]);

  // new column add karne ka function
  const handleAddColumn = () => {
    if (colName.trim() !== "") {
      addColumn(colName); // store me column add
      setColName(""); // input reset
      setIsOpen(false); // modal close
    }
  };

  return (
    // drag and drop wrapper component
    <DndContext
      collisionDetection={closestCorners} // decides item drag hotay waqt kidher drop hoga
      onDragStart={(e) => setActiveCardId(e.active.id)} // saves the card id
      onDragEnd={(e) => {
        const { active, over } = e; // active = jo drag ho raha, over = jahan drop karna
        setActiveCardId(null); // drag done id clear
        if (!over) return; // agr drop hua hi nahi to kuch mat karo

        const fromColId = findColumnIdByCardId(columns, active.id); // source column
        const toColId =
          findColumnIdByCardId(columns, over.id) || // destination column
          (columns[over.id] ? over.id : null);

        if (!fromColId || !toColId) return; // starting or destination missing → no move
        const toIds = columns[toColId].cardIds; // destination column ke card ids
        const overIndex = toIds.indexOf(over.id);
        const toIndex = overIndex >= 0 ? overIndex : toIds.length;

        // shift card from one column to another
        moveCard({ fromColId, toColId, cardId: active.id, toIndex });
      }}
    >
      {/* Page Wrapper */}
      <div className="bg-black min-h-screen ">
        {/* Fixed Header */}
        <header className=" border-b border-zinc-800 bg-zinc-950 p-4 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Organize your tasks
            </h1>
            {/* Add Column Button (Header) */}
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white hover:bg-zinc-800"
            >
              <Plus className="h-4 w-4" /> Add column
            </button>
          </div>
        </header>

        {/* Columns Container */}
        <div className="flex flex-col lg:flex-row gap-4 overflow-auto px-4 mt-12   h-130">
          {columnList.map((col) => (
            <div
              key={col.id}
              className="min-w-[300px] flex-shrink-0"
            >
              <Column col={col} />
            </div>
          ))}
        </div>

        {/* Add Column Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Add New Column
                </h2>
                {/* Close Modal Button */}
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5 text-zinc-400 hover:text-zinc-200" />
                </button>
              </div>
              {/* Column Name Input */}
              <input
                type="text"
                value={colName}
                onChange={(e) => setColName(e.target.value)}
                placeholder="Enter column name"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Modal Buttons */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddColumn}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Add
                </button>
              </div>
              onChange={(e) => setColName(e.target.value.slice(0, 70))} // max 255 chars
              maxLength={255} // browser side limit
            </div>
          </div>
        )}
      </div>

      {/* Drag Overlay → dragging card preview */}
      <DragOverlay>
        {activeCardId ? (
          <div className="w-[15.5rem] rounded-2xl border border-zinc-700 bg-zinc-800 p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="text-sm text-white">
                {useBoard.getState().cards[activeCardId]?.title}
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;
