import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core"; //libraray of dndkit used for drag and drop
import { Plus, X } from "lucide-react"; //icons import
import { useState, useMemo } from "react";
import { useBoard } from "../Pages/Store/Store";
import Column from "./Column";
function findColumnIdByCardId(columns, cardId) {
  //Yai  cardid ka pta lagae ga kay kis column may hai
  return (
    Object.values(columns).find((c) => c.cardIds.includes(cardId))?.id || null //first convert all the columns to arrray and then find column in which the card lies agr column mil gya to return id otherwise null return
  );
}
function Board() {
  //this gets columns ,movecard,add column from store
  const columns = useBoard((s) => s.columns);
  const moveCard = useBoard((s) => s.moveCard);
  const addColumn = useBoard((s) => s.addColumn);

  const [activeCardId, setActiveCardId] = useState(null); //drag kertay waqt jo card active hai us ki id save kry ga
  const [isOpen, setIsOpen] = useState(false); //used for modal is it open or not
  const [colName, setColName] = useState(""); //new column ka name rakhnay kay leyai state

  const columnList = useMemo(() => Object.values(columns), [columns]); //use meo used taa kay recalculate na ho

  const handleAddColumn = () => {
    //new column add kernay ka function
    if (colName.trim() !== "") {
      //trim khali spaces hata deta hai agay or peechay say name ki
      addColumn(colName);
      setColName("");
      setIsOpen(false); //modal bund ho ga
    }
  };

  return (
    //drag and drop rraper component
    <DndContext
      collisionDetection={closestCorners} ///decides item drag hotay waqt kidher drop ho ga
      onDragStart={(e) => setActiveCardId(e.active.id)} //saves the card id
      onDragEnd={(e) => {
        const { active, over } = e; //active means jo drag ho ga over means jo drop ho ga
        setActiveCardId(null); //drag done id clear
        if (!over) return; //agr card kahi drop hoa hi nhi to next code dont run
        const fromColId = findColumnIdByCardId(columns, active.id);
        const toColId =
          findColumnIdByCardId(columns, over.id) ||
          (columns[over.id] ? over.id : null);

        if (!fromColId || !toColId) return; //starting or destination idna milay to no card moved
        const toIds = columns[toColId].cardIds; //destination columns ki card ki id ki list leta hai
        const overIndex = toIds.indexOf(over.id);
        const toIndex = overIndex >= 0 ? overIndex : toIds.length;

        moveCard({ fromColId, toColId, cardId: active.id, toIndex }); //shift card to one column to other
      }}
    >
      {/* Header */}
      <header className="sticky top-0 border-b border-zinc-800 bg-zinc-950 p-4 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold">Organize your tasks</h1>
        </div>
      </header>
      {/* Add Column Button only inside Board */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2"
        >
          <Plus className="h-4 w-4" /> Add column
        </button>
      </div>
      {/* Columns Grid */}
      <main className="mx-auto w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {columnList.map((col) => (
            <Column key={col.id} col={col} />
          ))}
        </div>
      </main>
      {/* Add Column Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Column</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-zinc-400 hover:text-zinc-200" />
              </button>
            </div>
            <input
              type="text"
              value={colName}
              onChange={(e) => setColName(e.target.value)}
              placeholder="Enter column name"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColumn}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Drag Overlay */}
      <DragOverlay>
        {activeCardId ? (
          <div className="w-[20rem] rounded-2xl border border-zinc-700 bg-zinc-800 p-3 shadow-lg">
            <div className="flex items-center gap-2">
            
              <div className="text-sm">
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
