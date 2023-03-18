import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";

import "./authorInfo.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { headImgSrc, authorName, releaseTime } = this.props;

    return (
      <View className='authorBox'>
        <Image className='headImg' src={headImgSrc} mode='aspectFill' />
        <Text className='authorName'>{authorName}</Text>
        <Text>•</Text>
        <Text className='releaseTime'>{releaseTime}</Text>
      </View>
    );
  }
}
