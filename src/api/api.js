import Taro from "@tarojs/taro";

const host = "https://api.yancdrag.top:3085/api";

async function getAllArticle() {
  const res = await Taro.request({
    url: `${host}/article/getAllArticle`,
  });
  // sort data
  return res.data.data.sort((a, b) => b.blogId - a.blogId);
}

async function getArticleNums() {
  const res = await Taro.request({
    url: `${host}/article/getArticalNums`,
  });
  return res.data.data[0].nums;
}

async function getArticleById(id) {
  const res = await Taro.request({
    url: `${host}/article/getArticle/${id}`,
  });
  return res.data.data[0];
}

async function getRecommendList() {
  const res = await Taro.request({
    url: `${host}/article/recommendList`,
  });
  return res.data.data;
}

async function getAuthorInfo() {
  const res = await Taro.request({
    url: `${host}/about`,
  });
  return res.data.data[0].PersonalIntroduction;
}

async function getLastArticle() {
  const res = await Taro.request({
    url: `${host}/article/getArticle/4/0`,
  });
  return res.data.data;
}

export {
  getAllArticle,
  getArticleNums,
  getArticleById,
  getRecommendList,
  getAuthorInfo,
  getLastArticle,
};
