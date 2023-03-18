import { Text, View } from "@tarojs/components";
import { Component } from "react";
import SquareButton from "./button/squareButton";

import "./topBar.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { leftIcon, onLeftClick, rightIcon, onRightClick, text } = this.props;
    return (
      <View className='topBar'>
        <SquareButton icon={leftIcon} onClick={onLeftClick}></SquareButton>
        <Text>{text}</Text>
        <SquareButton icon={rightIcon} onClick={onRightClick}></SquareButton>
      </View>
    );
  }
}
