import React, { useState, useEffect, useRef } from "react";
import { members } from "../Pages/Members"; // Members list yahan se import ki gayi hai
import { useBoard } from "../Utilities/Store/Store"; // Zustand store use kiya ja raha hai

function AssigneeCircle({ cardId }) {
  // Card ko zustand store se access kar rahe hain
  const card = useBoard((s) => s.cards[cardId]);
  const assignMember = useBoard((s) => s.assignMember); // Store ka function member assign karne ke liye
  const [open, setOpen] = useState(false); // Dropdown open/close state
  const circleRef = useRef(null); // Reference for outside click handling

  // Assigned member nikalna agar card pe assign hai
  const assignedMember = card?.assigneeId
    ? members.find((m) => m.id === card.assigneeId)
    : null;

  // Dropdown toggle karna
  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  // Bahar click karne se dropdown close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (circleRef.current && !circleRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Esc key press karne pe dropdown close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={circleRef} className="relative flex-none">
      {/* Circle jisme assigned member ki image ya + sign dikh raha hai */}
      <div
        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm cursor-pointer border border-gray-400 hover:bg-zinc-600 overflow-hidden"
        onPointerDown={(e) => {
          e.stopPropagation(); // Drag issues avoid karne ke liye
          toggleOpen(e); // Dropdown toggle
        }}
        title={assignedMember ? `Assigned to: ${assignedMember.name}` : "Assign Member"}
      >
        {assignedMember ? ( // Agar member assign hai
          assignedMember.image ? ( // Agar image hai to image show hogi
            <img
              src={assignedMember.image}
              alt={assignedMember.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            // Agar image nahi hai to sirf naam ka pehla letter show hoga
            <span className="text-xs font-medium">
              {assignedMember.name.charAt(0).toUpperCase()}
            </span>
          )
        ) : (
          // Agar koi assign nahi hai to + sign show hoga
          <span className="text-lg">+</span>
        )}
      </div>

      {/* Dropdown open hone par members list dikhayega */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 bg-zinc-900 text-white rounded shadow-lg z-50"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Members loop karke list show karna */}
          {members.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-800 cursor-pointer"
              onPointerDown={(e) => {
                e.stopPropagation();
                assignMember(cardId, m.id); // Member assign karna (zustand store update)
                setOpen(false);
              }}
            >
              {m.image ? (
                // Member ki image show hogi agar available ho
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                // Agar image na ho to naam ka pehla letter circle me show hoga
                <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
                  {m.name.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Member ka naam */}
              <div className="flex-1 text-sm truncate">{m.name}</div>
            </div>
          ))}

          {/* Unassign ka option */}
          <div
            className="px-2 py-2 text-xs text-center hover:bg-gray-800 cursor-pointer border-t border-zinc-700"
            onPointerDown={(e) => {
              e.stopPropagation();
              assignMember(cardId, null); // Member ko remove karna
              setOpen(false);
            }}
          >
            Unassign
          </div>
        </div>
      )}
    </div>
  );
}

export default AssigneeCircle;
