import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Pencil } from "lucide-react";
import clsx from "clsx";
import { useBoard } from "../Utilities/Store/Store";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function Card({ id, colId }) {
  const card = useBoard((s) => s.cards[id]);
  const removeCard = useBoard((s) => s.removeCard);
  const updateCard = useBoard((s) => s.updateCard);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const [tempTitle, setTempTitle] = useState(card?.title || "");
  const [tempDesc, setTempDesc] = useState(card?.description || "");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill && isModalOpen) {
      // Set initial content
      quill.root.innerHTML = tempDesc || "";

      // Update tempDesc on text change
      quill.on("text-change", () => {
        setTempDesc(quill.root.innerHTML);
      });

    }
  }, [quill, isModalOpen]);

  const style = { transform: CSS.Transform.toString(transform), transition };

  if (!card) return null;

  const truncatedTitle =
    card.title.length > 70 ? card.title.slice(0, 67) + "..." : card.title;

  return (
    <>
      {/* CARD */}
      <div
        ref={setNodeRef}
        style={style}
        className={clsx(
          "group rounded-2xl border border-zinc-700 bg-zinc-800 p-3 shadow-sm relative cursor-grab",
          isDragging && "opacity-60"
        )}
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center gap-2 relative">
          {/* Title */}
          <div
            className="flex-1 flex items-center justify-between"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span
              className="text-sm text-zinc-100 font-medium truncate max-w-[160px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              {truncatedTitle}
            </span>

            <Pencil
              className="h-4 w-4 text-zinc-400 cursor-pointer hover:text-blue-400 ml-2"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setTempTitle(card.title || "");
                setIsModalOpen(true);
              }}
            />
          </div>

          {showTooltip && (
            <div className="absolute top-full left-0 mt-1 z-50 max-w-xs rounded-md bg-stone-100 text-black text-xs p-2 shadow-lg break-words whitespace-normal">
              {card.title}
            </div>
          )}

          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              removeCard(colId, id);
            }}
          >
            <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-400 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {/* {isModalOpen && ( */}
        <div className={isModalOpen ? "fixed inset-0 bg-black/60 flex items-center justify-center z-50" : "hidden"}>
          <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-2xl">
            {/* Title */}
            <h2 className="text-lg font-semibold text-white mb-4">
              <input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="w-full rounded bg-zinc-800 px-3 py-2 text-white"
              />
            </h2>

            {/* Rich Text Description using react-quilljs */}
            <div className="bg-black/60 rounded-md text-white ">
              <div ref={quillRef} style={{ minHeight: "200px" }} />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateCard(id, tempTitle.trim() || card.title, (tempDesc || "").trim());
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
}

export default Card;


// import React, { useState, useEffect } from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { Trash2, Pencil } from "lucide-react";
// import clsx from "clsx";
// import { useBoard } from "../Utilities/Store/Store";

// function Card({ id, colId }) {
//   const card = useBoard((s) => s.cards[id]);
//   const removeCard = useBoard((s) => s.removeCard);
//   const updateCard = useBoard((s) => s.updateCard);

//   const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
//     useSortable({ id });

//   const [tempTitle, setTempTitle] = useState(card?.title || "");
//   const [tempDesc, setTempDesc] = useState(card?.description || "");
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // ✅ Sync card data when modal opens
//   useEffect(() => {
//     if (isModalOpen) {
//       setTempTitle(card?.title || "");
//       setTempDesc(card?.description || "");
//     }
//   }, [isModalOpen, card]);

//   const style = { transform: CSS.Transform.toString(transform), transition };

//   if (!card) return null;

//   const truncatedTitle =
//     card.title.length > 70 ? card.title.slice(0, 67) + "..." : card.title;

//   return (
//     <>
//       {/* CARD */}
//       <div
//         ref={setNodeRef}
//         style={style}
//         className={clsx(
//           "group rounded-2xl border border-zinc-700 bg-zinc-800 p-3 shadow-sm relative cursor-grab",
//           isDragging && "opacity-60"
//         )}
//         {...attributes}
//         {...listeners}
//       >
//         <div className="flex items-center gap-2 relative">
//           {/* Title */}
//           <div
//             className="flex-1 flex items-center justify-between"
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           >
//             <span
//               className="text-sm text-zinc-100 font-medium truncate max-w-[160px] cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsModalOpen(true);
//               }}
//             >
//               {truncatedTitle}
//             </span>

//             <Pencil
//               className="h-4 w-4 text-zinc-400 cursor-pointer hover:text-blue-400 ml-2"
//               onPointerDown={(e) => e.stopPropagation()}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsModalOpen(true);
//               }}
//             />
//           </div>

//           {showTooltip && (
//             <div className="absolute top-full left-0 mt-1 z-50 max-w-xs rounded-md bg-stone-100 text-black text-xs p-2 shadow-lg break-words whitespace-normal">
//               {card.title}
//             </div>
//           )}

//           <button
//             onPointerDown={(e) => e.stopPropagation()}
//             onClick={(e) => {
//               e.stopPropagation();
//               removeCard(colId, id);
//             }}
//           >
//             <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-400 cursor-pointer" />
//           </button>
//         </div>
//       </div>

//      {/* MODAL */}
// {isModalOpen && (
//   <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//     <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-2xl">
//       {/* Title */}
//       <h2 className="text-lg font-semibold text-white mb-4">
//         <input
//           value={tempTitle}
//           onChange={(e) => setTempTitle(e.target.value)}
//           className="w-full rounded bg-zinc-800 px-3 py-2 text-white"
//         />
//       </h2>

//       {/* ✅ Styled Paragraph Box */}
//       <div className="bg-zinc-800/60 rounded-xl p-3 shadow-inner">
//         <textarea
//           value={tempDesc}
//           onChange={(e) => setTempDesc(e.target.value)}
//           className="w-full min-h-[220px] resize-none bg-transparent text-white 
//                      placeholder-zinc-400 outline-none leading-relaxed text-sm"
//           placeholder="Write your description here..."
//         />
//       </div>

//       {/* Buttons */}
//       <div className="mt-4 flex justify-end gap-2">
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
//         >
//           Close
//         </button>
//         <button
//           onClick={() => {
//             updateCard(id, tempTitle.trim() || card.title, (tempDesc || "").trim());
//             setIsModalOpen(false);
//           }}
//           className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 cursor-pointer"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </>
//   );
// }

// export default Card;
