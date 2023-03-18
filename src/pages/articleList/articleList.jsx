import { Component } from "react";
import { View } from "@tarojs/components";
import { Menu, MenuItem } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import TopBar from "../../components/topBar";
import ArticleItem from "../../components/article/articleItem";

// eslint-disable-next-line import/first
import Cache from "../../cache/cache";
import "./articleList.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ text: "全部", value: 0 }],
      allArticle: [],
      selectedArticle: [],
    };
  }

  async componentDidMount() {
    const result = await Cache.getAllArticleList();

    // 文章分类
    const typeList = await Cache.getTypeList();

    const { options } = this.state;
    typeList.forEach((item) =>
      options.push({ text: item.typeName, value: item.typeId })
    );
    console.log("typeList :>> ", typeList);

    this.setState({ allArticle: result, selectedArticle: result, options });
  }

  selectArticleByTypeId(menuItem) {
    const { value: typeId } = menuItem;
    const { allArticle } = this.state;

    if (typeId === 0) {
      // 为零显示全部文章
      this.setState({ selectedArticle: allArticle });
      return;
    }

    const selectedArticle = allArticle.filter((item) => item.typeId === typeId);
    this.setState({ selectedArticle });
  }

  handleNavigate() {
    Taro.navigateTo({ url: `/pages/navigation/navigation` });
  }

  render() {
    const { options, selectedArticle } = this.state;

    const articleList = selectedArticle.map((item, i) => {
      return <ArticleItem data={item} key={i} />;
    });

    return (
      <View className='article'>
        <TopBar
          text='category'
          leftIcon='horizontal'
          onLeftClick={this.handleNavigate.bind(this)}
        />
        <View id='articleSelectBox'>
          <Menu activeColor='#26354B'>
            <MenuItem
              options={options}
              value={0}
              onChange={this.selectArticleByTypeId.bind(this)}
            />
          </Menu>
        </View>
        <View className='articleList'>{articleList}</View>
      </View>
    );
  }
}
