import { View, Text } from "@tarojs/components";
import { Component } from "react";
import Taro from "@tarojs/taro";
import ArticleItem from "./articleItem";

import Cache from "../../cache/cache";

import "./articleBox.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: [],
    };
  }

  async componentDidMount() {
    const res = await Cache.getArticleList(4);
    console.log('res: ', res);
    this.setState({ articleData: res });
  }

  handleNavigate() {
    console.log('to :>> articleList');
    Taro.navigateTo({ url: `/pages/articleList/articleList` });
  }

  render() {
    const { articleData } = this.state;
    const element = articleData.map((item, i) => {
      return <ArticleItem key={i} data={item}></ArticleItem>;
    });

    return (
      <View id='articleBox'>
        <View id='articleTitle'>
          <Text>Article</Text>
          <Text onClick={this.handleNavigate.bind(this)}>Show All</Text>
        </View>
        <View id='articleList'>{element}</View>
      </View>
    );
  }
}
