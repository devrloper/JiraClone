import React, { useState, useEffect, useRef } from "react"; 
import { members } from "../Pages/Members"; // Members ka data import kar rahe hain

function AssigneeCircle() {
  const [assignee, setAssignee] = useState(null); // Ye state track karti hai ke kaun member select hua hai
  const [open, setOpen] = useState(false); // Ye state track karti hai ke dropdown open hai ya band
  const [, setPosition] = useState({ top: 0, left: 0 }); // Dropdown ki position screen ke relative
  const circleRef = useRef(null); // Ye reference use hota hai circle element aur dropdown ko track karne ke liye

  //  Toggle dropdown 
  const toggleOpen = (e) => {
    e.stopPropagation(); // Ye parent click ya drag ko prevent karta hai
    if (!open && circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect(); // Circle ka position aur size lete hain
      setPosition({
        top: rect.bottom  + 4, // Dropdown ko circle ke neeche thoda offset ke sath
        left: rect.left , // Circle ke left se align
      });
    }
    setOpen((prev) => !prev); // Dropdown open/close toggle
  };

  //Close dropdown on outside click 
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Agar click circle ke bahar ho to dropdown close kar do
      if (circleRef.current && !circleRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Close dropdown on Escape key 
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false); // Escape press karne se dropdown close
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={circleRef} className="relative inline-block">
      {/* Circle (jo click karenge to dropdown khulega) */}
      <div
        className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center 
                   text-white text-sm cursor-pointer border border-gray-400"
        onPointerDown={toggleOpen} // PointerDown use karna is liye ke drag interference na ho
        title={assignee ? `Assigned to: ${assignee.name}` : "Assign Member"} // Tooltip dikhata hai
      >
        {assignee ? (
          assignee.image ? (
            <img
              src={assignee.image}
              alt={assignee.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            assignee.name.charAt(0).toUpperCase() // Agar image na ho to first letter show
          )
        ) : (
          "+" // Agar koi member select nahi hua to "+"
        )}
      </div>

      {/* Dropdown using portal */}
      {open &&
        (
          <div
            className="absolute top:10 left-0 bg-zinc-900 text-white rounded shadow-lg w-44 z-50"
            
            onPointerDown={(e) => e.stopPropagation()} // Drag ke interference ko prevent karta hai
          >
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-800 cursor-pointer"
                onPointerDown={(e) => {
                  e.stopPropagation(); // Drag interference prevent
                  setAssignee(m); // Member select karna
                  setOpen(false); // Dropdown close
                }}
              >
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
                    {m.name.charAt(0).toUpperCase()} {/* Agar image na ho to initial show */}
                  </div>
                )}
                <span className="truncate">{m.name}</span> {/* Member ka naam */}
              </div>
            ))}
          </div>
        
        )}
    </div>
  );
}

export default AssigneeCircle;
