## 说明
这是一个以React技术为核心的新闻网站，通过使用```http://newsapi.gugujiankong.com/Handler.ashx```提供的测试接口，模拟真实情况。

**实现以下功能：**
- 用户登录和注册
- 网站首页
- 新闻详情
- 相关新闻推荐
- 获取用户评论列表
- 登录用户发表评论
- 用户中心
	- 用户收藏列表
	- 用户发出的评论列表

## 技术选型
1. React
2. React-Router
3. axios
4. antd
5. ES6
6. Babel, webpack等流行的库

## 运行
1. 下载依赖包
```
npm install
```

2. 启动项目
```
npm start
```
3. 访问 ```http://localhost:3000```
	如果端口冲突可以定位到```/scripts/start.js```第43行修改端口号。

## component
 1. app 应用主组件
 2. news_header 应用头部
 3. news_container 应用主体部分
 4. news_block 首页新闻块组件
 5. news_products 首页友情链接组件
 6. news_image_block 首页带图片的新闻组件
 7. news_classify 分类新闻组件
 8. news_detail 新闻详情组件
 9. news_artical 新闻详情主体部分
 10. news_comments 新闻详情评论列表组件
 11. news_addcomment 新闻详情添加评论组件
 12. news_moreNews 新闻详情相关新闻组件
 13. user_center 用户中心组件
 14. news_footer footer组件
