<template>
  <div class="zoe-pop">
    <div class="mask"></div>
    <div class="zoe-picker">
      <header>
        <span class="tit">请选择地址</span>
        <span class="confirm">确定</span>
      </header>
      <div class="wrapper">
        <i class="mask top"></i>
        <i class="mask bottom"></i>
        <template v-if="type === 'cascade'">
          <picker-column :key="i" v-for="(item, i) in columns" @change="row => change(row, i)" :value="selected[i]" ref="column" :item="item">
            <picker-item v-for="(op, j) in item" :key="j" :text="op[label]" :render="render"></picker-item>
          </picker-column>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import pickerColumn from './picker-column'
import pickerItem from './picker-item'
export default {
  name: 'zoe-picker',
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    render: Function,
    label: String,
    type: {
      type: String,
      default: 'normal'
    }
  },
  watch: {
    options: {
      immediate: true,
      handler() {
        this.parseOptions()
      }
    }
  },
  components: {
    pickerColumn,
    pickerItem
  },
  data() {
    return {
      index: 0,
      selected: [],
      columns: []
    }
  },

  methods: {
    countColumn(options, columns = 0) {
      if (options.length) {
        columns++
      }
      const current = options.filter(o => o.children && o.children.length)
      if (current.length) {
        columns = this.countColumn(current[0].children, columns)
      }
      return columns
    },
    formateColumns(options, index = 0, columns = []) {
      if (index < this.selected.length) {
        if (index === 0) {
          columns[0] = options
        } else if (index < this.selected.length) {
          columns[index] = options
        }
        if (index !== this.selected.length - 1) {
          columns = this.formateColumns(options[this.selected[index]].children, index + 1, columns)
        }
        return columns
      }
      return []
    },
    // 检测级联层级
    parseOptions() {
      const count = this.countColumn(this.options)
      let i = count
      while(i--) {
        this.selected[i] = 0
      }
      if (count > 0) {
        this.columns = this.formateColumns(this.options)
      }
    },
    change(row, col) {
      this.selected.forEach((item, i) => {
        if (i === col) {
          this.selected[i] = row
        } else if (i > col) {
          this.selected[i] = 0
        }
      })
      this.$emit('change', this.selected)
      this.columns = this.formateColumns(this.options)
    }
  }
}
</script>

<style lang="scss">
  @import './variable.scss';
  .zoe-pop{
    position: fixed;
    left:0;
    top:0;
    z-index: 100;
    width:100%;
    height:100vh;
    > .mask{
      position: absolute;
      width:100%;
      height:100%;
      background: rgba(0, 0, 0, .6);
    }
  }
  .zoe-picker{
    background: white;
    position: absolute;
    z-index: 10;
    bottom:0;
    left:0;
    width:100%;
    height:300px;
    header{
      height:50px;
      border-bottom: 1px solid $border;
      justify-content: space-between;
      font-size: 14px;
      text-align: center;
      display: block;
      position: relative;
      box-sizing: border-box;
      span{
        display: block;
        line-height: 50px;
        padding:0 10px;
      }
      .tit{
        color:$text-gray;
      }
      .confirm{
        color:$green;
        position: absolute;
        right:0;top:0;
      }
    }
    .wrapper{
      height: calc(300px - 50px);
      position: relative;
      display: flex;
      .mask{
        position: absolute;
        z-index: 10;
        left:0;
        width:100%;
        height: 105px;
        pointer-events: none;
        transform: translateZ(0);
        box-sizing: border-box;
        &.top{
          background: linear-gradient(0deg,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));
          top:0;
          border-bottom: 1px solid $border;
        }
        &.bottom{
          background: linear-gradient(180deg,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));
          bottom:0;
          border-top: 1px solid $border;
        }
      }
    }
  }
</style>
