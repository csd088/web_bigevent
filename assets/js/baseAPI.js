//注意:每次调用$.get() 或$.post() 或$.ajax() 的时候，
//会先调用ajaxPrefilter 这个函数



//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(option) {
    // 在发起真正的Ajax 请求之前，统一拼接请求的根路径
    option.url = 'http://www.liulongbin.top:3007' + option.url

    //为需要权限的接口设置header
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //统一权限控制 
    option.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空token 并跳回登录页
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }


})