import React from 'react';
import axios from 'axios';



export default class Artical extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                article:{},
                moreNews:[]
            }
        }
    componentDidMount(){
        let uniqueKey = this.props.uniqueKey;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`;
        axios.get(url)
            .then((response)=>{
            let result = response.data;
                if(response){
                    this.setState({
                        article:result
                    })
                }
            });

    }
    render(){
        return(
            <div>
                <article>
                    <div className="title">
                        <div className="article-title">{this.state.article.title}</div>
                        <div className="article-title-time">
                            <span>{this.state.article.date}&nbsp;来源：&nbsp;{this.state.article.author_name}</span>
                        </div>
                    </div>
                    <div className="article-content">


                    </div>
                </article>
            </div>
        )
    }
}