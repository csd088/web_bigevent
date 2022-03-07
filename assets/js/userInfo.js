var layer = layui.layer
var form = layui.form
$(function() {

    getUserInfo()


    form.verify({
        nickName: function(value) {
            if (value.length > 6) {
                return '昵称必须在1-6个字符之间！'
            }
        }
    })

    //退出功能
    $('#logout_btn').on('click', function(e) {
        e.preventDefault()
        layer.confirm('确定退出登录吗？', {
            icon: 3,
            title: '提示'
        }, function(index) {
            console.log('ok')
                //1、清空本地存储
            localStorage.removeItem('token')
                //2、跳回登录页
            location.href = '/login.html'
            layer.close(index)
        })
    })

    //修改用户信息
    $('#user_form').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault()
        console.log($(this).serialize())
        updateUserInfo($(this).serialize())


    })

    //重置用户信息
    $('#resetUserInfo').on('click', function(e) {
        //阻止默认重置行为
        // console.log(e)
        // console.log('stop')
        e.preventDefault()
        getUserInfo()
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function(res) {
            console.log(res)
            if (res.status !== 0) {
                return layer.msg(res.status)
            }
            // userId = res.data.id
            renderAvater(res.data)

        }
    })
}

function updateUserInfo(param) {
    $.ajax({
        method: 'POST',
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('修改用户信息失败')
            }
            layer.msg('修改用户信息成功')
                //调父页面中的方法更新页面
            window.parent.getUserInfo()

        }
    })
}

function renderAvater(user) {
    let name = user.nickname || user.username
    $('.username').html(name)
    if (user.user_pic != null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        let avatar = name[0].toUpperCase()
        $('.text-avatar').show().html(avatar)
        $('.layui-nav-img').hide()
    }

    //表单快速赋值  userInfoForm为表单lay-filter 属性值
    form.val('userInfoForm', user)
        // $('.layui-form-item [name=username]').val(user.username)
        // if (user.nickname !== null && user.nickname.length) {
        //     $('.layui-form-item [name=nickname]').val(user.nickname)
        // }
        // if (user.email !== null && user.email.length) {
        //     $('.layui-form-item [name=emial]').val(user.nickname)
        // }
}