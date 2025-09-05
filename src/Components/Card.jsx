import { useState } from "react"; 
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Pencil } from "lucide-react";
import clsx from "clsx";
import { useBoard } from "../Utilities/Store/Store";

function Card({ id, colId }) {
  const card = useBoard((s) => s.cards[id]);
  const removeCard = useBoard((s) => s.removeCard);
  const updateCard = useBoard((s) => s.updateCard);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempTitle, setTempTitle] = useState(card?.title || "");
  const [tempDesc, setTempDesc] = useState(card?.description || "");

  const style = { transform: CSS.Transform.toString(transform), transition };

  if (!card) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group rounded-2xl border border-zinc-700 bg-zinc-800 p-3 shadow-sm",
        isDragging && "opacity-60"
      )}
      {...attributes} 
      {...listeners}   // kahi say bhe drag ho jaye ga card
    >
      <div className="flex items-center gap-2">
        
        <button className="cursor-grab">
          <GripVertical className="h-4 w-4 text-zinc-400" />
        </button>

        {/* Title with Edit Icon */}
        {isEditingTitle ? (
          <input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={() => {
              updateCard(id, tempTitle.trim() || card.title, card.description);
              setIsEditingTitle(false);
            }}
            autoFocus
            className="flex-1 rounded bg-zinc-700 px-2 text-sm text-zinc-100"
          />
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <span className="text-sm text-zinc-100 font-medium">
              {card.title}
            </span>
            <Pencil
              className="h-4 w-4 text-zinc-400 cursor-pointer hover:text-blue-400"
              onPointerDown={(e) => e.stopPropagation()} //  prevent kry ga //onpointer down
              onClick={() => setIsEditingTitle(true)}
            />
          </div>
        )}

        <button
          onPointerDown={(e) => e.stopPropagation()} // prevent kry ga
          onClick={() => removeCard(colId, id)}
        >
          <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-400" />
        </button>
      </div>

      {/* Description with Edit Icon */}
      {isEditingDesc ? (
        <textarea
          value={tempDesc}
          onChange={(e) => setTempDesc(e.target.value)}
          onBlur={() => {
            updateCard(id, card.title, tempDesc.trim());
            setIsEditingDesc(false);
          }}
          autoFocus
          className="w-full mt-2 rounded bg-zinc-700 px-2 text-xs text-zinc-100"
        />
      ) : (
        <div className="border border-gray-700 rounded-md p-3 bg-gray-700 mt-3 flex justify-between items-start">
          {card.description ? (
            <p className="text-xs text-zinc-400">{card.description}</p>
          ) : (
            <p className="text-xs italic text-zinc-500">Add description...</p>
          )}
          <Pencil
            className="h-4 w-4 text-zinc-400 cursor-pointer hover:text-blue-400 ml-2"
            onPointerDown={(e) => e.stopPropagation()} //prevent kry ga
            onClick={() => setIsEditingDesc(true)}
          />
        </div>
      )}
    </div>
  );
}

export default Card;

