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
    src="https://envgame-cropper.netlify.app/"
    height="500px"
    width="800px"
    name="frame-id"
  ></iframe>
  <div id="toast" style="background: white; color: black">
    <div id="desc" style="background: white; color: black">{{ toast }}</div>
  </div>
</template>

<script>
export default {
  name: "farm",
  inject: [
    "rpgCurrentPlayer",
    "rpgKeypress",
    "rpgGuiClose",
    "rpgSocket",
    "rpgEngine",
    "rpgGui",
  ],
  data() {
    return {
      accuracy_condition: 0.85,
      prediction_count_condition: 1,
      toast: "",
      prediction_count: 0,
      stage_over: false,
      farm_val_state: "",
      receiveMessage(e) {},
      close() {
        this.rpgGuiClose("farm", {
          amount: 1000,
        });
      },
    };
  },
  methods: {
    show_toast: function (text, time) {
      var x = document.getElementById("toast");
      x.className = "show";
      this.toast = text;
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, time);
    },
  },
  props: ["farm_val"],
  mounted() {
    let farm_val_state = this.farm_val;
    window.addEventListener(
      "message",
      (e) => {
        console.log(e.data);
        if (e.data.isLeaf && e.data.accuracy >= this.accuracy_condition) {
          this.prediction_count++;
          this.show_toast(
            `Good cropper image, let find another leaf disease!`,
            3000
          );
        } else {
          this.show_toast(
            `Your copper image is not leaf or the probability under ${Math.round(
              this.accuracy_condition * 100
            )}%!`,
            3000
          );
        }
        if (this.prediction_count >= this.prediction_count_condition)
          this.rpgSocket().emit("gui.stage4", "gui -> index.ts");
      },
      false
    );

    // var frame = window.frames["GUI_frame"],
    //   data = { call: "sendValue" };
    // frame.contentWindow.postMessage(data, "*");
    // console.log("PARENT_LOG: parent send to chill, data send:", data);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.receiveMessage);
  },
  computed: {
    width() {
      return (this.hp / this.maxHp) * 100 + "%";
    },
  },
};
</script>
