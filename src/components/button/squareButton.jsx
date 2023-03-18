import { View } from "@tarojs/components";
import { Component } from "react";
import { Icon } from "@nutui/nutui-react-taro";

import "./squareButton.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { icon, onClick } = this.props;
    // console.log('icon: ', icon);

    return (
      <View className={`squareButton ${icon === undefined && "hidden"}`} onClick={onClick}>
        <Icon name={icon} size='20'></Icon>
      </View>
    );
  }
}
