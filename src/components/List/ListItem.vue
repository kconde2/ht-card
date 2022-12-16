<template>
  <article>
    <input type="color" class="color" :value="listItem.color" />
    <a class="delete-action" href="#">x</a>
  </article>
</template>

<script>
export default {
  props: {
    listItem: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  height: 50px;
  padding: 2px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  border-radius: 5px;

  > * {
    width: 30px;
    height: 30px;
  }

  input {
    background: white;
    border: none;
    border-color: transparent;
  }

  .color {
    flex: 1;
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
