//202311000544杨佳慧
<template>
  <view class="content">
    <view class="title">{{ title }}</view>
    <view class="art-content">
      <rich-text :nodes="parsedContent"></rich-text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  computed: {
    parsedContent() {
      if (!this.content) return [];
      // 将 HTML 字符串转为 rich-text 节点
      return [{ name: 'div', children: [{ type: 'text', text: this.content }] }];
    }
  },
  onLoad(e) {
    const newsid = e.newsid;
    if (!newsid) {
      uni.showToast({ title: '无效ID', icon: 'none' });
      return;
    }

    uni.showLoading({ title: '加载中...' });
    uni.request({
      url: `https://cdn.jsdelivr.net/gh/JIAHUI-DAMOWANG/sports-news@main/detail/${newsid}.json`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data.title) {
          this.title = res.data.title;
          this.content = res.data.content || '';
        } else {
          uni.showToast({ title: '详情数据异常', icon: 'none' });
        }
      },
      fail: () => {
        uni.showToast({ title: '详情加载失败', icon: 'none' });
      },
      complete: () => {
        uni.hideLoading();
      }
    });
  }
};
</script>

<style>
.content {
  padding: 10upx 2%;
  width: 96%;
  flex-wrap: wrap;
}
.title {
  line-height: 2em;
  font-weight: 700;
  font-size: 38upx;
  color: #333;
}
.art-content {
  line-height: 2em;
  font-size: 30upx;
  color: #555;
  margin-top: 20upx;
}
</style>


