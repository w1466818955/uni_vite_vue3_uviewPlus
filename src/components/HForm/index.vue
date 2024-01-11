<script setup>
/*
 * 校验表单：通过ref获取表单组件实例，调用formCheck方法
 * hForm.value.formCheck().then((res) => {
 *    console.log("提交的表单数据", res.data)
 * })
 *
 * 表单重置：通过ref获取表单组件实例，调用resetForm方法
 * const onCancel = () => {
 *    hForm.value.resetForm()
 * }
 * */
import { uuid, isEmpty } from "@/utils/util"
import FInput from "./components/FInput.vue"
import FCheckbox from "./components/FCheckbox.vue"
import FTextarea from "./components/FTextarea.vue"
import FCalendar from "./components/FCalendar.vue"
import FDataPicker from "./components/FDataPicker.vue"
import FDatetimePicker from "./components/FDatetimePicker.vue"

/*****--- 传递的props值 ---*****/
const props = defineProps({
  // 表单数据
  formData: {
    type: Object,
    default: () => []
  }
})
const { formData } = toRefs(props)

/******* 生命周期 *******/
const newFormData = ref([])
onLoad(() => {
  // 初始化表单数据,没有obj_id的话就生成一个
  newFormData.value = formData.value.map((o) => {
    o.obj_id = o.obj_id || uuid(10)
    o.value = !isEmpty(o.default_data) ? o.default_data : o.value
    return o
  })
})

/**
 * @description: 子组件触发的事件
 * @param id 表单项id
 * @param value 表单项值
 * @param rawValue 表单项选择的原始值
 */
const onChildChange = (id, value, rawValue) => {
  newFormData.value.forEach((o) => {
    if (o.obj_id === id) {
      o.value = value
      o.data_list = rawValue || o.data_list
    }
  })
}

/*****--- 表单规则校验 ---*****/
const formCheck = () => {
  uni.$emit("checkForm") // 触发子组件的checkForm事件
  return new Promise((resolve, reject) => {
    const filterData = newFormData.value.filter((o) => {
      o.visible = isEmpty(o.visible) || o.visible
      o.require = isEmpty(o.require) || o.require
      return o.visible && o.require
    })
    const error = filterData.some((v) => isEmpty(v.value))
    if (error) {
      const message = "必填项不能为空"
      reject({ msg: message, result: false })
      uni.showToast({ icon: "error", title: message })
    } else {
      resolve({ msg: "校验通过", result: true, data: newFormData.value })
    }
  })
}

/******* 表单重置 *******/
const resetForm = () => {
  newFormData.value.forEach((o) => {
    o.value = undefined
  })
}

/******* 暴露组件方法 *******/
defineExpose({
  formCheck,
  resetForm
})
</script>

<template>
  <view class="h-form">
    <view class="h-form__content">
      <!-- 注：为了兼容小程序，不使用component -->
      <template v-for="item in newFormData" :key="item.obj_id">
        <!-- 输入框 -->
        <f-input v-if="item.widgets_type === 'f_input'" :itemData="item" @change="onChildChange" />
        <!-- 单选|多选 -->
        <f-checkbox
          v-if="item.widgets_type === 'f_checkbox'"
          :itemData="item"
          @change="onChildChange"
        />
        <!-- 文本域 -->
        <f-textarea
          v-if="item.widgets_type === 'f_textarea'"
          :itemData="item"
          @change="onChildChange"
        />
        <!-- Calendar 日历  -->
        <f-calendar
          v-if="item.widgets_type === 'f_calendar'"
          :itemData="item"
          @change="onChildChange"
        />
        <!-- 日期弹出选择 -->
        <f-datetime-picker
          v-if="item.widgets_type === 'f_datetimePicker'"
          :itemData="item"
          @change="onChildChange"
        />
        <!-- 单列多列级联选择器 -->
        <f-data-picker
          v-if="item.widgets_type === 'f_dataPicker'"
          :itemData="item"
          @change="onChildChange"
        />
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.h-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30rpx;

  .h-form__content {
    flex: 1;
  }
}
</style>
