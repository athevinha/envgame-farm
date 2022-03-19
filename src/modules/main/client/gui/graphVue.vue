<template>
  <div>
    <blocks-tree
      :data="treeData"
      :horizontal="treeOrientation == '1'"
      :collapsable="true"
    >
      <template #node="{ data, context }">
        <span>
          <input
            type="checkbox"
            :checked="selected.indexOf(data.some_id) > -1"
            @change="(e) => toggleSelect(data, e.target.checked)"
          />
          {{ data.label }}
        </span>
        <br />
        <span v-if="data.children && data.children.length"> </span>
      </template>
    </blocks-tree>
    <div>
      <div class="input-group mb-3">
        <input
          class="form-control btn-block"
          v-model="inputLeafId"
          type="number"
          placeholder="Id..."
        />
        <div class="input-group-append">
          <button
            class="input-group-text"
            @click="tryAddLeaf(inputLeafId, treeData, inputLeafPin)"
          >
            +
          </button>
        </div>
      </div>

      <input
        class="form-control"
        placeholder="Pin..."
        v-model="inputLeafPin"
        type="number"
      />
    </div>
  </div>
  <!--
  <select v-model="treeOrientation">
    <option value="0">Vertical</option>
    <option value="1">Horizontal</option>
  </select>
  -->
</template>
<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  setup() {
    let selected = ref([]);
    let treeOrientation = ref("1");
    let treeData = reactive({
      label: "Arduino",
      expand: true,
      some_id: 1,
      children: [
        {
          label: "Sensor",
          some_id: 2,
          expand: false,
          children: [
            {
              label: "Analog",
              some_id: 21,
            },
            {
              label: "Digital",
              some_id: 22,
            },
            {
              label: "Gnd",
              some_id: 23,
            },
            {
              label: "Vcc",
              some_id: 24,
            },
          ],
        },
        {
          label: "Relay",
          some_id: 3,
          expand: false,
          children: [
            {
              label: "Digital",
              some_id: 31,
            },
            {
              label: "Gnd",
              some_id: 32,
            },
            {
              label: "Vcc",
              some_id: 33,
            },
            {
              label: "Equipment",
              some_id: 34,
            },
          ],
        },
        {
          label: "Equipment",
          some_id: 4,
          expand: false,
          children: [
            {
              label: "Vcc",
              some_id: 41,
            },
            {
              label: "Gnd",
              some_id: 42,
            },
          ],
        },
        {
          label: "Battery",
          some_id: 5,
          expand: false,
          children: [
            {
              label: "Vcc",
              some_id: 51,
            },
            {
              label: "Gnd",
              some_id: 52,
            },
          ],
        },
      ],
    });

    const toggleSelect = (node, isSelected) => {
      isSelected
        ? selected.value.push(node.some_id)
        : selected.value.splice(selected.value.indexOf(node.some_id), 1);
      if (node.children && node.children.length) {
        node.children.forEach((ch) => {
          toggleSelect(ch, isSelected);
        });
      }
    };

    const tryAddLeaf = (parentId, tree, parentPin) => {
      let isParent = tree.some_id == parentId;
      if (isParent) {
        let some_id = parseInt(Math.random() * 100);
        let leaf = {
          label: `Pin ${parentPin} of ${tree.label}`,
          some_id: some_id,
        };
        if (!tree.children) {
          tree.expand = true;
          tree.children = [];
        }
        tree.children.push(leaf);
      } else if (tree.children) {
        tree.children.forEach((ch) => tryAddLeaf(parentId, ch, parentPin));
      }
    };

    return {
      treeData,
      selected,
      toggleSelect,
      treeOrientation,
      tryAddLeaf,
    };
    //   expand: false,
    //   children: [
    //     { label: "subchild 1", some_id: 5 },
    //     {
    //       label: "subchild 2",
    //       some_id: 6,
    //       expand: false,
    //       children: [
    //         { label: "subchild 11", some_id: 7 },
    //         { label: "subchild 22", some_id: 8 },
    //       ],
    //     },
    //   ],
  },
});
</script>
