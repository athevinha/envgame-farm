<template>
  <!--
  <div class="health-bar">
    <p>{{ hp }} / {{ maxHp }}</p>
    <div class="bar">
      <div class="inner-bar" :style="{ width }"></div>
    </div>
  </div>
  -->
  <div
    id="GUI_black"
    style="
      position: fixed;
      width: 816px;
      height: 624px;
      z-index: 50;
      background: #7782ab;
      opacity: 0.5;
    "
  ></div>
  <iframe
    style="
      position: fixed;
      z-index: 100;
      border: 2.5px white solid;
      border-radius: 10px;
      margin-left: 5px;
      top: 16vh;
    "
    id="GUI_frame"
    src="https://create-model.envgame.online/"
    height="500px"
    width="800px"
    name="frame-id"
  ></iframe>
</template>

<script>
export default {
  name: "rem",
  inject: ["rpgCurrentPlayer"],
  data() {
    return {
      hp: 0,
      maxHp: 0,
    };
  },
  mounted() {
    this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
      this.hp = object.hp;
      this.maxHp = object.param.maxHp;
    });
  },
  computed: {
    width() {
      return (this.hp / this.maxHp) * 100 + "%";
    },
  },
  unmounted() {
    this.obsCurrentPlayer.unsubscribe();
  },
};
</script>

<style></style>
