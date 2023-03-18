import { Component } from "react";
import { Icon } from "@nutui/nutui-react-taro";
import { View, Input } from "@tarojs/components";

import "./searchBox.scss";

export default class index extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      value: "",
    };
  }
  onChange(value) {
    this.setState({
      value: value,
    });
  }
  onActionClick() {
    console.log("开始搜索");
  }

  render() {
    return (
      <View id='searchBox'>
        <View id='searchBar'>
          <Icon name='search2' id='searchIcon' size='20' color='#364458'></Icon>
          <Input type='text' placeholder='Search Something'></Input>
        </View>
      </View>
    );
  }
}
