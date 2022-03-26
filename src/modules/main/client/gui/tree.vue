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
      background: rgb(119, 130, 171);
      opacity: 0.5;
    "
  ></div>
  <div class="grid-container">
    <div>
      <img
        v-bind:src="image"
        style="z-index: 100; border-radius: 5px; top: 40vh"
        id="image"
      />
    </div>
    <div style="text-align: center; border-radius: 5px; word-wrap: break-word">
      <p style="margin-left: 10px; color: white">{{ name }}</p>
      <hr />
      <div class="form-group">
        <select
          class="form-control"
          id="exampleFormControlSelect1"
          v-model="selected"
        >
          <option disabled value="">Select classes</option>
          <option v-for="classl in allClasses">{{ classl }}</option>
        </select>
      </div>
      <hr />
      <button
        className="btn btn-light btn-lg btn-block"
        style="margin-top: 5px, margin-left: 5px"
        v-on:click="post_data"
      >
        Add to your dataset
      </button>
    </div>
  </div>
  <h2>Toast</h2>
  <p>
    Click on the button to show the Toast. It will disappear after 5 seconds.
  </p>

  <button onclick="launch_toast()">Show Toast</button>

  <div id="toast">
    <div id="desc">{{ toast }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tree",
  data() {
    return {
      selected: "",
      base_api: "http://create-model.envgame.online//",
      image: "",
      name: "",
      toast: "Loading...",
      classes: "",
      allClasses: ["loading..."],
      receiveMessage(e) {},
      random_int(a, b) {
        return Math.floor(Math.random() * b) + a;
      },
    };
  },
  methods: {
    get_data: function () {
      axios
        .get(`${this.base_api}/showLeafDataFes/addData`)
        .then((response) => {
          let { data } = response;
          this.image = this.base_api + data.url;
          this.name = data.name;
          const classes_uppper =
            data.classes.charAt(0).toUpperCase() + data.classes.slice(1);
          console.log(data);
          this.classes = classes_uppper;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    post_data: function () {
      if (this.selected !== "")
        axios
          .get(
            `${this.base_api}/pushDataFes/?url=${this.image.replace(
              " ",
              "%20"
            )}&name=${"00___USER_DATA___00" + this.name}&classes=${
              this.selected
            }`
          )
          .then((response) => {
            console.log(response);
            var x = document.getElementById("toast");
            x.className = "show";
            this.toast = `Add image to ${this.selected} classes`;
            setTimeout(function () {
              x.className = x.className.replace("show", "");
            }, 3000);
            this.get_data();
          })
          .catch((e) => {
            console.log(e);
          });
      else {
        var x = document.getElementById("toast");
        x.className = "show";
        this.toast = "Please choose classes!";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 3000);
      }
    },
    get_classes: function () {
      axios
        .get(`${this.base_api}/getAllClasses/exampleData`)
        .then((response) => {
          console.log(response.data.classes);
          this.allClasses = response.data.classes;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    get_folder_structer: function () {
      axios
        .get(`${this.base_api}/getAllClasses/exampleData`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.get_data();
    this.get_classes();
  },
  //   beforeDestroy() {
  //     window.removeEventListener("message", this.receiveMessage);
  //   },
  computed: {
    width() {
      return (this.hp / this.maxHp) * 100 + "%";
    },
  },
};
</script>

<style>
.grid-container {
  position: fixed;
  top: 47vh;
  z-index: 100;
  width: 812px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 5px;
  background-color: rgb(4, 104, 174, 0.6);
  border: 3.5px white solid;
}

.grid-container > div {
  text-align: center;
  border-radius: 5px;
  font-size: 20px;
}

.POST-btn {
}
#toast {
  z-index: 201;
  visibility: hidden;
  max-width: 50px;
  height: 50px;
  /*margin-left: -125px;*/
  margin: auto;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;

  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 30px;
  font-size: 17px;
  white-space: nowrap;
}
#toast #img {
  width: 50px;
  height: 50px;

  float: left;

  padding-top: 16px;
  padding-bottom: 16px;

  box-sizing: border-box;

  background-color: #111;
  color: #fff;
}
#toast #desc {
  color: #fff;

  padding: 16px;

  overflow: hidden;
  white-space: nowrap;
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 2s,
    fadeout 0.5s 2.5s;
  animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 4s,
    fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 550px;
  }
}

@keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 550px;
  }
}
@-webkit-keyframes stay {
  from {
    min-width: 550px;
  }
  to {
    min-width: 550px;
  }
}

@keyframes stay {
  from {
    min-width: 550px;
  }
  to {
    min-width: 550px;
  }
}
@-webkit-keyframes shrink {
  from {
    min-width: 550px;
  }
  to {
    min-width: 50px;
  }
}

@keyframes shrink {
  from {
    min-width: 550px;
  }
  to {
    min-width: 50px;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}
</style>
