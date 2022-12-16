import { defineStore } from "pinia";
import uuidv4 from "../helpers/generateUuidv4";

export const useListStore = defineStore({
  id: "listStore",
  state: () => ({
    counter: 0,
    list1: [],
    list2: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    listItems: (state) => (listId) => listId === 1 ? state.list1 : state.list2,
  },
  actions: {
    addListItem(listId, color) {
      if (listId === 1) {
        this.list1.push({ id: uuidv4(), color: color });
      } else {
        this.list2.push({ id: uuidv4(), color: color });
      }
    },
  },
});
