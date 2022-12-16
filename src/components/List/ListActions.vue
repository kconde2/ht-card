<template>
  <div class="actions" :class="{ disabled: this.selectedlistItem === null }">
    <a href="#" @click.prevent="copyReference">Reference</a>
    <a href="#" @click.prevent="copy">Copy</a>
    <a href="#" @click.prevent="move">Move</a>
    <a href="#" @click.prevent="removeSelectedListItem()">Delete</a>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useListStore } from "../../stores/list";
import { moveListMapping } from "../../helpers/moveListMapping";
export default {
  computed: {
    ...mapState(useListStore, [
      "canMove",
      "selectedlistItem",
      "removeSelectedListItem",
      "copySelectedListItem",
      "moveSelectedListItem",
      "copyReferenceSelectedListItem",
    ]),
  },
  methods: {
    addCheck(newListId) {
      if (!this.canMove(newListId)) {
        alert("Maximum 6 elements reached");
        return;
      }
    },
    copy() {
      const newListId = this.selectedlistItem.listId;

      this.addCheck(newListId);
      this.addCheck();
      this.copySelectedListItem();
    },
    copyReference() {
      const newListId = this.selectedlistItem.listId;

      this.addCheck(newListId);
      this.addCheck();
      this.copyReferenceSelectedListItem();
    },
    move() {
      const newListId = moveListMapping[this.selectedlistItem.listId];

      this.addCheck(newListId);
      this.moveSelectedListItem();
    },
  },
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 5px;
  margin-bottom: 10px;
  margin: 10px auto;

  a {
    margin-left: 5px;
    padding: 0 5px;
  }

  &.disabled {
    a {
      color: grey;
      pointer-events: none;
    }
  }
}
</style>
