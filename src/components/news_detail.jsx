import React, {Component} from 'react';
import {Row,Col,Card,BackTop} from 'antd';
import axios from 'axios';
import Article from './news_artical';
import MoreNews from './news_moreNews';
import NewsComments from './news_comments';
import AddComment from './news_addcomment';
/*
新闻详情组件
 */
export default class NewsDetail extends Component {
    constructor(props){
            super(props);
            this.state = {
                newsDetil:{},
                update:false
            }
        }

    componentDidMount(){
        // console.log('componentDidMount')
        this.getNews();
    }
    getNews= ()=>{
        let uniquekey=this.props.params.uniqueKey;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`;
        axios.get(url)
            .then((response)=>{
                let result = response.data;
                if(response){
                    // console.log(result.title);
                    this.setState({
                        newsDetil:result
                    })
                };
                document.title = result.title + " - React News | React 驱动的新闻平台";
            });
    }
    //这个函数纯粹是为了解决跨模块发请求才写的，从addcomment代用这个函数，然后更新comments
    //如果传递参数，也许能做更多的事情。
    update= ()=>{
        this.setState({
            update:true
        });
    }

    render () {
        let {uniqueKey} = this.props.params;
        return (
          <div>
            <Row>
              <Col span={1}/>
              <Col span={16}>
                  <div>
                      <Article uniqueKey={uniqueKey}/>
                  </div>
                  <div className="newscomments">
                      <NewsComments uniqueKey={uniqueKey} update={this.state.update}/>
                  </div>
                  <div className="addcomment">
                      <AddComment uniqueKey={uniqueKey} update={this.update}/>
                  </div>
              </Col>
                <Col span={6}>
                    <div className="moreNews">
                        {/*这段代码需要优化，通过读者点击的链接来获取来动态的推荐相关新闻*/}
                        <Card title="相关新闻">
                            {<MoreNews/>}
                        </Card>
                    </div>
                </Col>
              <Col span={1}>
                  <BackTop/>
            </Col>
            </Row>
          </div>
    )
  }
}