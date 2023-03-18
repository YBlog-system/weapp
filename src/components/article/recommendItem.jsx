import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import img from "../../asset/1614306161615.png";
import AuthorInfo from "../person/authorInfo";

import "./recommendItem.scss";
import { timeFormat } from "../../util/util";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNavigate() {
    const blogId = this.props.data.blogid;
    Taro.navigateTo({ url: `/pages/article/article?blogId=${blogId}` });
  }

  render() {
    const { data } = this.props;
    const releaseTime = timeFormat(data.pubtime);
    console.log("data: ", data);

    return (
      <View className='recommendItem' onClick={this.handleNavigate.bind(this)}>
        <Image className='recommendImage' mode='aspectFill' src={img} />
        <View className='recommendTypeBox'>
          <Text>{data.typeName}</Text>
          <Text>•</Text>
          <Text>推荐</Text>
        </View>
        <View className='recommendTitle'>
          <Text>{data.title}</Text>
        </View>

        <AuthorInfo
          headImgSrc='https://i1.hdslb.com/bfs/face/8fcc083bbd148db4bdd4ba79c7231f5667956536.jpg@85w_85h.jpg'
          authorName='BananaBoat'
          releaseTime={releaseTime}
        ></AuthorInfo>
      </View>
    );
  }
}
