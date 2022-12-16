<template>
  <section class="todo-list">
    <list-item-input :list-id="listId"></list-item-input>
    <div
      class="list-items"
      v-for="listItem in listItems(listId)"
      :key="listItem.id"
    >
      <list-item :list-item="listItem"></list-item>
    </div>
  </section>
</template>

<script>
import ListItemInput from "./ListItemInput.vue";
import ListItem from "./ListItem.vue";
import { mapState } from "pinia";
import { useListStore } from "../../stores/list";

export default {
  components: { ListItemInput, ListItem },
  computed: {
    ...mapState(useListStore, ["listItems"]),
  },
  props: {
    listId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #eee;
  min-width: 320px;
  width: 400px;
  margin: 0 10px;
  padding: 10px;
  min-height: 500px;
  border-radius: 5px;
}
</style>
