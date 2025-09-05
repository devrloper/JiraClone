import { useState } from "react";
import { Columns2 } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useBoard } from "../Utilities/Store/Store";
import Card from "./Card";

function Column({ col }) {
  const addCard = useBoard((s) => s.addCard);
  const removeColumn = useBoard((s) => s.removeColumn);
  const updateColumnTitle = useBoard((s) => s.updateColumnTitle);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(col.title);

  //  make column droppable
  const { setNodeRef } = useDroppable({ id: col.id });

  return (
    <div
      ref={setNodeRef} //attach droppable ref
      className={`flex mt-8 ml-5  flex-col gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-3
        `}
      // ${isOver ? "ring-2 ring-blue-500" : ""}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2">
        {/* <Columns2 className="h-4 w-4 text-zinc-400" /> */}
        {isEditing ? (
          <input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={() => {
              updateColumnTitle(col.id, tempTitle.trim() || col.title);
              setIsEditing(false);
            }}
            autoFocus
            className="flex-1 rounded bg-zinc-800 px-2 text-sm"
          />
        ) : (
          <h3
            className="flex-1 font-medium text-zinc-100 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {col.title}
          </h3>
        )}
        <button
          onClick={() => removeColumn(col.id)}
          className="text-xs text-red-400 cursor-pointer"
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
          className="rounded-xl border border-zinc-700 bg-zinc-800 p-2 text-sm cursor-pointer"
        >
          + Add Card
        </button>
      </div>

      {/* Cards */}
      <div id={col.id} className="flex min-h-[4rem] flex-col gap-2">
        <SortableContext items={col.cardIds} strategy={rectSortingStrategy}>
          {col.cardIds.map((cid) => (
            <Card key={cid} id={cid} colId={col.id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
