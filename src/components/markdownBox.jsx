import { Component } from "react";
import { View } from "@tarojs/components";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "./markdownBox.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mdFile = this.props.content || "";

    const md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (e) {
            console.error(e);
          }
        }
        return ""; // 使用额外的默认转义
      },
    });
    const result = md.render(mdFile);


    return (
      <View
        className='markdown-body'
        dangerouslySetInnerHTML={{ __html: result }}
      ></View>
    );
  }
}
