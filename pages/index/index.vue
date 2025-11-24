//202311000544杨佳慧计工本2301
<template>
  <view class="content">
    <view class="uni-list">
      <view
        class="uni-list-cell"
        hover-class="uni-list-cell-hover"
        v-for="(item, index) in news"
        :key="index"
        @tap="openinfo"
        :data-newsid="item.post_id"
      >
        <view class="uni-media-list">
          <image class="uni-media-list-logo" :src="item.urlToImage || '/static/sports_icon.png'"></image>
          <view class="uni-media-list-body">
            <view class="uni-media-list-text-top">{{ item.title }}</view>
            <view class="uni-media-list-text-bottom uni-ellipsis">
              {{ formatDate(item.publishedAt) }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      news: []
    };
  },
  onLoad() {
    uni.showLoading({ title: '加载中...' });
    uni.request({
      url: 'https://cdn.jsdelivr.net/gh/JIAHUI-DAMOWANG/sports-news@main/sports_news.json',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          this.news = res.data;
          console.log('体育新闻加载成功:', this.news);
        } else {
          console.error('数据格式错误:', res.data);
          this.loadMockSportsNews();
        }
      },
      fail: () => {
        console.error('网络请求失败');
        this.loadMockSportsNews();
      },
      complete: () => {
        uni.hideLoading();
      }
    });
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '未知时间';
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? '无效时间' : date.toLocaleString('zh-CN');
    },
    openinfo(e) {
      const newsid = e.currentTarget.dataset.newsid;
      uni.navigateTo({
        url: '../info/info?newsid=' + newsid
      });
    },
    loadMockSportsNews() {
      this.news = [
        {
          title: '中国队夺得亚洲杯冠军！',
          urlToImage: 'https://via.placeholder.com/40x40?text=SPORTS',
          publishedAt: '2025-11-20T18:30:00Z',
          post_id: '1'
        },
        {
          title: 'NBA总决赛G7：湖人逆转夺冠',
          urlToImage: 'https://via.placeholder.com/40x40?text=NBA',
          publishedAt: '2025-11-19T09:15:00Z',
          post_id: '2'
        },
        {
          title: 'CBA季后赛：广东队晋级决赛',
          urlToImage: 'https://via.placeholder.com/40x40?text=CBA',
          publishedAt: '2025-11-18T15:30:00Z',
          post_id: '3'
        }
      ];
    }
  }
};
</script>

<style>
.content { padding: 10rpx 2%; }
.uni-media-list {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}
.uni-media-list-logo {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.uni-media-list-body {
  flex: 1;
  height: auto;
}
.uni-media-list-text-top {
  font-size: 32rpx;
  color: #333;
  line-height: 1.6em;
}
.uni-media-list-text-bottom {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}
.uni-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>