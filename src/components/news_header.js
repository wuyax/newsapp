/**
 * 头部组件
 */
import React, {Component} from 'react'
import {Link} from 'react-router';
import axios from 'axios';
import {
  Row, // 行
  Col, // 列
  Menu, // 菜单
  Icon,  // 图标
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    notification
} from 'antd'

import logo from '../images/logo.png'

// 非import语句必须在import语句之后
const MenuItem = Menu.Item

class NewsHeader extends Component {

  constructor (props) {
    super(props)
    // 初始化状态
    this.state = {
        username: null,
        selectKey: 'top',
        visiable:false

    }
  }
  //加载页面是检查存储在本地的用户数据
  componentDidMount(){
      let user = localStorage.getItem('user');
      if(user){
          let {NickUserName,UserId}=JSON.parse(user)
          this.setState({
              username:NickUserName,
              userid:UserId
          })
      }
  }
  // 处理点击menuitem的回调
  handleClickItem = (event) => {
    // 更新selectKey
    this.setState({
        selectKey: event.key
    });
    if(event.key==='rigister'){
        this.setState({
            visiable:true
        })
    }
  }
    handleOk= ()=>{
        this.setState({
            visiable:false
        })
    }

    login = ()=>{
      let username = this.refs.username.value;
        this.setState({
            visiable:false
        });
        this.setState({
            username
        })
    }
    logout = ()=>{
        this.setState({
            username:null
            })
        localStorage.removeItem('user');
    }


    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_passWord')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    //检查表单的，但是不知道怎么用
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    //发送登录或者注册请求
    handleSubmit = (isRegisit,e) => {
        e.preventDefault();
        let {getFieldsValue,resetFields,setFieldsValue} = this.props.form;
        let {userName,passWord,r_userName,r_passWord,r_confirmPassWord} = getFieldsValue();
        //http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=abc&r_password=123123&r_confirmPassword=123123





        let url = `http://newsapi.gugujiankong.com/Handler.ashx?`;
        if(isRegisit){
            url+= `action=register&r_userName=${r_userName}&r_password=${r_passWord}&r_confirmPassword=${r_confirmPassWord}`
            if(!r_userName||!r_passWord||!r_confirmPassWord){
                notification['warning']({
                    message: '注册失败',
                    description: `请填写完整的表单项！`,
                });
                resetFields();
                return;
            }else if(r_passWord!==r_confirmPassWord){
                notification['warning']({
                    message: '注册失败',
                    description: `两次输入的密码不一致，请检查后重新输入！`,
                });
                setFieldsValue({
                    r_passWord:'',
                    r_confirmPassWord:''
                })
            }else {
                axios.get(url)
                    .then((respons)=>{
                        let result = respons.data;
                        if(!result){
                            notification['error']({
                                message: '注册失败',
                                description: `用户名${r_userName}已经被占用，请选择其它的用户名！`,
                            });
                            setFieldsValue({
                                r_passWord:'',
                                r_confirmPassword:''
                            })
                        }else {
                            notification['success']({
                                message: '注册成功',
                                description: `${r_userName}欢迎加入，登录以后就可以畅所欲言了！`,
                            });
                            resetFields();

                            this.setState({
                                visiable:false
                            })
                        }
                    })
            }
        }else {
            //login
            //http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
            url+= `action=login&username=${userName}&password=${passWord}`;
            if(!userName||!passWord){
                notification['warning']({
                    message: '登录错误',
                    description: '请检查用户名或者密码是否输入正确！',
                });
                return;
            }
            axios.get(url)
                .then((respons)=>{
                    let result = respons.data;
                    if(result){
                        //登录成功
                        this.setState({
                            username:result.NickUserName,
                            visiable:false
                        });
                        let {UserId,NickUserName}=result;
                        localStorage.setItem('user',JSON.stringify({UserId,NickUserName}));
                        //清空用户登录的信息
                        resetFields();
                        //提示信息
                        notification['success']({
                            message: '登录成功',
                            description: `${NickUserName}欢迎回来，你可以畅所欲言了！`,
                        });
                    }else {
                        //登录失败
                        notification['error']({
                            message: '登录失败',
                            description: '请检查用户名或者密码是否输入正确！',
                        });
                        //清空密码
                        setFieldsValue({
                            passWord:''
                        });
                    }
                })
        }

        /*this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.setState({
                    username:values.userName,
                    visiable:false
                })
            }
        });*/
    }

  render () {
      const {selectKey,username,visiable} = this.state;
      const TabPane = Tabs.TabPane;
      const FormItem = Form.Item;
      const {getFieldDecorator}=this.props.form;

      const userinfo = username?(
          <MenuItem key="logout" className="logoutBtn">
              <Button type="primary">{username}</Button>
              <Link to="/usercenter">
                  <Button type="dashed">用户中心</Button>
              </Link>
              <Button onClick  = {this.logout}><Link to="/">退出</Link></Button>
          </MenuItem>
      ):(
          <MenuItem key="rigister" style={{float:'right'}}>
              <Icon type="appstore-o"/>注册/登录
          </MenuItem>
      )

      return (
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="/" className="logo">
              <img src={logo} alt="logo"/>
              <span>News</span>
            </a>
          </Col>
          <Col span={19}>
            <div>
              <Menu mode="horizontal" selectedKeys={[selectKey]} onClick={this.handleClickItem}>
                <MenuItem key="top">
                  <Icon type="appstore-o"/>头条
                </MenuItem>
                <MenuItem key="shehui">
                  <Icon type="appstore-o"/>社会
                </MenuItem>
                <MenuItem key="guonei">
                  <Icon type="appstore-o"/>国内
                </MenuItem>
                <MenuItem key="guoji">
                  <Icon type="appstore-o"/>国际
                </MenuItem>
                <MenuItem key="yule">
                  <Icon type="appstore-o"/>娱乐
                </MenuItem>
                <MenuItem key="tiyu">
                  <Icon type="appstore-o"/>体育
                </MenuItem>
                <MenuItem key="keji">
                  <Icon type="appstore-o"/>科技
                </MenuItem>
                <MenuItem key="shishang">
                  <Icon type="appstore-o"/>时尚
                </MenuItem>
                  {userinfo}
              </Menu>
                    <Modal title="用户中心"
                           visible={visiable}
                           onOk={this.handleOk}
                           onCancel={this.handleOk}
                           okText = '关闭'
                           footer={null}
                           maskClosable={false}
                           width = '300px'
                    >
                        <Tabs type="card">
                            <TabPane tab="登录" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                    <FormItem label="用户名">
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('passWord', {
                                            rules: [{ required: true, message: 'Please input your password!' }],
                                        })(
                                            <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size = 'large'
                                            // onClick={this.login}
                                        >
                                            登&nbsp;&nbsp;录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                    <FormItem label="用户名">
                                        {getFieldDecorator('r_userName', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                                   placeholder="请输入用户名"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('r_passWord', {
                                            rules: [{ required: true, message: 'Please input your password!' }],
                                        })(
                                            <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                                   placeholder="请输入密码"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem label="确认密码">
                                        {getFieldDecorator('r_confirmPassWord', {
                                            rules: [{ required: true, message: 'Please input your confirm password!' }],
                                        })(
                                            <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                                   placeholder="请再次输入密码"
                                                   // onBlur = {this.checkPassword}
                                                   onBlur={this.handleConfirmBlur}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size = 'large'
                                        >
                                            注&nbsp;&nbsp;册
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
}


const WrappedHorizontalLoginForm = Form.create()(NewsHeader);

export default WrappedHorizontalLoginForm;