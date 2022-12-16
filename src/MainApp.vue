<script>
import ListView from "./components/List/ListView.vue";
import ListActions from "./components/List/ListActions.vue";

export default {
  components: {
    ListView,
    ListActions,
  },
};
</script>

<template>
  <div id="app">
    <list-actions></list-actions>
    <div id="list">
      <list-view :list-id="1" title="List 1"></list-view>
      <list-view :list-id="2"></list-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;

  #list {
    display: flex;
  }
}

@media (max-width: 1024px) {
  #list {
    flex-direction: column;
    align-items: center;
  }
}
</style>
