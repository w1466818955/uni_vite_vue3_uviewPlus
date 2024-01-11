<script>
export default defineComponent({
  name: "SvgIcon",
  props: {
    // 使用的svg图标名称，也就是svg文件名
    name: {
      type: String,
      required: true
    },
    prefix: {
      type: String,
      default: "icon"
    },
    color: {
      type: String,
      default: "#333"
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)

    return {
      symbolId
    }
  }
})
</script>

<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scope>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  flex: none;
  fill: currentColor;
  vertical-align: -0.2em;
  overflow: hidden;
}
</style>
