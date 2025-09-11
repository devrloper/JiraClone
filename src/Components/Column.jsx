import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Card from "./Card";
import { useBoard } from "../Utilities/Store/Store";

function Column({ col }) {
  const addCard = useBoard((s) => s.addCard);
  const removeColumn = useBoard((s) => s.removeColumn);
  const updateColumnTitle = useBoard((s) => s.updateColumnTitle);

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(col.title);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  //  Droppable
  const { isOver, setNodeRef } = useDroppable({ id: col.id });

  const handleAddCard = () => {
    if (!newTitle.trim()) return;
    addCard(col.id, newTitle.trim(), "");
    setNewTitle("");
    setIsModalOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="relative flex flex-col gap-3 rounded-2xl border border-zinc-700 p-3 bg-zinc-900/80"
    >
      {/* Hover Overlay */}
      {isOver && (
        <div className="absolute inset-0 border-2 border-blue-400 rounded-2xl pointer-events-none transition-all duration-200"></div>
      )}

      {/* Column Header */}
      <div className="flex items-center gap-2 z-10">
        <div className="flex-1">
          {isEditing ? (
            <input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value.slice(0, 70))} // limit
              maxLength={70} // browser level limit
              onBlur={() => {
                updateColumnTitle(col.id, tempTitle.trim() || col.title);
                setIsEditing(false);
              }}
              autoFocus
              className="w-full rounded bg-zinc-800 px-2 text-sm text-white"  
            />
             
          ) : (
            <div className="relative w-fit">
              <h3
                className="font-medium text-zinc-100 cursor-pointer truncate max-w-[200px]"
                onClick={() => setIsEditing(true)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {col.title}
              </h3>

              {/* Tooltip */}
              {showTooltip && !isEditing && (
                <div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                                 max-w-[190px] rounded-md bg-stone-100 text-black text-xs 
                                p-2 shadow-lg break-words whitespace-normal"
                >
                  {col.title}
                  {/* Arrow */}
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 
                               border-l-4 border-r-4 border-b-4 border-transparent 
                               border-b-stone-100"
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeColumn(col.id)}
          className="text-xs text-red-400 cursor-pointer"
        >
          Remove
        </button>
      </div>

      {/* Cards */}
      <SortableContext items={col.cardIds} strategy={rectSortingStrategy}>
        {col.cardIds.map((cid) => (
          <Card key={cid} id={cid} colId={col.id} />
        ))}
      </SortableContext>

      {/* Add Card Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl border border-zinc-700 bg-zinc-800 p-2 text-sm cursor-pointer hover:bg-zinc-700 z-0"
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
              maxLength={70} //  Title limit yahan bhi
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 rounded-md mb-3 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">{newTitle.length}/70</p>
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
