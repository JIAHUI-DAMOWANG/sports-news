<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
  @import "./common/uni.css";
  page, view {
    display: flex;
  }
  /* 针对文本元素单独设置行高 */
  text {
    line-height: 2; /* 数值可根据需要调整 */
    font-size: 30rpx;
  }
</style>