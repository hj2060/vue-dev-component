<template>
  <div id="app">
    <zoe-picker :options="options" type="cascade" @change="change" label="name" :render="render"></zoe-picker>
  </div>
</template>

<script>
import cities from './cities.json'
export default {
  name: 'app',
  data() {
    return {
      options: []
    }
  },
  methods: {
    change(v) {
      console.log(v)
    },
    render(h, text) {
      return <div style="color:gray">😀{text}</div>
    }
  },
  mounted() {
    const tree = cities[0]
    const keys = Object.keys(cities)
    tree.forEach(item => {
      keys.some(k => {
        if (k === item.code) {
          item.children = cities[k]
          item.children.forEach(c => {
            keys.some(k => {
              if (k === c.code) {
                c.children = cities[k]
                return true
              }
            })
          })
          return true
        }
      })
    })
    this.options = tree      
  }
}
</script>

<style lang="scss">

</style>
