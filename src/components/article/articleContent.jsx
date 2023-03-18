import { View, Text, Image } from "@tarojs/components";
import { Component } from "react";

import Taro from "@tarojs/taro";
import AuthorInfo from "../person/authorInfo";
import MarkdownBox from "../markdownBox";
import Cache from "../../cache/cache";

import img from "../../asset/1614306161615.png";

import "./articleContent.scss";
import { timeFormat } from "../../util/util";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: [],
    };
  }

  async componentDidMount() {
    const routerData = Taro.getCurrentInstance().router.params;

    const result = await Cache.getArticleById(routerData.blogId);
    Taro.setNavigationBarTitle({ title: result.title });
    this.setState({
      articleData: result,
    });
  }

  render() {
    const { articleData } = this.state;
    const releaseTime = timeFormat(articleData.pubtime);
    // console.log("articleData: ", articleData);

    return (
      <View id='articleContent'>
        <View id='articleContentTitle'>
          <Text>{articleData.title}</Text>
        </View>
        <AuthorInfo
          headImgSrc='https://i1.hdslb.com/bfs/face/8fcc083bbd148db4bdd4ba79c7231f5667956536.jpg@85w_85h.jpg'
          authorName='BananaBoat'
          releaseTime={releaseTime}
          id='articleAuthorInfo'
        ></AuthorInfo>
        <View id='articleContentImage'>
          <Image src={img} mode='aspectFill' />
        </View>
        <MarkdownBox content={articleData.content} />
      </View>
    );
  }
}
