<script>
import store from './store/index'
export default {
  onLaunch: function () {
    
    console.log('App Launch')
    // #ifdef APP-PLUS
        if(!plus.runtime.isAgreePrivacy()){
            alert("laji")
        }
    // #endif  
    // #ifdef APP-PLUS
				const  server = "http://api.app-store.dev.yeleonline.com/api/5ee745d5552d2"; // 检查更新地址  
				function plusReady(){  
					// 获取本地应用资源版本号  
					plus.runtime.getProperty(plus.runtime.appid,  (inf) => {  
						console.log(inf)
						//升级检测数据
						var req = { 
						     "version": inf.version
						 }; 
						 console.log(req)
						 getCheckVersion(req)
					}); 
				}  
				function getCheckVersion(req) {
					// 请求版本升级服务器，判断是否需要更新
				    uni.request({
					    url:server,  
					    data:req,
              header:{"access-token":"HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd"},
					    success: (res) => {  
                if( res.data.data.length !== 0 && req.version !== res.data.data.new_version ){
                  uni.showModal({
                      title: '更新提示',
                      showCancel:true,
                      content: res.data.data.upgrade_text ? res.data.data.upgrade_text : '版本更新：修复Bug', 
                      success: (c) => {
                        if (c.confirm) {
                            // 去下载新版本app
                            // 下载wgt文件  
                            const wgtUrl= res.data.data.download_url;
						                    console.log(wgtUrl)
                               var showLoading = plus.nativeUI.showWaiting("正在下载", {back:"none"});
                            const downloadTask = uni.downloadFile({
                                url: wgtUrl, 
                                success: (res) => {
                                    if (res.statusCode === 200) {
                                        // tempFilePath
                                        showLoading.setTitle('安装中...')
                                        plus.runtime.install(res.tempFilePath,{}, () => {  
                                            plus.nativeUI.closeWaiting();  
                                            uni.showModal({
                                                  title: '',
                                                  showCancel:false,
                                                  content: '更新成功',
                                                  success:  (res) => {
                                                      if (res.confirm) {
                                                          plus.runtime.restart();  
                                                      }
                                                  }
                                              });
                                            // plus.nativeUI.alert("应用资源更新完成！",function(){  
                                            // });  
                                        }, (e) => {  
                                            plus.nativeUI.closeWaiting();  
                                            plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);  
                                        });  
                                    }else{
                                        plus.nativeUI.closeWaiting();  
                                       plus.nativeUI.toast('下载失败');
                                    }
                                }
                            });
                            downloadTask.onProgressUpdate((res) => {
                                  console.log('下载进度' + res.progress);
                                  // setTitie(res.progress)
                                if(isNaN(res.progress)){
                                    res.progress = 0
                                }
                                if( uni.getSystemInfoSync().platform === 'android'){
                                    if(res.progress % 10 === 0){
                                      showLoading.setTitle(`已下载${res.progress}%`)
                                    }else{
                                      showLoading.setTitle(`已下载${res.progress}%`)
                                    }
                                }else{
                                    showLoading.setTitle(`已下载${res.progress}%`)
                                } 
                            });
                        } else if (c.cancel) {
                            console.log('用户点击取消');
                        }
                      }
                  });
                }
					    }, 
						complete:(res)=>{
							console.log(res)
						}
					}) 
				}
			   plusReady(); 
    // #endif  
    
  },
  onShow: () => {
    console.log('App Show')
    uni.onNetworkStatusChange(res => {
      store.dispatch('status/setStatus', res.isConnected)
    })
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
@import './static/font/iconfont.css';
page{
  background: #F7F7F7;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

uni-radio .uni-radio-input.uni-radio-input-checked::before {
    font: normal normal normal 14rpx/1 uni;
    content: "\EA08";
    color: #000 !important;
    font-size: 36rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-48%) scale(.73);
    -webkit-transform: translate(-50%,-48%) scale(.73);
}
</style>
