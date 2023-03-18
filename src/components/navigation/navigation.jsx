import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { Icon } from "@nutui/nutui-react-taro";

import Taro from "@tarojs/taro";

import "./navigation.scss";

export default class navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { highlightItem: props.highlightItem };
  }

  navigationTo(i, routerRoute) {
    return () => {
      this.state.highlightItem(i);
      setTimeout(() => Taro.reLaunch({ url: routerRoute }), 500);
    };
  }

  navigationItem = (props) => {
    // console.log("props :>> ", props);
    const { index, icon, text, focus, routerRoute } = props;
    const navigateFunc = this.navigationTo.bind(this)(index, routerRoute);

    return (
      <View
        className={`navigationItem ${focus == true && "active"}`}
        onClick={navigateFunc}
      >
        <Icon className='navigationItemIcon' name={icon} size={18}></Icon>
        <Text>{text}</Text>
      </View>
    );
  };

  render() {
    const { navigationData } = this.props;
    // console.log("highlightItem: ", highlightItem);

    const navigateEle = navigationData.map((item, i) => {
      return (
        <this.navigationItem
          focus={item.focus}
          key={i}
          index={i}
          icon={item.icon}
          text={item.text}
          routerRoute={item.routerRoute}
        />
      );
    });

    return <View id='navigationBox'>{navigateEle}</View>;
  }
}
