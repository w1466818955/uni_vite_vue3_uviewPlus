<script setup>
/*
 * @Author: Ygm
 * @Date: 2023-07-19 13:43:31
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-19 13:43:31
 * @Description: 单选|多选组件
 */
import { deepAssign } from "@/utils/util"
import { FCheckboxOptions } from "@/components/HForm/config"

/* 父组件传递的参数 */
const props = defineProps({
  // 表单项数据
  itemData: {
    type: Object,
    default: () => ({})
  }
})
const { itemData } = toRefs(props)

/* 单选数据 */
const checkboxData = computed(() => {
  const obj_options = JSON.parse(JSON.stringify(FCheckboxOptions))
  return deepAssign(obj_options, itemData.value)
})

/* 输入框布局 */
const layout = computed(() => {
  const { inputAlign } = checkboxData.value.props
  return inputAlign === "right" ? "f-checkbox layout-lr border" : "f-checkbox layout-tb"
})
const tipsLayout = computed(() => {
  const { inputAlign } = checkboxData.value.props
  return inputAlign === "right" ? "right: 0;" : "left: 0;"
})

/* 监听输入值变化 */
const isShowTips = ref(false) // 是否显示提示
watch(
  () => checkboxData.value.value,
  (value) => {
    handelDataChecks(value)
  },
  { deep: true }
)

/* 生命周期 */
const inputTipsText = ref("") // 输入框提示文字
onLoad(() => {
  // 校验输入框
  uni.$on("checkForm", () => {
    handelDataChecks(checkboxData.value.value)
  })
})

/* 选择数据改变触发 */
const emit = defineEmits(["change"])
const onChange = (e) => {
  const { value } = e.detail
  const { obj_id } = checkboxData.value
  emit("change", obj_id, value)
}

/* 自定义校验 */
const handelDataChecks = (value) => {
  const { require, title, placeholder } = checkboxData.value
  const isArray = Array.isArray(value) && !value.length
  isShowTips.value = require ? isArray || (!value && value !== 0) : false
  inputTipsText.value = placeholder || "请选择" + title
}
</script>

<template>
  <view v-if="checkboxData.visible" :class="layout">
    <view class="form-item__left">
      <text
        class="form-item__text"
        :style="{
          fontSize: checkboxData.props.fontSize,
          color: checkboxData.props.textColor
        }"
      >
        {{ checkboxData.title }}
      </text>
      <text v-if="checkboxData.require" class="form-item__dot">*</text>
    </view>

    <uni-data-checkbox
      class="f-checkbox__checkbox"
      v-model="checkboxData.value"
      :localdata="checkboxData.data_list"
      :mode="checkboxData.props.mode"
      :min="checkboxData.props.min"
      :max="checkboxData.props.max"
      :multiple="checkboxData.props.multiple"
      :wrap="checkboxData.props.wrap"
      :selectedColor="checkboxData.props.selectedColor"
      :selectedTextColor="checkboxData.props.selectedTextColor"
      @change="onChange"
    />

    <!--提示-->
    <view v-if="isShowTips" :style="tipsLayout" class="form-tips">
      {{ inputTipsText }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.f-checkbox {
  position: relative;

  :deep(.checklist-group) {
    justify-content: flex-end;
  }

  :deep(.checklist-box) {
    margin-right: 20rpx !important;
  }

  :deep(.checklist-box):last-child {
    margin-right: 0rpx !important;
  }
}
</style>
