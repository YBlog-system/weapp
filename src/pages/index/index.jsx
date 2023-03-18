import { Component } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import SearchBox from "../../components/searchBox";
import RecommendBox from "../../components/article/recommendBox";
import ArticleBox from "../../components/article/articleBox";
import TopBar from "../../components/topBar";

// eslint-disable-next-line import/first
import "./index.scss";

export default class Index extends Component {
  handleNavigate() {
    console.log("object :>> ");
    Taro.navigateTo({ url: `/pages/navigation/navigation` });
  }

  render() {
    return (
      <View className='index'>
        <TopBar
          text='Home'
          leftIcon='horizontal'
          onLeftClick={this.handleNavigate.bind(this)}
        ></TopBar>
        <SearchBox></SearchBox>
        <RecommendBox></RecommendBox>
        <ArticleBox></ArticleBox>
      </View>
    );
  }
}
