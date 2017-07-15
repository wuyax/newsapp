import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row, Col,Carousel} from 'antd';
import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';
import carousel_4 from '../images/carousel_4.jpg';
/*
 包含各种新闻列表容器组件
 */
export default class NewsContainer extends Component {
  render () {
    return (
      <div>
        <Row>
            <Col span={1}/>
            <Col span={22}>
                <div className="leftContainer" style={{width: "35%"}}>
                    <Carousel autoplay>
                    <div><img src={carousel_1} alt="111"/></div>
                    <div><img src={carousel_2} alt="111"/></div>
                    <div><img src={carousel_3} alt="111"/></div>
                    <div><img src={carousel_4} alt="111"/></div>
                </Carousel>
                </div>
            </Col>
            <Col span={1} />
        </Row>
      </div>
    )
  }
}