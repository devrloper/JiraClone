import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"; //css transformation ko handle kernay kay leyai during drag
import { GripVertical, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useBoard } from "../Pages/Store/Store";

function Card({ id, colId }) {
  const card = useBoard((s) => s.cards[id]);
  const removeCard = useBoard((s) => s.removeCard);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id }); //makae card dragable

  const style = { transform: CSS.Transform.toString(transform), transition }; //tranformation of a ccard in a smoothway

  if (!card) return null; //agr card nhi mla to kuch bhe render na kro

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group rounded-2xl border border-zinc-700 bg-zinc-800 p-3 shadow-sm",
        isDragging && "opacity-60"
      )}
      {...attributes}
    >
      <div className="flex items-center gap-2">
        <button className="cursor-grab" {...listeners}>
          <GripVertical className="h-4 w-4 text-zinc-400" />
        </button>
        <div className="flex-1 text-sm text-zinc-100 font-medium">
          {card.title}
        </div>
        <button onClick={() => removeCard(colId, id)}>
          <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-400" />
        </button>
      </div>
      {/* ✅ Description */}

      <div className="border border-gray-700 rounded-md p-3 bg-gray-700 mt-3">
        {" "}
        {card.description && (
          <p className="mt-1 text-xs text-zinc-400">{card.description}</p>
        )}
      </div>
    </div>
  );
}

export default Card;
