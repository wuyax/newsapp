import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';




export default class MoreNews extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                moreNews:[]
            }
        }
    componentDidMount(){
        let {uniqueKey}=this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
        axios.get(url)
            .then((response)=>{
                let result = response.data;
                if(result){
                    let type = result.realtype;
                    switch (type) {
                        case "头条":type='top';break;
                        case '国际':type='guoji';break;
                        case "社会":type='shehui';break;
                        case "国内":type='guonei';break;
                        case "娱乐":type='yule';break;
                        case "科技":type='keji';break;
                        case "时尚":type='shishang';break;
                        case "体育":type='tiyu';break;
                    };
                    let urlMore = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=6`;
                    axios.get(urlMore)
                        .then((response)=>{
                            let result = response.data;

                            if(response){
                                this.setState({
                                    moreNews:result
                                })
                            }
                        })
                }
            })

    }
    render(){
        let {moreNews} = this.state;
        let result = moreNews.length===0?"没有相关新闻！":(
            moreNews.map((news,index)=>{
                const {uniquekey, thumbnail_pic_s, title, author_name} = news
                return (
                    <div className="imageblockMore" key={index}>
                        <Link to={`/detail/${uniquekey}`}>
                            <div>
                                <img src={thumbnail_pic_s} />
                            </div>
                            <div className="custom-card">
                                <h3 >{title}</h3>
                                <p>{author_name}</p>
                            </div>
                        </Link>
                    </div>
                )
            })
        )
        return(
            <div>
                {
                    result
                }
            </div>
        )
    }
}