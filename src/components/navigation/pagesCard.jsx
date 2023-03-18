import { Component } from "react";
import { View, ScrollView, Image } from "@tarojs/components";
import _ from "lodash";

import homeImg from "../../asset/home.png";
import profileImg from "../../asset/profile.png";
import categoryImg from "../../asset/category.png";


import "./pagesCard.scss";

export default class card extends Component {
  constructor(props) {
    super(props);
    const { cardData, highlightItem } = this.props;
    this.state = { cardData, highlightItem };
  }

  ScollChangeStyle(event) {
    const { detail } = event;
    const { scrollWidth, scrollLeft, deltaX } = detail;
    const { cardData } = this.state;
    const perWidth = scrollWidth / cardData.length - 10;
    if (deltaX < 0 && scrollLeft / perWidth >= 1) {
      // 向左滑动 大于平均一份 - 10px 替换下一个为激活状态
      const activeNum = (scrollLeft / perWidth).toFixed();

      this.onFocus(activeNum);
    } else if (deltaX > 0 && scrollLeft / perWidth < cardData.length) {
      // 向右滑动
      const activeNum = (scrollLeft / perWidth).toFixed();

      this.onFocus(activeNum);
    }
  }

  onFocus(index) {
    const { cardData, highlightItem } = this.state;

    cardData.forEach((element) => {
      element.focus = false;
    });
    cardData[index].focus = true;
    this.setState({ cardData });
    highlightItem(index);
  }

  cardItem(props) {
    // const img = import(`../../asset/${props.text.toLowerCase()}.png`);
    let imgSrc;
    switch (props.text.toLowerCase()) {
      case "home":
        imgSrc = homeImg;
        break;
      case "profile":
        imgSrc = profileImg;
        break;
      case "category":
        imgSrc = categoryImg;
        break;
      default:
        imgSrc = homeImg;
        break;
    }

    return (
      <Image
        src={imgSrc}
        id={props.id}
        className={`card ${props.focus && "active"}`}
        mode='widthFix'
      ></Image>
      // <View id={props.id} className={`card ${props.focus && "active"}`}>
      //   {props.text}
      // </View>
    );
  }

  render() {
    const { cardData } = this.state;

    const navigateEle = cardData.map((item, i) => {
      return (
        <this.cardItem
          focus={item.focus}
          id={`card${i}`}
          key={i}
          text={item.text}
        />
      );
    });

    const focusIndex = _.findIndex(cardData, (item) => item.focus);

    console.log("focusIndex: ", focusIndex);

    return (
      <View id='cardBoxBorder'>
        <ScrollView
          id='cardBox'
          scrollX
          enhanced
          pagingEnabled
          onScroll={_.debounce(this.ScollChangeStyle.bind(this), 100)}
          scrollIntoView={`card${focusIndex}`}
        >
          {navigateEle}
        </ScrollView>
      </View>
    );
  }
}
