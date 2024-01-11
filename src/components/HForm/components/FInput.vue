<script setup>
/*
 * @Author: Ygm
 * @Date: 2023-07-19 13:42:50
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-19 13:42:50
 * @Description: 输入框组件
 */
import { deepAssign } from "@/utils/util"
import { FInputOptions } from "../config/index"

/* 父组件传递的参数 */
const props = defineProps({
  // 表单项数据
  itemData: {
    type: Object,
    default: () => ({})
  }
})
const { itemData } = toRefs(props)

/******* 合并数据 *******/
const inputData = computed(() => {
  const obj_options = JSON.parse(JSON.stringify(FInputOptions))
  return deepAssign(obj_options, itemData.value)
})

/* 输入框布局 */
const layout = computed(() => {
  const { inputAlign } = inputData.value.props
  return inputAlign === "right" ? "f-input layout-lr border" : "f-input layout-tb"
})
const tipsLayout = computed(() => {
  const { inputAlign } = inputData.value.props
  return inputAlign === "right" ? "right: 0;" : "left: 0;"
})

/* 监听输入值变化 */
const isShowTips = ref(false) // 是否显示提示
watch(
  () => inputData.value.value,
  (value) => {
    handelDataChecks(value)
  },
  { deep: true }
)

/* 生命周期 */
const inputTipsText = ref("") // 输入框提示文字
onMounted(() => {
  // 校验输入框
  uni.$on("checkForm", () => {
    handelDataChecks(inputData.value.value)
  })
})

/* 输入框值改变时触发 */
const emit = defineEmits(["change"])
const onChange = (value) => {
  const { obj_id } = inputData.value
  emit("change", obj_id, value)
}

/* 输入框清除 */
const onClear = () => {
  const { obj_id } = inputData.value
  emit("change", obj_id, "")
}

/* 自定义校验 */
const handelDataChecks = (value) => {
  const { require, title, check_rule } = inputData.value
  if (!require) {
    isShowTips.value = false
  } else if (!value) {
    isShowTips.value = true
    inputTipsText.value = "请输入" + title
  } else {
    const reg = check_rule.regExp
    const isReg = reg ? !!reg.test(value) : true
    inputTipsText.value = check_rule.regExpText
    isShowTips.value = (require && !value) || !isReg
  }
}
</script>

<template>
  <view v-if="inputData.visible" :class="layout">
    <view class="form-item__left">
      <text
        class="form-item__text"
        :style="{
          fontSize: inputData.props.fontSize,
          color: inputData.props.textColor
        }"
      >
        {{ inputData.title }}
      </text>
      <text v-if="inputData.require" class="form-item__dot">*</text>
    </view>

    <u-input
      v-model="inputData.value"
      :placeholder="inputData.placeholder"
      :type="inputData.props.type"
      :border="inputData.props.border"
      :disabled="inputData.props.disabled"
      :readonly="inputData.props.readonly"
      :password="inputData.props.password"
      :maxlength="inputData.props.maxlength"
      :clearable="inputData.props.clearable"
      :inputAlign="inputData.props.inputAlign"
      :disabledColor="inputData.props.disabledColor"
      @change="onChange"
      @clear="onClear"
    />
    <!--提示-->
    <view v-if="isShowTips" :style="tipsLayout" class="form-tips">
      {{ inputTipsText }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.f-input {
  position: relative;
}
</style>
