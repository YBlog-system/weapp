import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";

import Taro from "@tarojs/taro";

import "./userInfo.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { headImgSrc, userName, readTime, style } = this.props;
    const [style1, style2] = style;
    return (
      <View className='userLeftBox'>
      <Image className='headImg' src={headImgSrc} mode='aspectFill' />
      <View className='userRightBox'>
        <Text style={style1} className='userName'>
          {userName}
        </Text>
        <Text style={style2} className='readTime'>
          {readTime}
        </Text>
      </View>
    </View>
    );
  }
}
