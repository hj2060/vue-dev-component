<template>
  <div class="zoe-column-wrapper" ref="column">
    <ul class="zoe-picker-column">
      <slot></slot>
    </ul>
  </div>
  
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'picker-column',
  props: {
    value: {
      type: Number,
      default: 0
    },
    item: Array
  },
  watch: {
    value: {
      handler(v) {
        this.scroll.wheelTo(v)
      }
    },
    item: {
      immediate: true,
      handler(v) {
        if (this.scroll) {
          this.scroll.refresh()
        } else {
          this.init()
        }
      }
    }
  },
  direact(index) {
    this.scroll.wheelTo(index)
  },
  methods: {
    refresh() {
      if (this.scroll) {
        this.scroll.refresh()
      }
    },
    init() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.column, {
          deceleration: 0.002,
          wheel: {
            selectedIndex: 0,
            rotate: 15,
            adjustTime: 400,
            wheelWrapperClass: 'zoe-picker-column',
            wheelItemClass: 'zoe-picker-item'
          }
        })
        this.scroll.on('scrollEnd', e => {
          const y = Math.abs(e.y)
          const offset = Math.round(y / 40, 10)
          this.$emit('change', offset)
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import './variable';
  .zoe-column-wrapper{
    height:100%;
    overflow: hidden;
    flex: 1;
    padding-top: 105px;
  }
  .zoe-picker-column{
    text-align: center;
    margin:0;
    padding:0;
    list-style: none;
    // padding:105px 0;
  }
  .zoe-picker-item{
    font-size: 20px;
    color:$text;
    line-height: 40px;
    height:40px;
    @include st(1);
  }
</style>
