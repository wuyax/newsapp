import React,{PropTypes} from 'react';
import axios from 'axios';

export default class Artical extends React.Component{
    //指定需要传递的参数，方便错误排查。
    static propTypes = {
        uniqueKey: PropTypes.string.isRequired
    }
    constructor(props){
            super(props);
            this.state = {
                article:{}
            }
        }
    //使用componentWillReceiveProps是为了解决点击{相关新闻}时无法跳转的情况，每次更新属性时都重新发送请求。
    componentWillReceiveProps(){
        let {uniqueKey} = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`;
        axios.get(url)
            .then((response)=>{
            let result = response.data;
                if(result){
                    this.setState({
                        article:result
                    });
                    document.title = result.title + " - React News | React 驱动的新闻平台";
                }else {
                    return;
                }
            }
            );
    }
    render(){
        //获取文章主体 html 页面
        let {pagecontent} = this.state.article;
        return(
            <div>
                <article>
                    <div className="article-content">
                        <div dangerouslySetInnerHTML={{__html: pagecontent}}/>
                        <hr/>
                    </div>
                </article>
            </div>
        )
    }
}