import { Component } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro"
import ArticleContent from "../../components/article/articleContent";
import TopBar from "../../components/topBar"

// eslint-disable-next-line import/first
import "./article.scss";

export default class Index extends Component {
  handleNavigate() {
    Taro.navigateBack();
  }

  render() {
    return (
      <View className='article'>
        <TopBar text='Article' leftIcon='rect-left' onLeftClick={this.handleNavigate.bind(this)} />
        <ArticleContent></ArticleContent>
      </View>
    );
  }
}
