import React from 'react';
import {Tabs,
        Card,
        Row,
        Col,
        Upload,
        Icon,
        Modal
    } from 'antd';
import axios from 'axios';

const TabPane = Tabs.TabPane;
let user = localStorage.getItem('user');
    user = JSON.parse(user);


export default class UserCenter extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                collections:[],
                comments:[]
            }
        }

    componentWillMount() {
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${user.UserId}`;
        axios.get(url)
            .then((response)=>{
            let result = response.data;
                if(result){
                    this.setState({
                        collections:result
                    })
                }
            })
    }

    componentDidMount() {
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${user.UserId}`;
        axios.get(url)
            .then((response)=>{
                let result = response.data;
                if(result){
                    this.setState({
                        comments:result
                    })
                }
            })
    }


    render(){
        let {collections,comments} = this.state;
        return(
            <div className="collection">
                <Row>
                    <Col span={1}/>
                    <Col span={22}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="我的收藏列表" key="1">
                                {
                                   collections.map((collection,index)=>{
                                       return (
                                           <div className="collectionlist">
                                               <Card title={`文章ID：${collection.uniquekey}`} key={index}
                                                       extra={<a href="#">查看详情</a>}>
                                                   {`文章标题：${collection.Title}`}
                                               </Card>
                                           </div>
                                       )
                                   })
                                }
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                {
                                    comments.map((comment,index)=>{
                                        return(
                                            <div className="commentslist">
                                                <Card title={`文章ID：${comment.uniquekey}`} key={index} extra={<a href="###">查看详情</a>}>
                                                    {`评论内容：${comment.Comments}`}
                                                </Card>
                                            </div>
                                        )
                                    })

                                }
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <Card>

                                </Card>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>
        )
    }
}