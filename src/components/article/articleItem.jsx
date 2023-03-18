import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { timeFormat } from "../../util/util";
import Taro from "@tarojs/taro";
import AuthorInfo from "../person/authorInfo";

import img from "../../asset/1614306161615.png";

import "./articleItem.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNavigate() {
    const blogId = this.props.data.blogId;
    Taro.navigateTo({ url: `/pages/article/article?blogId=${blogId}` });
  }

  render() {
    const { data } = this.props;
    console.log("data: ", data);
    const releaseTime = timeFormat(data.pubtime);

    return (
      <View className="articleItem" onClick={this.handleNavigate.bind(this)}>
        <Image
          className="articleLeftImg"
          mode="aspectFill"
          src={data.titleImg || img}
        />
        <View className="articleRightBox">
          <View className="articleTypeBox">
            <Text>{data.typeName}</Text>
          </View>
          <View className="articleTitle">
            <Text>{data.title}</Text>
          </View>
          <AuthorInfo
            headImgSrc="https://i1.hdslb.com/bfs/face/8fcc083bbd148db4bdd4ba79c7231f5667956536.jpg@85w_85h.jpg"
            authorName="BananaBoat"
            releaseTime={releaseTime}
          ></AuthorInfo>
        </View>
      </View>
    );
  }
}
