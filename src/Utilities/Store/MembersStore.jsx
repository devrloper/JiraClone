import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMembersStore = create(
  persist(
    (set) => ({
      members: [
        {
          id: 1,
          name: "Ara Ahmad",
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
          name: "Aara",
          role: "UI/UX Designer",
          image: "https://i.pravatar.cc/150?img=5",
        },
        {
          id: 6,
          name: "Aara",
          role: "UI/UX Designer",
          image: "https://i.pravatar.cc/150?img=5",
        },
      ],
      addMember: (member) =>
        set((state) => ({
          members: [...state.members, { ...member, id: Date.now() }],
        })),
        removeMember: (id) =>
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        })),
        updateMember: (id, updatedData) =>
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, ...updatedData } : m
          ),
        })),
    }),
    
    {
      name: "members-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
