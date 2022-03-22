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
  <div class="grid-container" style="overflow: auto; height: 624px; top: 3vh">
    <div style="text-align: left; font-size: 10px; width: 408px">
      <img
        v-bind:src="image_choose"
        style='{{
        "z-index: 100;border-radius: 5px; margin-left: calc((100% - 256px)/2);" +
          image_choose ===
        ""
          ? ""
          : "width: 256px; height: 256px;" 
      }}'
        id="image"
      />
      <label v-for="(machine, index) in machines" style="text-align: left">
        <a
          class="btn btn-light"
          data-toggle="collapse"
          :href="'#collapse' + index"
          role="button"
          aria-expanded="false"
          :aria-controls="'collapse' + index"
          style="width: 400px"
          v-on:click="
            image_choose = require(`./assets/machine_icon/${machine.name}.png`)
          "
        >
          {{ machine.name }}
        </a>
        <div class="collapse" :id="'collapse' + index" style="width: 400px">
          <div class="card card-body">
            <label style="cursor: pointer">
              {{ machine.feature }}
            </label>
            <!-- ==============Arduino content============ -->
            <label v-if="machine.name === 'Arduino'" style="margin-left: 10px">
              <label
                style="cursor: pointer"
                class="btn btn-light btn-sm btn-block"
                v-on:click="open_analog = !open_analog"
              >
                Toogle Analog
              </label>
              <hr />
              <table class="table table-striped table-sm" v-if="open_analog">
                <thead>
                  <tr>
                    <th scope="col">Analog Pin</th>
                    <th scope="col">Busy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pin, _index) in machine.pins.Analog">
                    <td>{{ _index }}</td>
                    <td>{{ pin }}</td>
                  </tr>
                </tbody>
              </table>
              <label
                style="cursor: pointer"
                class="btn btn-light btn-sm btn-block"
                v-on:click="open_digital = !open_digital"
              >
                Toogle Digital
              </label>
              <table class="table table-striped table-sm" v-if="open_digital">
                <thead>
                  <tr>
                    <th scope="col">Digital Pin</th>
                    <th scope="col">Busy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pin, _index) in machine.pins.Digital">
                    <td>{{ _index }}</td>
                    <td>{{ pin }}</td>
                  </tr>
                </tbody>
              </table>
            </label>

            <!-- ========================== -->
            <label v-if="machine.name !== 'Arduino'" style="margin-left: 10px">
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Digital Pin</th>
                    <th scope="col">Busy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(val, key) in machine.pins">
                    <td>{{ key }}</td>
                    <td>{{ val }}</td>
                  </tr>
                </tbody>
              </table>
            </label>
          </div>
        </div>
      </label>
    </div>
    <div
      style="
        text-align: center;
        border-radius: 5px;
        word-wrap: break-word;
        width: 100%;
        font-size: 15px;
      "
    >
      <br />
      <!--
      <hr />

      <div v-show="isShow" id="chart">con</div>
     
      <img
        v-bind:src="image_choose"
        style='{{
        "z-index: 100;border-radius: 5px;margin-top: 50px;" + 
        image_choose === ""
          ? ""
          : "width: 256px; height: 256px;"
      }}'
        id="image"
      />
      -->
      <div id="appoke"></div>
      <label v-if="name_choose" style="margin-left: 10px; color: white"
        >Name: {{ name_choose }}</label
      >
      <label v-if="classes_choose" style="margin-left: 10px; color: white"
        >Classes: {{ classes_choose }}</label
      >
    </div>
  </div>

  <div id="toast">
    <div id="desc">{{ toast }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent, ref, reactive } from "vue";
import App from "./graphVue.vue";
import { createApp } from "vue";
import VueBlocksTree from "vue3-blocks-tree";
import "vue3-blocks-tree/dist/vue3-blocks-tree.css";

let defaultoptions = { treeName: "blocks-tree" };

export default {
  name: "machine",
  inject: [],
  data() {
    return {
      // hi: Battery,
      //====================
      image_choose: "",
      selected: "",
      base_api: "http://create-model.envgame.online",
      isShow: false,
      open_analog: true,
      open_digital: false,
      machines: [
        {
          name: "Arduino",
          power: 5,
          feature: "Controller",
          pins: {
            Analog: Array.from({ length: 6 }, (_, i) => 0),
            Digital: Array.from({ length: 15 }, (_, i) => 0),
            Gnd: 0,
            Vcc: 0,
          },
        },
        {
          name: "Sensor",
          power: 5,
          feature: "Humidity detection",
          pins: {
            Analog: [0],
            Digital: [0],
            Gnd: 0,
            Vcc: 0,
          },
        },
        {
          name: "Relay",
          power: 5,
          power_equipment: 220,
          feature: "Relay",
          pins: {
            Digital: [0],
            Gnd: 0,
            Vcc: 0,
            Gnd_equipment: 0, // 1
            Vcc_equipment: 0, // 1
          },
        },
        {
          name: "Equipment",
          power: 220,
          feature: "Watering machine",
          pins: {
            Gnd: 0,
            Vcc: 0,
          },
        },
        {
          name: "Battery",
          power: 5,
          feature: "Power",
          pins: {
            Gnd: 0,
            Vcc: 0,
          },
        },
      ],
    };
  },
  methods: {
    update_machine: function (index, pin_value, input_value) {
      this.machines[0].pins[pin_value][input_value] = 1;
      console.log(this.machines);
    },
  },
  mounted() {
    createApp(App).use(VueBlocksTree, defaultoptions).mount("#appoke");
  },
};
</script>

<style>
.grid-container {
  position: fixed;
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
  top: 0vh;
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
  z-index: 201;
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
