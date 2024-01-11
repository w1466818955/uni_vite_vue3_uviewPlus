<script setup>
const router = useRouter() // 路由
const goForm = () => {
  router.push({ path: "pages/form/index" })
}
</script>

<template>
  <view class="home">
    <button type="primary" @click="goForm">跳转到表单页</button>
  </view>
</template>

<style lang="scss" scoped>
.home {
}
</style>
