<template>
  <view class="content">
    <view class="uni-list">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in news" :key="index">
        <view class="uni-media-list">
          <image class="uni-media-list-logo" :src="item.urlToImage || '/static/sports_icon.png'"></image>
          <view class="uni-media-list-body">
            <view class="uni-media-list-text-top">{{ item.title }}</view>
            <view class="uni-media-list-text-bottom uni-ellipsis">
              {{ new Date(item.publishedAt).toLocaleString() }}
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
    // 使用 NewsAPI 获取体育新闻（请替换 YOUR_API_KEY）
    const apiKey = 'YOUR_API_KEY'; // ← 从 https://newsapi.org 获取
    const url = `https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=${apiKey}`;

   uni.request({
     url: 'https://cdn.jsdelivr.net/gh/JIAHUI-DAMOWANG/sports-news@main/sports_news.json',
     method: 'GET',
     success: (res) => {
       if (res.statusCode === 200) {
         this.news = res.data;
         console.log('体育新闻加载成功:', this.news);
       } else {
         console.error('请求失败:', res.statusCode);
       }
     },
     fail: () => {
       console.error('网络请求失败');
       this.loadMockSportsNews();
     }
   });
  },
  methods: {
    loadMockSportsNews() {
      this.news = [
        {
          title: '中国队夺得亚洲杯冠军！',
          urlToImage: 'https://via.placeholder.com/40x40?text=SPORTS',
          publishedAt: '2025-11-20T18:30:00Z'
        },
        {
          title: 'NBA总决赛G7：湖人逆转夺冠',
          urlToImage: 'https://via.placeholder.com/40x40?text=NBA',
          publishedAt: '2025-11-19T09:15:00Z'
        }
      ];
    }
  }
};
</script>

<style>
.uni-media-list-body { height: auto; }
.uni-media-list-text-top { line-height: 1.6em; }
.uni-media-list-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
}
</style>