$(function() {
    $('#link_login').on('click', function(e) {
        console.log(e)
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#link_reg').on('click', function(e) {
        console.log(e)
        $('.login-box').hide()
        $('.reg-box').show()

    })



    // 自定义表单验证
    //1、获取layui表单
    let form = layui.form
        //获取layer 使用layer内置方法
    let layer = layui.layer
    form.verify({
        // 校验密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验确认密码是否和第一次的一致
        //value 为确认密码的值
        //如果失败 return 一个提示文字
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val()
            console.log(pwd)
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }

        }
    })



    // 监听注册按钮
    $('#form_reg').on('submit', function(e) {
        console.log('submit')
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) {
                console.log(res.message)
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录！')
            $('#link_login').click()

        })
    })

    // 监听登录按钮
    $('#form_login').on('submit', function(e) {
        console.log('login')
        e.preventDefault()
        $.ajax({
                url: "/api/login",
                method: 'POST',
                //快速获取表单内容
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res)

                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 将token存到本地
                    localStorage.setItem('token', res.token)
                        //跳转页面
                    location.href = '/index.html'
                }
            })
            // $.post(baseUrl + '/api/login', {
            //     username: $('#form_login [name=username]').val(),
            //     password: $('#form_login [name=password]').val()
            // }, function(res) {
            //     console.log(res)
            //     if (res.status !== 0) {
            //         return layer.msg(res.message)
            //     }
            //     console.log(res.message)
            //     sessionStorage.setItem('bigEventToken', res.token)
            // })
    })

})