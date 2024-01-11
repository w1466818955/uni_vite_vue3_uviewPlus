<script setup>
/*
 * @Author: Ygm
 * @Date: 2023-07-20 16:07:27
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-20 16:07:27
 * @Description: 选择器组件--基础模板
 */
/******* 父组件传的参数 *******/
const props = defineProps({
  // 数据选择模式
  mode: {
    // 弹出层的方向 left、top、right、bottom、center
    type: String,
    default: () => "bottom"
  },
  // 弹出层的圆角(仅对mode = top | bottom | center有效)
  round: {
    type: Number || String,
    default: () => 30
  }
})
const { mode, round } = toRefs(props)
const isShow = ref(false) // 是否显示弹框
/******* 打开弹框 *******/
const onOpen = () => {
  isShow.value = true
}

/******* 关闭弹框 *******/
const onClose = () => {
  isShow.value = false
}

/******* 确认 *******/
const onConfirm = () => {
  onClose() // 关闭弹框
  console.log("确认")
}

/******* 暴露子组件方法 *******/
defineExpose({
  onOpen,
  onClose
})
</script>

<template>
  <view class="data-picker">
    <u-popup :mode="mode" :round="round" :show="isShow">
      <view class="data-picker__content">
        <view class="data-picker__content-top">
          <view class="data-picker__content-top-left" @click="onClose">取消</view>
          <view class="data-picker__content-top-center">标题</view>
          <view class="data-picker__content-top-right" @click="onConfirm">确认</view>
        </view>

        <!-- 子组件 -->
      </view>
    </u-popup>
  </view>
</template>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.data-picker {
  position: relative;

  .data-picker__content {
    min-height: 500rpx;
    max-height: 80vh;

    .data-picker__content-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80rpx;
      padding: 0 30rpx;
      border-bottom: 1px solid #f3f3f4;

      &-left {
        font-size: 15px;
        color: rgb(144, 145, 147);
      }

      &-right {
        font-size: 15px;
        color: $picker-color-primary;
      }
    }
  }
}
</style>
