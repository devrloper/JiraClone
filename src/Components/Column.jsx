import { useState } from "react";
import { Columns2 } from "lucide-react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useBoard } from "../Pages/Store/Store"; //access fuction from store
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";

function Column({ col }) {
  //grab the addcard or removecol function from zustand store
  const addCard = useBoard((s) => s.addCard);
  const removeColumn = useBoard((s) => s.removeColumn);
  //stores cards titles or description
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // 👇 make column droppable
  const { setNodeRef, isOver } = useDroppable({
    id: col.id,
  });

  return (
    <div
      ref={setNodeRef} // 👈 attach droppable ref
      className={`flex w-full flex-col gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-3 ${
        isOver ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2">
        <Columns2 className="h-4 w-4 text-zinc-400" />
        <h3 className="flex-1 font-medium text-zinc-100">{col.title}</h3>
        <button
          onClick={() => removeColumn(col.id)}
          className="text-xs text-red-400"
        >
          Remove
        </button>
      </div>

      {/* Add Card Inputs */}
      <div className="flex flex-col gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Card title..."
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
        />
        <input
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="Card description..."
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
        />
        <button
          onClick={() => {
            if (!newTitle.trim()) return;
            addCard(col.id, newTitle.trim(), newDesc.trim());
            setNewTitle("");
            setNewDesc("");
          }}
          className="rounded-xl border border-zinc-700 bg-zinc-800 p-2 text-sm"
        >
          + Add Card
        </button>
      </div>

      {/* Cards List */}

      
      <div id={col.id} className="flex min-h-[4rem] flex-col gap-2">
        {/* cards drag and drop kay doran arrange keran */}
        <SortableContext items={col.cardIds} strategy={rectSortingStrategy}>
          {col.cardIds.length > 0 ? (
            col.cardIds.map((cid) => <Card key={cid} id={cid} colId={col.id} />)
          ) : (
            <p className="text-sm text-zinc-500 italic"></p> // 👈 empty column indicator
          )}
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
