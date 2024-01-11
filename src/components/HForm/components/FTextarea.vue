<script setup>
/*
 * @Author: Ygm
 * @Date: 2023-07-19 13:43:15
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-19 13:43:15
 * @Description: 文本域组件
 */
import { deepAssign } from "@/utils/util"
import { FTextareaOptions } from "../config/index"

/* 父组件传递的参数 */
const props = defineProps({
  // 表单项数据
  itemData: {
    type: Object,
    default: () => ({})
  }
})
const { itemData } = toRefs(props)

/* 文本域数据 */
const textareaData = computed(() => {
  const obj_options = JSON.parse(JSON.stringify(FTextareaOptions))
  return deepAssign(obj_options, itemData.value)
})

/* 文本域布局 */
const layout = computed(() => {
  const { inputAlign } = textareaData.value.props
  return inputAlign === "right" ? "f-textarea f-textarea__lr" : "f-textarea layout-tb"
})
const tipsLayout = computed(() => {
  const { inputAlign } = textareaData.value.props
  return inputAlign === "right" ? "right: 0;" : "left: 0;"
})

/* 监听输入值变化 */
const isShowTips = ref(false) // 是否显示提示
watch(
  () => textareaData.value.value,
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
    handelDataChecks(textareaData.value.value)
  })
})

/* 选择数据改变触发 */
const emit = defineEmits(["change"])
const onChange = (value) => {
  const { obj_id } = textareaData.value
  emit("change", obj_id, value)
}

/* 自定义校验 */
const handelDataChecks = (value) => {
  const { require, title, placeholder } = textareaData.value
  isShowTips.value = require ? !value && value !== 0 : false
  inputTipsText.value = placeholder || "请选择" + title
}
</script>

<template>
  <view v-if="textareaData.visible" :class="layout">
    <view class="f-textarea__lef form-item__left">
      <text
        class="form-item__text"
        :style="{
          fontSize: textareaData.props.fontSize,
          color: textareaData.props.textColor
        }"
      >
        {{ textareaData.title }}
      </text>
      <text v-if="textareaData.require" class="form-item__dot">*</text>
    </view>

    <u-textarea
      v-model="textareaData.value"
      :count="textareaData.props.count"
      :height="textareaData.props.height"
      :border="textareaData.props.border"
      :placeholder="textareaData.placeholder"
      :disabled="textareaData.props.disabled"
      :maxlength="textareaData.props.maxlength"
      :autoHeight="textareaData.props.autoHeight"
      @change="onChange"
    />

    <!--提示-->
    <view v-if="isShowTips" :style="tipsLayout" class="form-tips">
      {{ inputTipsText }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.f-textarea {
  position: relative;

  .f-textarea__lef {
    flex: none !important;
  }
}

.f-textarea__lr {
  display: flex;
  align-items: flex-start;
  padding: 10rpx 0;
  margin: 20rpx 30rpx;
}

.f-textarea__tb {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10rpx 0;
  margin: 20rpx 30rpx;
}
</style>
