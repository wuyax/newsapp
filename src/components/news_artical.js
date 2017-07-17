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
    componentWillReceiveProps(){
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
        let pagecontent = this.state.article.pagecontent;
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