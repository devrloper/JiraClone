import React from "react";

export const members = [
  {
    id: 1,
    name: "Arooba Ahmad",
    role: "Team Lead",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Ali Raza",
    role: "Backend Developer",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Sara Iqbal",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Aara ",
    role: "UI/UX Designer",
    
  },
];

function MembersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 🔹 Header Section */}
        <div className="border border-amber-50 p-6 rounded-xl text-center bg-zinc-800/60 w-full max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Meet Our Team Members
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Dedicated professionals working together for success 
          </p>
        </div>

        {/* Members Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 cursor-pointer">
  {members.map((member) => (
    <div
      key={member.id}
      className="bg-zinc-800/70 border border-zinc-700 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
    >
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-24 h-24 rounded-full border-2 border-amber-400 mb-4 object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full border-2 border-amber-400 mb-4 bg-gray-600 flex items-center justify-center text-white text-2xl font-bold">
          {member.name.charAt(0).toUpperCase()}
        </div>
      )}

      <h2 className="text-lg font-semibold">{member.name}</h2>
      <p className="text-sm text-gray-400">{member.role}</p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default MembersPage;
