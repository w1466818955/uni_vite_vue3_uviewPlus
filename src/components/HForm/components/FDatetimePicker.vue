<script setup>
/*
 * @Author: Ygm
 * @Date: 2023-07-20 11:08:25
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-20 11:08:25
 * @Description: 时间日期选择器
 */
import { deepAssign } from "@/utils/util"
import { FDatetimePickerOptions } from "@/components/HForm/config"

/******* 传递的参数 *******/
const props = defineProps({
  // 表单项数据
  itemData: {
    type: Object,
    default: () => ({})
  }
})
const { itemData } = toRefs(props)

/******* 合并数据 *******/
const datetimePickerData = computed(() => {
  const obj_options = JSON.parse(JSON.stringify(FDatetimePickerOptions))
  return deepAssign(obj_options, itemData.value)
})

/******* 日期选择布局 *******/
const layout = computed(() => {
  const { inputAlign } = datetimePickerData.value.props
  return inputAlign === "right" ? "f-datetimePicker layout-lr border" : "f-datetimePicker layout-tb"
})
const tipsLayout = computed(() => {
  const { inputAlign } = datetimePickerData.value.props
  return inputAlign === "right" ? "right: 0;" : "left: 0;"
})

/******* 监听输入值变化 *******/
const isShowTips = ref(false) // 是否显示提示
watch(
  () => datetimePickerData.value.value,
  (value) => {
    handelDataChecks(value)
  },
  { deep: true }
)

/******* 生命周期 *******/
const isShow = ref(false)
const inputTipsText = ref("") // 输入框提示文字
onMounted(() => {
  // 校验输入框
  uni.$on("checkForm", () => {
    handelDataChecks(datetimePickerData.value.value)
  })
})

/******* 日期选择完成后触发 *******/
const emit = defineEmits(["change"])
const onConfirm = (date) => {
  isShow.value = false
  const { obj_id } = datetimePickerData.value
  const formatDate = uni.$u.timeFormat(date.value, "yyyy-mm-dd")
  emit("change", obj_id, formatDate)
}

/******* 自定义校验 *******/
const handelDataChecks = (value) => {
  const { require, title } = datetimePickerData.value
  if (!require) {
    isShowTips.value = false
  } else {
    isShowTips.value = !value
    inputTipsText.value = `${title}不能为空`
  }
}
</script>

<template>
  <view v-if="datetimePickerData.visible" :class="layout">
    <view class="form-item__left">
      <text
        class="form-item__text"
        :style="{
          color: datetimePickerData.props.textColor,
          fontSize: datetimePickerData.props.fontSize
        }"
      >
        {{ datetimePickerData.title }}
      </text>
      <text v-if="datetimePickerData.require" class="form-item__dot">*</text>
    </view>

    <view @click="isShow = true">
      <u-input
        :readonly="true"
        v-model="datetimePickerData.value"
        :border="datetimePickerData.props.border"
        :placeholder="datetimePickerData.placeholder"
        :disabled="datetimePickerData.props.disabled"
        :inputAlign="datetimePickerData.props.inputAlign"
        :disabledColor="datetimePickerData.props.disabledColor"
        suffixIcon="arrow-right"
        :suffixIconStyle="datetimePickerData.suffixIconStyle"
      />
    </view>

    <!--提示-->
    <view v-if="isShowTips" :style="tipsLayout" class="form-tips">
      {{ inputTipsText }}
    </view>
  </view>

  <u-datetime-picker
    :round="30"
    :show="isShow"
    :value="datetimePickerData.value"
    :mode="datetimePickerData.props.mode"
    :title="datetimePickerData.props.pickerTitle"
    :itemHeight="datetimePickerData.props.itemHeight"
    :showToolbar="datetimePickerData.props.showToolbar"
    :visibleItemCount="datetimePickerData.props.visibleItemCount"
    @confirm="onConfirm"
    @cancel="isShow = false"
  />
</template>

<style lang="scss" scoped>
.f-datetimePicker {
  position: relative;
}
</style>
