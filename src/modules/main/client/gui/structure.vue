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
      <br />
      <label
        v-for="(datasetStructer, index) in datasetStructers.slice(1)"
        style="text-align: left"
      >
        <a
          class="btn btn-light"
          data-toggle="collapse"
          :href="'#collapse' + index"
          role="button"
          aria-expanded="false"
          :aria-controls="'collapse' + index"
          style="width: 400px"
        >
          {{ datasetStructer.classes.replace("static/exampleData/", "") }}
        </a>
        <div class="collapse" :id="'collapse' + index" style="width: 400px">
          <div class="card card-body">
            <label
              style="cursor: pointer"
              :style="
                name_choose == file
                  ? 'background:#F5F5F5;boder-radius: 5px'
                  : null
              "
              v-for="(file, index_2) in datasetStructer.files.slice(0, more)"
              v-on:click="
                this.selected = [];
                this.image_choose =
                  base_api + '/' + datasetStructer.classes + '/' + file;
                name_choose = file;
                classes_choose = datasetStructer.classes.replace(
                  'static/exampleData/',
                  ''
                );
              "
            >
              {{ file }}
            </label>
            <label>
              <label style="cursor: pointer" v-on:click="more += 5"
                >... {{ datasetStructer.files.length - more }} more</label
              ><br />
              <input
                type="file"
                @change="
                  upload_image(
                    $event,
                    datasetStructer.classes.replace('static/exampleData/', '')
                  )
                "
              />
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
        width: 380px;
        font-size: 15px;
      "
    >
      <hr />
      <a
        className="btn btn-success btn-block"
        style="margin-top: 5px, margin-left: 5px"
        v-bind:href="base_api + '/downloadDataFes/exampleData'"
        v-on:click="download_dataset"
      >
        Download dataset
      </a>
      <button
        className="btn btn-primary btn-block"
        style="margin-top: 5px, margin-left: 5px"
        @click="isShow = !isShow"
      >
        Toogle visualization
      </button>
      <div v-show="isShow" id="chart"></div>
      <hr />
      <iframe
        v-bind:src="this.image_choose + '?cache=' + Math.Random()"
        frameborder="0"
        scrolling="no"
        style='{{
        "z-index: 100;border-radius: 5px; margin-left:80px;" + 
        this.image_choose === ""
          ? ""
          : "width: 256px; height: 224px;"
      }}'
        id="image"
      />
      <label v-if="classes_choose" style="margin-left: 10px; color: white"
        >Classes: {{ classes_choose }}</label
      >

      <div id="option">
        <label class="form-checkbox">
          <input type="checkbox" v-model="selectAll" @click="select" />
          <label>All</label>
        </label>

        <label v-for="i in items">
          <label class="form-checkbox">
            <input
              type="checkbox"
              style="margin-left: 10px"
              :value="i.aug"
              v-model="selected"
              @change="aug_image"
            />
            <i class="form-icon"></i>
          </label>
          <label>{{ i.name }}</label>
        </label>
      </div>
    </div>
  </div>
  <div id="toast">
    <div id="desc">{{ toast }}</div>
  </div>
</template>

<script>
import axios from "axios";
import ApexCharts from "apexcharts";
export default {
  name: "structure",
  data() {
    return {
      values: [],
      base_api: "http://create-model.envgame.online",
      image_choose: "",
      classes_choose: "",
      name_choose: "",
      toast: "Loading...",
      name: "",
      classes: "",
      allClasses: ["loading..."],
      more: 5,
      datasetStructers: [],
      isShow: false,
      options: {
        series: [],
        chart: {
          width: 400,
          type: "pie",
        },
        labels: [],
        legend: {
          position: "bottom",
        },
      },
      items: [
        {
          name: "Random Gamma",
          aug: "g",
        },
        {
          name: "Random Brightness",
          aug: "b",
        },
        {
          name: "Random Contrast",
          aug: "c",
        },
        {
          name: "Random Rotation",
          aug: "r",
        },
      ],
      selected: [],

      random_int(a, b) {
        return Math.floor(Math.random() * b) + a;
      },
    };
  },
  methods: {
    dataset_structer: function () {
      axios
        .get(`${this.base_api}/showDatasStructureFes/exampleData`)
        .then((response) => {
          this.datasetStructers = response.data.data;
          this.render_pie();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    download_dataset: function () {
      var x = document.getElementById("toast");
      x.className = "show";
      this.toast = "On export & donwload dataset...";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 8000);
    },
    upload_image: function (e, classes) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("classes", classes);
      axios
        .post(`${this.base_api}/pushImageFES`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.toast = response.data;
          var x = document.getElementById("toast");
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 4000);
          this.dataset_structer();
          // this.datasetStructers = response.data.data;
          // console.log(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    render_pie: function () {
      this.options.labels = this.datasetStructers.map((item, id) =>
        item.classes.replace("static/exampleData/", "")
      );
      this.options.labels.shift();
      this.options.series = this.datasetStructers.map(
        (item, id) => item.files.length
      );
      this.options.series.shift();
      var chart = new ApexCharts(
        document.querySelector("#chart"),
        this.options
      );
      chart.render();
    },
    aug_image: function () {
      console.log(this.image_choose, "sfsdfs");
      if (this.image_choose !== "") {
        let refesh = this.image_choose;
        this.image_choose =
          "https://a.wattpad.com/useravatar/golden-shit.256.946250.jpg";
        let augs = "";
        this.selected.map((aug, _) => {
          augs += aug + ",";
        });
        axios
          .get(
            `${this.base_api}/augDataFes/?aug=${augs}&name=${this.name_choose}&classes=${this.classes_choose}`
          )
          .then((res) => {
            this.image_choose = refesh;
            console.log(res.data);
          });
      }
    },
    select: function () {
      this.aug_image();
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].aug);
        }
      }
    },
  },
  mounted() {
    this.dataset_structer();
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
