<script setup>
import useStore from "@/store/modules"

const router = useRouter()
const { loginStore } = useStore()

/* 生命周期 */
const title = ref("登录页")
onLoad(() => {
  // loginReq()
})

/* 登录请求 */
const loginReq = async () => {
  // const params = { userName: 1, password: 123 }
  // const res = await uni.$api.getExamNotice(params)
  // if (res.result) {
  //   uni.showToast({ title: "登录成功", icon: "success" })
  loginStore.setToken("abcdefg1234567")
  router.pushTab("/pages/home/index")
  // } else {
  //   uni.$u.toast(res.message)
  // }
}
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <u-button class="login-btn" text="登录测试" @click="loginReq" />
  </view>
</template>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }

  .login-btn {
    width: 200rpx;
    margin-top: 20rpx;
  }
}
</style>
