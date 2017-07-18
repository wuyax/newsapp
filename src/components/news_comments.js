import React,{PropTypes} from 'react';
import axios from 'axios';
import {Card} from 'antd';

export default class NewsComments extends React.Component{
    //约束传入的参数
    static propTypes = {
        uniqueKey: PropTypes.string.isRequired,
        update:PropTypes.bool.isRequired
    }
    constructor(props){
            super(props);
            this.state = {
                comments:[]
            }
    }
    //解决直接访问时候评论无法加载的问题
    componentDidMount() {
        this.componentWillReceiveProps();
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
        let comment = comments.length === 0?'没有评论':(comments.map((comment,index)=>{
            return(<div key={index} className="newscomment">
                <Card  title={`用户：${comment.UserName}`} extra={`发布于：${comment.datetime}`}>
                    <p>{comment.Comments}</p>
                </Card>
            </div>)
        }))

        return(
            <div >
                {comment}
            </div>
        )
    }
}