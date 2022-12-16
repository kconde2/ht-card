<template>
  <div class="input-form">
    <input type="text" v-model="color" @keyup.enter="add()" />
    <a title="Ajouter un élément à la liste" @click="add()">
      <a class="plus">+</a></a
    >
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useListStore } from "../../stores/list";

export default {
  data() {
    return {
      color: "",
    };
  },
  props: {
    listId: {
      type: Number,
      require: true,
    },
  },
  computed: {
    ...mapState(useListStore, ["countList"]),
  },
  methods: {
    ...mapActions(useListStore, ["addItem"]),
    add() {
      if (!this.isValidColor()) {
        alert(`"${this.color}" Invalid color (texte or hexadecimal)`);
        this.color = "";
        return;
      }

      if (this.countList(this.listId) === 6) {
        alert("Maximum items size reached : 6");
        return;
      }

      const rgba = this.colorValues(this.color);

      this.addItem(
        this.listId,
        this.rgbaToHex(`rgba(${rgba[0]},${rgba[1]}, ${rgba[2]}, ${rgba[3]})`)
      );
      this.color = "";
    },
    isValidColor() {
      return CSS.supports("color", this.color);
    },
    /**
     * Convert any color string to an [r,g,b,a] array.
     * @param {string} color Any color. F.e.: 'red', '#f0f', '#ff00ff', 'rgb(x,y,x)', 'rgba(r,g,b,a)', 'hsl(180, 50%, 50%)'
     * @returns {array} [r,g,b,a] array. Caution: returns [0,0,0,0] for invalid color.
     */
    colorValues(color) {
      const div = document.createElement("div");
      div.style.backgroundColor = color;
      document.body.appendChild(div);
      let rgba = getComputedStyle(div).getPropertyValue("background-color");
      div.remove();

      if (rgba.indexOf("rgba") === -1) {
        rgba += ",1"; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
      }

      return rgba.match(/[.\d]+/g).map((a) => {
        return +a;
      });
    },
    rgbaToHex(rgba) {
      // Extract the values for red, green, blue, and alpha from the rgba string
      const values = rgba.match(/\d+/g);
      const r = parseInt(values[0], 10);
      const g = parseInt(values[1], 10);
      const b = parseInt(values[2], 10);
      // const a = parseFloat(values[3], 10);

      // Convert the red, green, and blue values to hexadecimal strings
      const hexR = r.toString(16).padStart(2, "0");
      const hexG = g.toString(16).padStart(2, "0");
      const hexB = b.toString(16).padStart(2, "0");

      // Return the hexadecimal string in the format '#RRGGBB'
      return `#${hexR}${hexG}${hexB}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-form {
  display: flex;
  justify-content: center;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 2px 0 2px 2px;
  background: #202123;
  margin-bottom: 10px;

  > * {
    height: 30px;
  }

  input {
    flex: 1;
    padding: 0;
    margin: 0;
    border: 0;
  }

  a {
    display: flex;
    width: 50px;
    justify-content: center;
    margin-left: auto;
    color: white;
    .plus {
      line-height: 1.8;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
