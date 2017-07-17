import React from 'react';
import {Form,Input,Button} from 'antd';


export default class AddComment extends React.Component{
    render(){
        const { TextArea } = Input;
        return(
            <div>
                <Form>
                    <div className="addcommentbox">
                        <div className="addcommenttitle"><p>您的评论：</p></div>
                        <TextArea placeholder="随便写点儿什么" rows={6}/>
                    </div>
                    <div className="addcommentbtn">
                        <Button type="primary" style={{marginRight: '20px'}}>提交评论</Button>
                        <Button type="primary">收藏文章</Button>
                    </div>
                </Form>
            </div>
        )
    }
}