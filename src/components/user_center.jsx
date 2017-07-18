import React from 'react';
import {Tabs,
        Card,
        Row,
        Col,
        Upload,
        Icon,
        Modal
    } from 'antd';
import {Link} from 'react-router';
import axios from 'axios';

const TabPane = Tabs.TabPane;
let user = localStorage.getItem('user');
    if(!user){
        user='{}';

    }
    user = JSON.parse(user);


export default class UserCenter extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                collections:[],
                comments:[],

                previewVisible: false,
                previewImage: '',
                fileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
            }
        }
    //图片上传需要的参数

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })




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

        //上传图片需要的数据
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );



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
                                           <div className="collectionlist" key={index}>
                                               <Card title={`文章ID：${collection.uniquekey}`}
                                                       extra={<Link to={`/detail/${collection.uniquekey}`}>查看新闻详情</Link>}>
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
                                            <div className="commentslist" key={index}>
                                                <Card title={`文章ID：${comment.uniquekey}`} extra={<Link to={`/detail/${comment.uniquekey}`}>查看新闻详情</Link>}>
                                                    {`评论内容：${comment.Comments}`}
                                                </Card>
                                            </div>
                                        )
                                    })

                                }
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="avtar">
                                    <Card>
                                        <div className="clearfix">
                                            <Upload
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                            >
                                                {fileList.length >= 3 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="avatar" style={{width: '100%'}} src={previewImage}/>
                                            </Modal>
                                        </div>
                                    </Card>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>
        )
    }
}