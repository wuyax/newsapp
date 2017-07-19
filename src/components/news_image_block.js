import React,{PropTypes} from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {Link} from 'react-router';
export default class NewsImageBlock extends React.Component{
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cardTitle: PropTypes.string.isRequired,
        cardWidth: PropTypes.string.isRequired,
        imageWidth: PropTypes.string.isRequired
    }
    constructor(props){
            super(props);
            this.state = {
                newsArr:[]
            }
        }

    componentDidMount(){
        const {type,count} = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then((response)=>{
                let result = response.data;
                this.setState({
                    newsArr:result
                });
            })
    }

    render(){
        let {newsArr} = this.state;
        let {cardWidth,imageWidth,cardTitle} = this.props;
        let imgStyles = {
            width: imageWidth,
            height: '90px',
            display: 'block'
        }
        // 定义标题的样式
        const titleStyles = {
            width: imageWidth,
            whiteSpace: "nowrap", // 不进行换行
            overflow: "hidden", // 超出部分自动隐藏
            textOverflow: "ellipsis" // 显示省略号
        }
        let newsList = newsArr.length?
            newsArr.map((news, index) => {
                const {uniquekey, thumbnail_pic_s, title, author_name} = news
                return (
                    <div className="imageblock" key={index}>
                        <Link to={`/detail/${uniquekey}`}>
                            <div>
                                <img src={thumbnail_pic_s} style={imgStyles}/>
                            </div>
                            <div className="custom-card">
                                <h3 style={titleStyles}>{title}</h3>
                                <p>{author_name}</p>
                            </div>
                        </Link>
                    </div>
                )
            }):'没有新闻'
        return(
            <Card title = {cardTitle} style={{width: cardWidth}} className="topNewsList" extra={<a href={`#/classify/${this.props.type}`}>More>></a>}>
                {newsList}
            </Card>
        )
    }
}