<script setup>
/*
 * @Author: Ygm
 * @Date: 2023-07-19 13:40:12
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-19 13:40:12
 * @Description: 日历选择组件
 */
import { deepAssign } from "@/utils/util"
import { FCalendarOptions } from "@/components/HForm/config"

/*****--- 父组件传递的参数 ---*****/
const props = defineProps({
  // 表单项数据
  itemData: {
    type: Object,
    default: () => ({})
  }
})
const { itemData } = toRefs(props)

/*****--- 单选数据 ---*****/
const calenderData = computed(() => {
  const obj_options = JSON.parse(JSON.stringify(FCalendarOptions))
  return deepAssign(obj_options, itemData.value)
})

/* 日历选择布局 */
const layout = computed(() => {
  const { inputAlign } = calenderData.value.props
  return inputAlign === "right" ? "f-calender layout-lr border" : "f-calender layout-tb"
})
const tipsLayout = computed(() => {
  const { inputAlign } = calenderData.value.props
  return inputAlign === "right" ? "right: 0;" : "left: 0;"
})

/*****--- 默认日期 ---*****/
const defaultDateMultiple = computed(() => {
  const d = new Date()
  const year = d.getFullYear()
  let month = d.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  const date = d.getDate()
  const { value } = calenderData.value
  return value ? value.split("，") : [`${year}-${month}-${date}`]
})

/*****--- 监听输入值变化 ---*****/
const isShowTips = ref(false) // 是否显示提示
watch(
  () => calenderData.value.value,
  (value) => {
    handelDataChecks(value)
  },
  { deep: true }
)

/*****--- 生命周期 ---*****/
const isShow = ref(false) // 是否显示日历
const inputTipsText = ref("") // 输入框提示文字
onMounted(() => {
  // 校验输入框
  uni.$on("checkForm", () => {
    handelDataChecks(calenderData.value.value)
  })
})

/*****--- 日期选择完成后触发 ---*****/
const emit = defineEmits(["change"])
const onConfirm = (date) => {
  isShow.value = false
  const { obj_id, props } = calenderData.value
  let dateStr = ""
  if (props.mode === "range") {
    dateStr = `${date[0]} ~ ${date[date.length - 1]}`
  } else {
    dateStr = date.join("，")
  }
  emit("change", obj_id, dateStr, date)
}

/*****--- 自定义校验 ---*****/
const handelDataChecks = (value) => {
  const { require, title } = calenderData.value
  if (!require) {
    isShowTips.value = false
  } else {
    isShowTips.value = !value
    inputTipsText.value = `${title}不能为空`
  }
}
</script>

<!--uniapp中小程序样式穿透问题-->
<!--#ifdef MP-WEIXIN-->
<script>
export default {
  options: { styleIsolation: "shared" }
}
</script>
<!--#endif-->

<template>
  <view v-if="calenderData.visible" :class="layout">
    <view class="form-item__left">
      <text
        class="form-item__text"
        :style="{
          color: calenderData.props.textColor,
          fontSize: calenderData.props.fontSize
        }"
      >
        {{ calenderData.title }}
      </text>
      <text v-if="calenderData.require" class="form-item__dot">*</text>
    </view>

    <view class="select-input" @click="isShow = true">
      <u-input
        suffixIcon="arrow-right"
        :suffixIconStyle="calenderData.suffixIconStyle"
        v-model="calenderData.value"
        :readonly="true"
        :border="calenderData.props.border"
        :disabled="calenderData.props.disabled"
        :placeholder="calenderData.placeholder"
        :clearable="calenderData.props.clearable"
        :inputAlign="calenderData.props.inputAlign"
        :disabledColor="calenderData.props.disabledColor"
      />
    </view>

    <!--提示-->
    <view v-if="isShowTips" :style="tipsLayout" class="form-tips">
      {{ inputTipsText }}
    </view>
  </view>

  <!-- 日历打开弹框 -->
  <u-calendar
    :round="30"
    :show="isShow"
    :mode="calenderData.props.mode"
    :monthNum="calenderData.props.monthNum"
    :showLunar="calenderData.props.showLunar"
    :rowHeight="calenderData.props.rowHeight"
    :defaultDate="defaultDateMultiple"
    @confirm="onConfirm"
    @close="isShow = false"
  />
</template>

<style lang="scss" scoped>
.f-calender {
  position: relative;

  :deep(.u-input__content__field-wrapper__field) {
    width: 450rpx !important;
    overflow-x: auto;
  }
}
</style>
