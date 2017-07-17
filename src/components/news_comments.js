import React from 'react';
import axios from 'axios';
import {Card} from 'antd';

export default class NewsComments extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                comments:[]
            }
        }
    componentWillReceiveProps(){
        let {uniqueKey}=this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniqueKey}`
        axios.get(url)
            .then((response)=>{
                let result = response.data;
                this.setState({
                    comments:result
                })
            })
    }
    render(){
        let {comments}=this.state;
        return(
            <div >
                {
                    comments.map((comment,index)=>{
                        return(<div key={index} className="newscomment">
                                <Card  title={`用户：${comment.UserName}`} extra={`发布于：${comment.datetime}`}>
                                    <p>{comment.Comments}</p>
                                </Card>
                        </div>)
                    })
                }
            </div>
        )
    }
}