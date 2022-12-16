import { defineStore } from "pinia";
import uuidv4 from "../helpers/generateUuidv4";
import { moveListMapping } from "../helpers/moveListMapping";

export const useListStore = defineStore({
  id: "listStore",
  state: () => ({
    list1: [],
    list2: [],
    selectedlistItem: null,
  }),
  getters: {
    listItems: (state) => (listId) => listId === 1 ? state.list1 : state.list2,
    countList: (state) => (listId) =>
      listId === 1 ? state.list1.length : state.list2.length,
    canMove: (state) => (listId) => {
      const count = listId === 1 ? state.list1.length : state.list2.length;

      return count < 6;
    },
  },
  actions: {
    addItem(listId, color) {
      this.addListItem({ listId, item: { id: uuidv4(), color } });
    },
    addListItem(item) {
      if (item.listId === 1) {
        this.list1.push(item);
      } else if (item.listId === 2) {
        this.list2.push(item);
      }
    },
    removelistItem(listItem) {
      if (
        this.selectedlistItem !== null &&
        this.selectedlistItem.item.id === listItem.item.id
      ) {
        this.selectedlistItem = null;
      }

      if (listItem.listId === 1) {
        this.list1 = this.list1.filter((i) => i.item.id !== listItem.item.id);
      } else if (listItem.listId === 2) {
        this.list2 = this.list2.filter((i) => i.item.id !== listItem.item.id);
      }
    },
    toggleSelectedlistItem(listItem) {
      if (
        this.selectedlistItem &&
        listItem.item.id === this.selectedlistItem.item.id
      ) {
        this.selectedlistItem = null;
      } else {
        this.selectedlistItem = listItem;
      }
    },
    removeSelectedListItem() {
      if (this.selectedlistItem) {
        this.removelistItem(this.selectedlistItem);
      }
    },
    moveSelectedListItem() {
      if (this.selectedlistItem) {
        const newListId = moveListMapping[this.selectedlistItem.listId];

        if (this.canMove(newListId)) {
          this.addListItem({ ...this.selectedlistItem, listId: newListId });
          this.removelistItem(this.selectedlistItem);
        }
      }
    },
    copySelectedListItem() {
      if (this.selectedlistItem) {
        const newListId = this.selectedlistItem.listId;

        if (this.canMove(newListId)) {
          this.addListItem({
            item: { id: uuidv4(), color: this.selectedlistItem.item.color },
            listId: newListId,
          });
        }
      }
    },
    copyReferenceSelectedListItem() {
      if (this.selectedlistItem) {
        const newListId = this.selectedlistItem.listId;

        if (this.canMove(newListId)) {
          this.addListItem({ ...this.selectedlistItem, listId: newListId });
        }
      }
    },
  },
});
