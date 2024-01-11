<script setup>
import HForm from "@/components/HForm/index.vue"
import formDataJSON from "@/components/HForm/config/formData"

/******* 数据 *******/
const formData = ref(formDataJSON)

/******* 生命周期 *******/
onLoad(() => {
  console.log("表单页加载")
})

/******* 按钮事件 *******/
const hForm = ref(null)
// 重置
const onReset = () => {
  hForm.value.resetForm()
}
// 提交
const onSubmit = () => {
  hForm.value.formCheck().then((res) => {
    console.log("提交的表单数据", res.data)
  })
}
</script>

<template>
  <view class="form">
    <h-form ref="hForm" :formData="formData"></h-form>

    <view class="form-btn">
      <button class="flex1" type="primary" :plain="true" @click="onReset">重置</button>
      <button class="flex1 ml20" type="primary" @click="onSubmit">提交</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.form {
  padding-bottom: 150rpx;

  .form-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 6px 0 #e4e8ec;
    padding: 20rpx;
    background-color: #fff;
    z-index: 999;
  }
}
</style>
