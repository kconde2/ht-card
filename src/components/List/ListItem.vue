<template>
  <article
    :class="{
      selected: this.isSelected,
    }"
  >
    <div @click="toggleSelectedlistItem(listItem)">
      <input type="color" class="color" disabled :value="listItem.item.color" />
    </div>
    <a class="delete-action" href="#" @click.prevent="remove()">x</a>
  </article>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useListStore } from "../../stores/list";

export default {
  props: {
    listItem: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapState(useListStore, ["selectedlistItem"]),
    isSelected() {
      return (
        this.selectedlistItem !== null &&
        this.selectedlistItem.item.id === this.listItem.item.id
      );
    },
  },
  methods: {
    ...mapActions(useListStore, ["removelistItem", "toggleSelectedlistItem"]),
    remove() {
      this.removelistItem(this.listItem);
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  height: 40px;
  padding: 2px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  border-radius: 5px;
  div {
    width: 100%;
  }

  &.selected {
    input {
      &[type="color"] {
        border-radius: 5px;
        padding: 0;
        border: 1px solid #202123;
      }
    }
  }

  > * {
    width: 40px;
    height: 40px;
  }

  input {
    background: white;
    border: none;
    border-color: transparent;
    padding: 2px;
    width: 100%;
    height: 100%;

    &[type="color"]::-moz-color-swatch {
      border: none;
    }

    &[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
      border-radius: 0;
    }

    &[type="color"]::-webkit-color-swatch {
      border: none;
    }
  }

  .color {
    flex: 1;
    &:hover {
      cursor: pointer;
    }
  }

  .delete-action {
    background: white;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;

    a {
      margin-left: 5px;
      padding: 0 5px;
    }
  }
}
</style>
