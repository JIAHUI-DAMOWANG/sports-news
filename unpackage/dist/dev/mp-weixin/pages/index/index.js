"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      news: []
    };
  },
  onLoad() {
    common_vendor.index.request({
      url: "https://cdn.jsdelivr.net/gh/JIAHUI-DAMOWANG/sports-news@main/sports_news.json",
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          this.news = res.data;
          common_vendor.index.__f__("log", "at pages/index/index.vue:37", "体育新闻加载成功:", this.news);
        } else {
          common_vendor.index.__f__("error", "at pages/index/index.vue:39", "请求失败:", res.statusCode);
        }
      },
      fail: () => {
        common_vendor.index.__f__("error", "at pages/index/index.vue:43", "网络请求失败");
        this.loadMockSportsNews();
      }
    });
  },
  methods: {
    loadMockSportsNews() {
      this.news = [
        {
          title: "中国队夺得亚洲杯冠军！",
          urlToImage: "https://via.placeholder.com/40x40?text=SPORTS",
          publishedAt: "2025-11-20T18:30:00Z"
        },
        {
          title: "NBA总决赛G7：湖人逆转夺冠",
          urlToImage: "https://via.placeholder.com/40x40?text=NBA",
          publishedAt: "2025-11-19T09:15:00Z"
        }
      ];
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.news, (item, index, i0) => {
      return {
        a: item.urlToImage || "/static/sports_icon.png",
        b: common_vendor.t(item.title),
        c: common_vendor.t(new Date(item.publishedAt).toLocaleString()),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
