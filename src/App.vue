<script>
import useStore from "@/store/modules"

export default {
  onLaunch: function () {
    console.log("App Launch")
  },
  onShow: function () {
    const { loginStore } = useStore()
    loginStore.initToken() // 初始化token
  },
  onHide: function () {
    console.log("App Hide")
  },
  onPageNotFound: function () {
    uni.reLaunch({
      url: "/pages/notFound/404"
    })
  }
}
</script>

<style lang="scss">
@import "uview-plus/index.scss";
@import "@/assets/css/reset.scss";
@import "@/assets/css/common.scss";
@import "@/assets/css/hForm.scss";
@import "@/assets/css/uviewPlus.scss";
</style>
