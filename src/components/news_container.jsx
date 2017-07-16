import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row, Col,Carousel,Tabs} from 'antd';
import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';
import carousel_4 from '../images/carousel_4.jpg';
import NewsBlock from './news_block';
import NewsProducts from './news_products';
import NewsImageBlock from './news_image_block';
/*
 包含各种新闻列表容器组件
 */
export default class NewsContainer extends Component {
  render () {
      let TabPane = Tabs.TabPane;
    return (
      <div>
        <Row>
            <div className="container">
                <Col span={1}/>
                <Col span={22}>
                    <div className="leftContainer" style={{width: "35%"}}>
                        <Carousel autoplay>
                            <div><img src={carousel_1} alt="111"/></div>
                            <div><img src={carousel_2} alt="111"/></div>
                            <div><img src={carousel_3} alt="111"/></div>
                            <div><img src={carousel_4} alt="111"/></div>
                        </Carousel>
                        <NewsImageBlock type="keji" count={6} cardTitle="科技新闻" cardWidth="428px" imageWidth="112px"/>
                    </div>


                    <Tabs defaultActiveKey="1" className='tabs_news' style={{width: "35%"}}>
                        <TabPane tab="头条新闻" key="1">
                            <NewsBlock count={20} type={'top'}/>
                        </TabPane>
                        <TabPane tab="国际新闻" key="2">
                            <NewsBlock count={20} type={'guoji'}/>
                        </TabPane>
                    </Tabs>


                    <Tabs className='tabs_product' style={{width: "30%"}}>
                        <TabPane tab="新闻产品" key="1">
                            <NewsProducts/>
                        </TabPane>
                    </Tabs>


                    <NewsImageBlock type="shehui" count={8} cardTitle="社会新闻" cardWidth="100%" imageWidth="132px"/>
                    <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth="132px"/>
                    <NewsImageBlock type="shishang" count={8} cardTitle="时尚新闻" cardWidth="100%" imageWidth="132px"/>
                    <NewsImageBlock type="tiyu" count={8} cardTitle="体育新闻" cardWidth="100%" imageWidth="132px"/>
                    <NewsImageBlock type="yule" count={8} cardTitle="娱乐新闻" cardWidth="100%" imageWidth="132px"/>

                </Col>
                <Col span={1}/>
            </div>
        </Row>
      </div>
    )
  }
}