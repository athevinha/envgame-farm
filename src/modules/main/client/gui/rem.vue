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
  <div
    style="
      position: fixed;
      width: 800px;
      height: 624px;
      z-index: 51;
      margin-left: 5px;
      background: rgb(119, 130, 171, 0);
      transition: 0.4s;
    "
    className="form_name_model"
  >
    <input
      placeholder="Your trained model name..."
      style="width: 100%; height: 50px"
      v-model="name_model"
    />
    <button
      className="btn btn-light btn-block"
      v-on:click="get_training_result"
    >
      Submit
    </button>
  </div>
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
    src="http://create-model.envgame.online/"
    height="500px"
    width="800px"
    name="frame-id"
  ></iframe>
  <div id="toast">
    <div id="desc">{{ toast }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "rem",
  inject: ["rpgCurrentPlayer", "rpgSocket"],
  data() {
    return {
      train_result: false,
      base_api: "http://create-model.envgame.online",
      toast: "Loading...",
      message: "",
      name_model: "",
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
    get_training_result: function () {
      axios
        .get(`${this.base_api}/getHistoryFES/${this.name_model}`)
        .then((response) => {
          let data = response.data;
          if (data.status == 200) {
            let val_accuracys = data.history.log.val_accuracy,
              val_accuracy = val_accuracys[val_accuracys.length - 1];
            if (val_accuracy >= 0.94) {
              this.train_result = true;
              this.show_toast(
                "Congratulation, your model has accuracy of over 94% in the test data!",
                3000
              );
              const socket = this.rpgSocket();
              socket.emit("gui.stage5", true);
            } else {
              this.show_toast(
                "Fail, your model has accuracy of under 94% in the test data!",
                3000
              );
            }
          } else {
            this.show_toast(
              "Collect data sets in the forest and manage data with 'data structure'!",
              3000
            );
          }
        })
        .catch((e) => {
          this.show_toast(
            "Collect data sets in the forest and manage data with 'data structure'!",
            3000
          );
          console.log(e);
        });
    },
  },
  mounted() {
    window.addEventListener(
      "message",
      (e) => {
        this.name_model = e.data;
      },
      false
    );

    this.get_training_result();
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

<style>
.form_name_model {
  opacity: 0;
}
.form_name_model:hover {
  opacity: 1;
}
</style>
