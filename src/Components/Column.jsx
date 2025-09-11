import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useBoard } from "../Utilities/Store/Store";
import Card from "./Card";

function Column({ col }) {
  const addCard = useBoard((s) => s.addCard);
  const removeColumn = useBoard((s) => s.removeColumn);
  const updateColumnTitle = useBoard((s) => s.updateColumnTitle);

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(col.title);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Tooltip state
  const [showTooltip, setShowTooltip] = useState(false);

  // make column droppable
  const { setNodeRef } = useDroppable({ id: col.id });

  const handleAddCard = () => {
    if (!newTitle.trim()) return;
    addCard(col.id, newTitle.trim(), newDesc.trim());
    setNewTitle("");
    setNewDesc("");
    setIsModalOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="flex ml-5 flex-col gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-3"
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 relative">
        {isEditing ? (
          <input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={() => {
              updateColumnTitle(col.id, tempTitle.trim() || col.title);
              setIsEditing(false);
            }}
            autoFocus
            className="flex-1 rounded bg-zinc-800 px-2 text-sm text-white"
          />
        ) : (
          <h3
            className="flex-1 font-medium text-zinc-100 cursor-pointer truncate max-w-[200px]"
            onClick={() => setIsEditing(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {col.title}
          </h3>
        )}

        {/* Tooltip (now inside column, with wrapping + small text) */}
        {showTooltip && !isEditing && (
          <div className="absolute top-8 left-0 z-50 max-w-xs rounded-md bg-stone-100 text-black text-xs p-2 shadow-lg break-words whitespace-normal">
            {col.title}
          </div>
        )}

        <button
          onClick={() => removeColumn(col.id)}
          className="text-xs text-red-400 cursor-pointer"
        >
          Remove
        </button>
      </div>

      {/* Cards */}
      <div id={col.id} className="flex flex-col gap-2">
        <SortableContext items={col.cardIds} strategy={rectSortingStrategy}>
          {col.cardIds.map((cid) => (
            <Card key={cid} id={cid} colId={col.id} />
          ))}
        </SortableContext>
      </div>

      {/* Add Card Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl border border-zinc-700 bg-zinc-800 p-2 text-sm cursor-pointer hover:bg-zinc-700"
      >
        + Add Card
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-zinc-900 p-4 md:p-6 rounded-2xl shadow-lg w-[90%] max-w-sm max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Create New Card
            </h3>

            <input
              type="text"
              placeholder="Card title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 rounded-md mb-3 text-white"
              required
            />

            {/* <textarea
              placeholder="Card description..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full border p-2 rounded-md mb-4 text-white"
            /> */}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 cursor-pointer rounded-lg hover:bg-gray-400 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                className="px-4 py-2 bg-white cursor-pointer text-black rounded-lg hover:bg-zinc-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Column;
