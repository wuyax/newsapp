import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
export default class MoreNews extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                moreNews:[]
            }
        }
    componentDidMount(){
         let urlMore = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=6`;
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
    render(){
        let {moreNews} = this.state;
        let result = moreNews?(
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
        ):"没有相关新闻！"
        return(
            <div>
                {
                    result
                }
            </div>
        )
    }
}