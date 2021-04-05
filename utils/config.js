
 var url = 'http://27.0.0.1:300/';//服务器接口，感谢https://github.com/Binaryify/NeteaseCloudMusicApi提供的api
 

module.exports = {
  loginUrl: url + 'login/cellphone/' ,//登录接口 login/cellphone?phone=xxx&password=yyy
  refreshUrl: url+'login/refresh/' ,//刷新登录，如果接口为200，则说明刷新成功
  signinUrl:url+'daily_signin' ,//签到接口
  songUrl:url+"song/url/", //歌曲url
  songDetailUrl:url+"song/detail/", //歌曲详情
  songDanUrl:url+"user/playlist/",//获取歌单
  songDanDetailUrl:url+"playlist/detail/",//歌单详情
  userDetailUrl:url+"user/detail/" ,//用户信息
  cloudUrl:url+"user/cloud",//云盘
  zanUrl:url+"recommend/songs",//每日推荐
  top:url+"recommend/songs"//排行榜
};