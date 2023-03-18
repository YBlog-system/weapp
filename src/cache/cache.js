import Taro from "@tarojs/taro";
import {
  getAllArticle,
  getArticleById,
  getArticleNums,
  getLastArticle,
} from "../api/api";

// data = {blogData:[{blogid:1,...},...],lastRelease:...}

class Cache {
  blogData = [];
  typeList = [];
  lastRelease = "";

  constructor() {
    try {
      const res = Taro.getStorageSync("blogInfo");
      if (res === "") {
        this.addData();
        return;
      }
      // console.log("初始缓存: ", res);
      const result = JSON.parse(res);
      // console.log("获取缓存: ", result);
      this.blogData = result.blogData;
      this.lastRelease = result.lastRelease;
      // 检查缓存情况
      this.checkCache();
    } catch (e) {
      if (e.errMsg === "getStorage:fail data not found") {
        console.log("缓存为空");
        // 初次打开没有数据
        this.addData();
      }
    }
  }

  async checkCache() {
    const numChange = await this.isUnequal();
    if (this.isOverdue() || numChange) {
      console.log("缓存过期");
      this.addData();
    }
  }

  // 检查过期时间 过期 true
  isOverdue() {
    // 过期时间 >= 3天
    return (Date.now() - this.lastRelease) / 1000 / 60 / 60 / 24 >= 3;
  }

  // 匹配服务器博客总数量 不相等 true
  async isUnequal() {
    const DataBaseBlogNums = await getArticleNums();
    return DataBaseBlogNums !== this.blogData.length;
  }

  async addData() {
    const res = await getAllArticle();
    this.blogData = res;
    this.lastRelease = Date.now();
    const data = JSON.stringify({
      blogData: res,
      lastRelease: this.lastRelease,
    });
    try {
      Taro.setStorageSync("blogInfo", data);
    } catch (e) {
      console.log("e :>> ", e);
    }
  }

  // 获取最新 num 篇文章
  async getArticleList(num) {
    // 无法保证获取数据之前 已经读取到了 this.blogData 的数据
    let blogData = this.blogData;

    if (blogData.length > 0) {
      console.log("normal");
      return blogData.slice(0, num);
    }

    const result = await getLastArticle();
    console.log("get 4: ", result);
    return result;
  }

  // 返回所有文章
  getAllArticleList() {
    return this.blogData;
  }

  async getArticleById(id) {
    console.log("this.blogData :>> ", this.blogData, id);
    let result;
    if (this.blogData.length > 0) {
      result = this.blogData.find((item) => item.blogId == id);
      if (result !== undefined) return result;
    }

    try {
      const res = Taro.getStorageSync("blog");
      console.log("res: ", res);
    } catch (e) {
      console.log("e :>> ", e);
    }

    console.log("没有缓存 我去数据库了");

    // 缓存中不存在从接口获取
    result = await getArticleById(id);
    return result;
  }

  // 返回所有类型
  getTypeList() {
    if (this.typeList.length > 0) return this.typeList;

    for (let blogItem of this.blogData) {
      let unFInd = true;
      for (let currentType of this.typeList) {
        if (blogItem.typeId === currentType.typeId) {
          unFInd = false;
          break;
        }
      }
      unFInd &&
        this.typeList.push({
          typeId: blogItem.typeId,
          typeName: blogItem.typeName,
        });
    }
    this.typeList = this.typeList.sort((a, b) => b.typeId - a.typeId);
    return this.typeList;
  }

  getTypeById(id) {
    const typeList = this.getTypeList();
    return typeList.find((type) => type.typeId === id);
  }
}

export default new Cache();
