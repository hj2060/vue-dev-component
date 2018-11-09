<template>
  <svg version="1.1" class="ui-icon" :style="{width:size + 'px', height: size + 'px'}" :class="classNames" :viewBox="box" @click="$emit('click')">
    <path :d="item" v-for="(item, index) of icon.d" />
  </svg>
</template>

<script>
import icons from './svg/output.json'
export default {
  name: 'Icon',
  props: {
    size: {
      type: [String, Number],
      default: 20
    },
    name: {
      type: String,
      required: true,
      validator(val) {
        return val in icons
      }
    },
    flip: {
      type: String,
      validator(val) {
        return val === 'horizontal' || val === 'vertical'
      }
    }
  },
  computed: {
      icon() {
        return icons[this.name]
      },
      classNames() {
        return {
          'ui-icon--flipToVertical': this.flip === 'vertical',
          'ui-icon--flipToHorizontal': this.flip === 'horizontal'
        }
      },
      box: function () {
        return `0 0 ${this.icon.width} ${this.icon.height}`
      }
  },
  add(data) {
    for(let key of Object.keys(data)) {
      icons[key] = data[key]
    }
  },
  remove(key) {
    delete icons[key]
  }
}
</script>

<style>
.ui-icon {
    display: inline-block;
    fill: currentColor;
}
.ui-icon--flipToHorizontal {
    transform: scale(-1, 1);
}
.ui-icon--flipToVertical {
    transform: scale(1, -1);
}
</style>
