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
    src="https://envgame-fes.netlify.app/ai"
    height="500px"
    width="800px"
    name="frame-id"
  ></iframe>
</template>

<script>
import testdata from "./test_leaf_disease.json";
export default {
  name: "farm",
  inject: ["rpgCurrentPlayer", "rpgGuiClose"],
  data() {
    return {
      hp: 0,
      maxHp: 0,
      testdata: testdata,
      receiveMessage(e) {
        console.log(e.data.prediction);
        // console.log(testdata["one"]);
        // close();
      },
      close() {
        console.log("ád");
        this.rpgGuiClose("farm", {
          amount: 1000,
        });
      },
    };
  },
  mounted() {
    console.log(testdata[localStorage.farm + "_farm"]);
    var frame = window.frames["GUI_frame"];
    frame.contentWindow.postMessage(
      { call: "sendValue", farm: testdata[localStorage.farm + "_farm"] },
      "*"
    );
    // console.log(this.ramdom_testdata("one"));
    // frame.contentWindow.postMessage("hi", "*");
    // frame.yourMethod("hello");
    window.addEventListener("message", this.receiveMessage, false);
    this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
      this.hp = object.hp;
      this.maxHp = object.param.maxHp;
    });
  },
  //   beforeDestroy() {
  //     window.removeEventListener("message", this.receiveMessage);
  //   },
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

<style>
template {
  margin: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
