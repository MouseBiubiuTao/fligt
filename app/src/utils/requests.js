function requests(method,url){
    this.$axios({
        method:method,
        url:'/g'+url,
        // data:this.qs.stringify({    //这里是发送给后台的数据
              
        // })
    })
    // .then((response) =>{          //这里使用了ES6的语法
    //     console.log(response)       //请求成功返回的数据
    // }).catch((error) =>{
    //     console.log(error)       //请求失败返回的数据
    // })
}
export default requests