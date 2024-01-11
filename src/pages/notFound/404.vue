<script setup>
import useStore from "@/store/modules"

const route = useRoute()
const router = useRouter()
const { loginStore } = useStore()

/* 生命周期 */
const redirect = ref(null)
const backText = ref("返回上一级")
onLoad(() => {
  redirect.value = history.state.back
})

// 返回首页
const backHome = () => {
  router.replaceAll({ path: redirect.value })
}
</script>

<template>
  <view class="no-found">
    <image class="no-found__img" mode="widthFix" src="/static/svgs/404.svg" />
    <view class="mb-40rpx">
      <text>页面找不到了~</text>
    </view>
    <u-button class="no-found__back" :text="backText" @click="backHome" />
  </view>
</template>

<style lang="scss" scoped>
.no-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .no-found__img {
    padding-top: 300rpx;
  }

  .no-found__back {
    width: 200rpx;
    margin-top: 40rpx;
  }
}
</style>
