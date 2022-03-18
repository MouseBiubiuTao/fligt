module.exports = {
    lintOnSave: 'warning',
    devServer : {

        proxy:{
       
       '/api': { target:'http://192.168.43.33:8080', // 你请求的第三方接口
       
               changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
       
               pathRewrite:{  // 路径重写，
       
                 '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
       
               }
       
             }
       
       }
       
       }
    // devServer: {
    //     open: true,
    //     port: 8080,
    //     https: false,
    //     hotOnly: false,
    //     proxy: {
    //         '/g': {
    //             targer: 'http://192.168.43.33:8080',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '/g': ''
    //             }
    //         }

    //     }
    // }
}

// module.exports = {
// 	publicPath: './',
// 	productionSourceMap: false,
// 	devServer: {
// 		proxy: {
// 			'/test': {
// 				target: "http://192.168.43.33:8080",//这个是你要访问的接口地址
// 				changeOrigin: true,
// 				pathRewrite: {//重写地址  比如说 你的接口地址是'https://188.62.63/xxyy/getUser' 你请求得时候地址只需要写'/test/getUser'
// 					'/test': '/y'  
// 				}
// 			}
// 		}
// 	}
// }