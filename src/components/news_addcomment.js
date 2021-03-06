import React,{PropTypes} from 'react';
import {Form,Input,Button,notification} from 'antd';
import axios from 'axios';

const FormItem = Form.Item;



class AddComment extends React.Component{
    //约束传入的参数
    static propTypes = {
        uniqueKey: PropTypes.string.isRequired,
        update:PropTypes.func.isRequired
    }

    handleSubmit(ev){
        ev.preventDefault();
        const { getFieldValue,setFieldsValue} = this.props.form;
        let {update}= this.props;
        let user = localStorage.getItem('user');
        if(!user){
            notification['warning']({
                message: '你还没有登录',
                description: '只有登录用户才能发表评论，请登录发言！',
            });
            return;
        };
        //用户已登录
        user = JSON.parse(user);
        let {uniqueKey} = this.props;
        //获取用户输入的内容
        let commit = getFieldValue('comment');

        if(!commit){
            notification['warning']({
                message: '评论失败',
                description: '你还没有填写任何内容！',
            });
            return;
        }
        //发送ajax请求
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${user.UserId}&uniquekey=${uniqueKey}&commnet=${commit}`
        axios.get(url)
            .then((response)=>{
                if(response){
                    notification['success']({
                        message: '评论成功',
                        description: '你的评论已经发表了！',
                    });
                    //输入框设置为空
                    setFieldsValue({'comment':''})
                    //更新评论
                    update();
                }
            })
    }

    //收藏文章的功能
    addCollection(){
        // console.log(this);
        let user = localStorage.getItem('user');
        if(!user){
            notification['warning']({
                message: '收藏失败',
                description: '收藏文章，请先登录。',
            });
            return;
        }
        //用户已登录
        user = JSON.parse(user);
        let {uniqueKey} = this.props;
        //发送ajax请求
        let url  = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${user.UserId}&uniquekey=${uniqueKey}`
        axios.get(url)
            .then((response)=>{
            let result = response.data
                if(result===true){
                    notification['success']({
                        message: '收藏成功',
                        description: '这条新闻已经收藏到了你的收藏级，请到个人中心查看！',
                    });
                }
            })
    }

    render(){
        const { TextArea } = Input;
        const { getFieldDecorator} = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="addcommentbox">
                        <div className="addcommenttitle"><p>您的评论：</p></div>
                        <FormItem>
                            {getFieldDecorator('comment', {
                                rules: [{ required: true, message: '你还没有填写任何内容' }],
                            })(
                                <TextArea placeholder="随便写点儿什么" rows={6}/>
                            )}
                        </FormItem>

                    </div>
                    <div className="addcommentbtn">
                        <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>提交评论</Button>
                        {/*在这里我使用了bind()来绑定this,当然也可以通过箭头函数的形式实现绑定*/}
                        <Button type="primary" onClick={this.addCollection.bind(this)}>收藏文章</Button>
                    </div>
                </Form>
            </div>
        )
    }
}


export default Form.create()(AddComment);