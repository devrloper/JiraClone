import { create } from "zustand";
import { nanoid } from "nanoid"; //make unique Id for each card or column its a library
import { arrayMove } from "@dnd-kit/sortable"; //helper to move element to one positon to another(use for drag or drop)
import { persist } from "zustand/middleware";

export const useBoard = create(
  persist(
    (set) => ({
      columns: {
        "col-todo": { id: "col-todo", title: "To Do", cardIds: [] },
        "col-doing": { id: "col-doing", title: "To Do", cardIds: [] },
        "col-dong": { id: "col-dong", title: "To Do", cardIds: [] },
        
      },
      cards: {}, //object,all cards detail inside it
      addColumn: (
        title //ADD NEW COLUMN
      ) =>
        set((state) => {
          const id = `col-${nanoid(6)}`; //MAKE UNIQUE id of 6 characters
          return {
            columns: {
              ...state.columns, //make copy of previous column taa kay data update kr saky hum
              [id]: { id, title: title, cardIds: [] }, //new column initially khali ho ga
            },
          };
        }),
      removeColumn: (
        colId //col id lay ga or column ko delete kry ga or sath jo colun kay under cards hon gay unko bhe del kry ga
      ) =>
        set((state) => {
          //ZUSTAND FUNCTION
          const { [colId]: removed, ...rest } = state.columns;
          if (!removed) return {}; //agr del kernay ka koe col nhi mila to del nhi ho ga
          const newCards = { ...state.cards }; //make copy
          removed.cardIds.forEach((cid) => delete newCards[cid]); //hr card jo column kay under hai us ki ID lay kr us ko remove kr dena
          return { columns: rest, cards: newCards };
        }),
      addCard: (colId, title, description) =>
        set((state) => {
          const id = `card-${nanoid(6)}`; //generate unique id of 6 characters
          const card = {
            id,
            title: title,
            description: description,
          };
          const col = state.columns[colId]; //target column ko nikalna
          if (!col) return {}; //agr column nhi exist kerta to kuch nhi kerna
          return {
            cards: { ...state.cards, [id]: card }, // pehle wali cards copy karke, naya card add karna
            columns: {
              ...state.columns,
              [colId]: { ...col, cardIds: [...col.cardIds, id] }, // pehle wali columns copy karke, specific column me card ka id add karna
            },
          };
        }),

      removeCard: (colId, cardId) =>
        set((state) => {
          const col = state.columns[colId]; //find col jis may card hai
          if (!col) return {}; //agr column exist nhi kerta to kuch nhi kerna
          const cardIds = col.cardIds.filter((id) => id !== cardId); //columns kau under card ki list may say card ko remove kr do
          const cards = { ...state.cards }; //make card copy
          delete cards[cardId]; //del cards
          return {
            columns: { ...state.columns, [colId]: { ...col, cardIds } }, //new state return ho gi
            cards,
          };
        }),
      moveCard: ({ fromColId, toColId, cardId, toIndex }) =>
        set((state) => {
          if (!state.columns[fromColId] || !state.columns[toColId]) return {}; //Agar source ya destination column hi exist nahi karta, to kuch mat karo → empty object return kar do.
          if (fromColId === toColId) {
            //within column card ka order chnage kerna hai
            const ids = [...state.columns[fromColId].cardIds]; //card copy banae
            const oldIndex = ids.indexOf(cardId); //identify card on which position
            if (oldIndex === -1) return {}; //agr card nhi mil raha to kuch nhi kerna
            const newIds = arrayMove(ids, oldIndex, toIndex); //arraymove helper function jo card ki jaga change kernay may help kry ga
            return {
              //cards same column may update ho gaye
              columns: {
                ...state.columns,
                [fromColId]: { ...state.columns[fromColId], cardIds: newIds },
              },
            };
          } else {
            //agr card 1 column say dosray may jaa rahay use filter taakay source column say card nikaal day
            const fromIds = [...state.columns[fromColId].cardIds].filter(
              (id) => id !== cardId
            );
            const toIds = [...state.columns[toColId].cardIds]; // Destination column ke cardIds nikale,

            toIds.splice(toIndex, 0, cardId); //splice se naye index par card insert kar diya.
            return {
              columns: {
                ...state.columns,
                [fromColId]: { ...state.columns[fromColId], cardIds: fromIds }, //Source aur destination dono columns ko update kar diya.
                [toColId]: { ...state.columns[toColId], cardIds: toIds }, //Ab card nikal gaya purane column se aur aa gaya naye column me, sahi jagah par.
              },
            };
          }
        }),

      moveCardToColumn: (
        cardId,
        newColId //card ko direct ek column se nikal kar dosray column me dalna (empty column me bhi chalega)
      ) =>
        set((state) => {
          // purane column se remove karo
          const updatedCols = Object.fromEntries(
            Object.entries(state.columns).map(([id, col]) => [
              id,
              { ...col, cardIds: col.cardIds.filter((cid) => cid !== cardId) },
            ])
          );

          // new column exist nahi karta to kuch nahi karna
          if (!updatedCols[newColId]) return {};

          // nayi column me card push karo
          updatedCols[newColId] = {
            ...updatedCols[newColId],
            cardIds: [...updatedCols[newColId].cardIds, cardId],
          };

          return { columns: updatedCols };
        }),

      updateColumnTitle: (colId, newTitle) =>
        set((state) => {
          if (!state.columns[colId]) return {};
          return {
            columns: {
              ...state.columns,
              [colId]: { ...state.columns[colId], title: newTitle },
            },
          };
        }),

      updateCard: (cardId, newTitle, newDesc) =>
        set((state) => {
          if (!state.cards[cardId]) return state;
          return {
            cards: {
              ...state.cards,
              [cardId]: {
                ...state.cards[cardId],
                title: newTitle ?? state.cards[cardId].title,
                description: newDesc ?? state.cards[cardId].description,
              },
            },
          };
        }),
    }),
    {
      name: "Jira Board",
      getStorage: () => localStorage, //use is optional
    }
  )
);
