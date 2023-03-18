import { View, Text } from "@tarojs/components";
import { Component } from "react";
import Taro from "@tarojs/taro";
import { getRecommendList } from "../../api/api";
// import Taro from "@tarojs/taro";
import RecommendItem from "./recommendItem";

import "./recommendBox.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendData: [],
    };
  }

  async componentDidMount() {
    const result = await getRecommendList();
    console.log('result: ', result);
    this.setState({ recommendData: result });
  }

  handleNavigate() {
    console.log('to :>> articleList');
    Taro.navigateTo({ url: `/pages/articleList/articleList` });
  }

  render() {
    const { recommendData } = this.state;
    const element = recommendData.map((item, i) => {
      return <RecommendItem key={i} data={item}></RecommendItem>;
    });

    return (
      <View id='recommendBox'>
        <View id='recommendTitle'>
          <Text>Recommend</Text>
          <Text onClick={this.handleNavigate.bind(this)}>Show All</Text>
        </View>
        <View id='recommendList'>{element}</View>
      </View>
    );
  }
}
