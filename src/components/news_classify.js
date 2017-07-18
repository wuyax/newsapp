import React from 'react';
import {Row,Col,Card} from 'antd';
import axios from 'axios';
import {Link} from 'react-router';

export default class NewsClassify extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                newsArr:[]
            }
        }

    componentWillReceiveProps() {
        let {type} = this.props.params
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=20`
        axios.get(url)
            .then((response)=>{
                let result = response.data;
                this.setState({
                    newsArr:result
                });
            })
    }




    render(){
        let {newsArr}=this.state
        let news = newsArr.length===0
            ?'还没有新闻！'
            :(<ul className="classify">
                {
                    newsArr.map((news , index)=>{
                        let {uniquekey,title} = news;
                        return (
                            <li key={index}>
                                <Link to = {`/detail/${uniquekey}`}>{title}</Link>
                            </li>
                        )
                    })
                }
            </ul>)


        return(
            <div>
                <Row>
                    <Col span={1}/>
                    <Col span={22}>
                        <div className="classifylist">
                            <Card>{news}</Card>
                        </div>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>
        )
    }
}