import { Component } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Icon } from "@nutui/nutui-react-taro";

import UserInfo from "../../components/person/userInfo";
import Navigation from "../../components/navigation/navigation";
import PagesCard from "../../components/navigation/pagesCard";

// eslint-disable-next-line import/first
import "./navigation.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);

    const routerInfo = Taro.getCurrentPages();
    console.log("routerInfo: ", routerInfo);
    const lastRouter = `/${routerInfo[routerInfo.length - 2].route}`; // 寻找跳转到导航之前的路径

    const navigationData = [
      {
        icon: "home",
        text: "Home",
        routerRoute: "/pages/index/index",
        focus: false,
      },
      {
        icon: "my2",
        text: "Profile",
        routerRoute: "/pages/profile/profile",
        focus: false,
      },
      {
        icon: "category",
        text: "Category",
        routerRoute: "/pages/articleList/articleList",
        focus: false,
      },
    ];

    const lastRouterIndex = navigationData.findIndex(
      (item) => item.routerRoute === lastRouter
    );
    navigationData[lastRouterIndex].focus = true;

    this.state = {
      navigationData,
    };
  }

  toBack() {
    Taro.navigateBack();
  }

  highlightItem(index) {
    console.log("index: ", index);
    const { navigationData } = this.state;
    console.log("navigationData: ", navigationData);
    navigationData.forEach((element) => {
      element.focus = false;
    });
    navigationData[index].focus = true;
    this.setState({ navigationData });
  }

  render() {
    const { navigationData } = this.state;

    return (
      <View id='navigationBar'>
        <View id='navigationUserInfoBox'>
          <UserInfo
            headImgSrc='https://i1.hdslb.com/bfs/face/8fcc083bbd148db4bdd4ba79c7231f5667956536.jpg@85w_85h.jpg'
            userName='BananaBoat'
            readTime='10 min'
            style={[{ color: "#F7F7F8" }, { color: "#7F8895" }]}
          />
          <Icon
            className='userRightIcon'
            name='close'
            color='#EAECEE'
            size='15'
            onClick={this.toBack.bind(this)}
          ></Icon>
        </View>

        <Navigation
          navigationData={navigationData}
          highlightItem={this.highlightItem.bind(this)}
        />
        <PagesCard
          cardData={navigationData}
          highlightItem={this.highlightItem.bind(this)}
        />
      </View>
    );
  }
}
