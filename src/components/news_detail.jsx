import React, {Component} from 'react';
import {Row,Col,Card} from 'antd';
import axios from 'axios';
import Article from './news_artical';
import MoreNews from './news_moreNews';
/*
新闻详情组件
 */
export default class NewsDetail extends Component {
    constructor(props){
            super(props);
            this.state = {
                newsDetil:{}
            }
        }
    componentDidMount(){
        let uniquekey=this.props.params.uniqueKey;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`;
        axios.get(url)
            .then((response)=>{
                let result = response.data;
                if(response){
                    console.log(result.title);
                    this.setState({
                        newsDetil:result
                    })
                }
            });

    }

    render () {
        return (
          <div>
            <Row>
              <Col span={1}/>
              <Col span={16}>
                  <div>
                      <Article uniqueKey={this.props.params.uniqueKey}/>
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
              <Col span={1}/>
            </Row>
          </div>
    )
  }
}