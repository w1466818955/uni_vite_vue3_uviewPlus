<script setup>
/*
 * @Author: Ygm
 * @Date: 2023-07-20 14:30:18
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-20 14:30:18
 * @Description: 单列、多列级联选择器
 */
import DataPicker from "@/components/DataPicker"
import { deepAssign } from "@/utils/util"
import { FDataPickerOptions } from "../config/index"

/******* 父组件传递的参数 *******/
const props = defineProps({
  // 表单项数据
  itemData: {
    type: Object,
    default: () => ({})
  }
})
const { itemData } = toRefs(props)

/******* 合并数据 *******/
const dataPickerData = computed(() => {
  const obj_options = JSON.parse(JSON.stringify(FDataPickerOptions))
  return deepAssign(obj_options, itemData.value)
})

/******* 组件布局 *******/
const layout = computed(() => {
  const { inputAlign } = dataPickerData.value.props
  return inputAlign === "right" ? "f-dataPicker layout-lr border" : "f-dataPicker layout-tb"
})
const tipsLayout = computed(() => {
  const { inputAlign } = dataPickerData.value.props
  return inputAlign === "right" ? "right: 0;" : "left: 0;"
})

/******* 监听输入值变化 *******/
const isShowTips = ref(false) // 是否显示提示
watch(
  () => dataPickerData.value.value,
  (value) => {
    handelDataChecks(value)
  },
  { deep: true }
)

/******* 生命周期 *******/
const inputTipsText = ref("") // 输入框提示文字
onMounted(() => {
  // 校验输入框
  uni.$on("checkForm", () => {
    handelDataChecks(dataPickerData.value.value)
  })
})

/******* 打开弹框 *******/
const dataPickerDom = ref(null)
const onOpenPicker = () => {
  dataPickerDom.value.onOpen()
}

/* 自定义校验 */
const handelDataChecks = (value) => {
  const { require, title, placeholder } = dataPickerData.value
  const isArray = Array.isArray(value) && !value.length
  isShowTips.value = require ? isArray || (!value && value !== 0) : false
  inputTipsText.value = placeholder || "请选择" + title
}
</script>

<template>
  <view v-if="dataPickerData.visible" :class="layout">
    <view class="form-item__left">
      <text
        class="form-item__text"
        :style="{
          fontSize: dataPickerData.props.fontSize,
          color: dataPickerData.props.textColor
        }"
      >
        {{ dataPickerData.title }}
      </text>
      <text v-if="dataPickerData.require" class="form-item__dot">*</text>
    </view>

    <view @click="onOpenPicker">
      <u-input
        :readonly="true"
        v-model="dataPickerData.value"
        :border="dataPickerData.props.border"
        :disabled="dataPickerData.props.disabled"
        :placeholder="dataPickerData.placeholder"
        :inputAlign="dataPickerData.props.inputAlign"
        :disabledColor="dataPickerData.props.disabledColor"
        suffixIcon="arrow-right"
        :suffixIconStyle="dataPickerData.suffixIconStyle"
      />
    </view>

    <!--提示-->
    <view v-if="isShowTips" :style="tipsLayout" class="form-tips">
      {{ inputTipsText }}
    </view>

    <data-picker ref="dataPickerDom" />
  </view>
</template>

<style lang="scss" scoped>
.f-dataPicker {
  position: relative;
}

.data-picker {
  opacity: 1;
}
</style>
