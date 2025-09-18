import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Pencil } from "lucide-react";
import clsx from "clsx";
import { useBoard } from "../Utilities/Store/Store";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import AssigneeCircle from "./AssignedTask";

function Card({ id, colId }) {
  const card = useBoard((s) => s.cards[id]);
  const removeCard = useBoard((s) => s.removeCard);
  const updateCard = useBoard((s) => s.updateCard);
  const [newComment, setNewComment] = useState("");

  // get addComment function from zustand
  // Card.jsx ya common constants file me
  const typeIcons = {
    story: "📘",
    bug: "🐞",
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [tempTitle, setTempTitle] = useState(card?.title || "");
  const [tempDesc, setTempDesc] = useState(card?.description || "");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill && isModalOpen) {
      quill.root.innerHTML = tempDesc || "";

      quill.on("text-change", () => {
        const plainText = quill.getText();

        if (plainText.length > 500) {
          quill.deleteText(500, plainText.length);
        }

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
          "group rounded-2xl border border-zinc-700 bg-zinc-800 p-3 shadow-sm relative cursor-grab hover:bg-zinc-700",
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
              <Link to={`/card/${id.split("-")[1]}`}>{truncatedTitle}</Link>
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
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0  border-l-4 border-r-4 border-b-4 border-transparent  border-b-stone-100"></div>
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

          <div className="relative">
            <AssigneeCircle cardId={card.id} />
          </div>
        </div>
        {/* Card ID & Type */}
        <div className="flex items-center gap-1 ">
          {card.type && (
            <span className="flex items-center  text-xs  rounded  text-white">
              {/* Icon from map */}
              <span>{typeIcons[card.type]}</span>
            </span>
          )}
          <span className="text-[0.8rem] text-gray-400">
            {id.split("-")[1]}
          </span>
        </div>
      </div>

      {/* MODAL */}
      {/* MODAL */}
      <div
        className={
          isModalOpen
            ? "fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            : "hidden"
        }
      >
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Title */}
          <h2 className="text-lg font-semibold text-white mb-4">
            <input
              value={tempTitle}
              maxLength={70}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full rounded bg-zinc-800 px-3 py-2 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">{tempTitle.length}/70</p>
          </h2>

          {/* Rich Text Description */}
          <div className="text-white mb-6">
            <div className="rounded-2xl overflow-hidden border [&_.ql-toolbar]:border-0 [&_.ql-container]:border-0 [&_.ql-toolbar_.ql-stroke]:white [&_.ql-toolbar_.ql-fill]:white [&_.ql-picker]:text-white [&_.ql-picker-label]:text-white [&_.ql-picker-options]:bg-zinc-800 [&_.ql-picker-options]:text-white">
              <div ref={quillRef} className="min-h-[200px]" />
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-sm text-gray-300 mb-2">Comments</h3>

            {/* Input box for new comment */}
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 rounded-lg px-3 py-2 bg-zinc-800 text-white text-sm"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent modal from closing
                  if (!newComment.trim()) return;

                  const updatedComments = [
                    ...(card.comments || []),
                    newComment,
                  ];
                  updateCard(id, card.title, card.description, updatedComments);
                  setNewComment("");
                }}
                className="px-3 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 cursor-pointer text-sm"
              >
                Post
              </button>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {card.comments && card.comments.length > 0 ? (
                card.comments.map((c, i) => (
                  <div
                    key={i}
                    className="p-2 bg-zinc-800 rounded-lg text-sm text-white flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span>💬</span>
                      <span>{c}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent modal click from firing
                        const updatedComments = card.comments.filter(
                          (_, index) => index !== i
                        );
                        updateCard(
                          id,
                          card.title,
                          card.description,
                          updatedComments
                        );
                      }}
                      className="text-red-500 hover:text-red-400 text-xs font-bold cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-400 cursor-pointer" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No comments yet</p>
              )}
            </div>
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
                updateCard(
                  id,
                  tempTitle.trim() || card.title,
                  (tempDesc || "").trim(),
                  card.comments
                );
                setIsModalOpen(false);
              }}
              className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 cursor-pointer"
            >
              Save
            </button>
            <Link
              to={`/card/${id.split("-")[1]}`}
              className="px-4 py-2 rounded-lg bg-gray-700 text-black hover:bg-gray-600 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              Show Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
