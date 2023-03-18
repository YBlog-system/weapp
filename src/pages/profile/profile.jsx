import { Component } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import { getAuthorInfo } from "../../api/api";
import TopBar from "../../components/topBar";
import UserInfo from "../../components/person/userInfo";
import MarkdownBox from "../../components/markdownBox";

// eslint-disable-next-line import/first
import "./profile.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { authorInfo: "" };
  }

  async componentDidMount() {
    const result = await getAuthorInfo();

    this.setState({ authorInfo: result });
  }

  handleNavigate() {
    Taro.navigateTo({ url: `/pages/navigation/navigation` });
  }

  render() {
    return (
      <View className='profile'>
        <TopBar
          text='profile'
          leftIcon='horizontal'
          onLeftClick={this.handleNavigate.bind(this)}
        />
        <View id='authorInfoBox'>
          <UserInfo
            headImgSrc='https://i1.hdslb.com/bfs/face/8fcc083bbd148db4bdd4ba79c7231f5667956536.jpg@85w_85h.jpg'
            userName='BananaBoat'
            readTime='The world is mine oyster.'
            style={[{ color: "#2A384E" }, { color: "#949BA6" }]}
          />
          <MarkdownBox content={this.state.authorInfo}></MarkdownBox>
        </View>
      </View>
    );
  }
}
