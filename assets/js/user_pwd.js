$(function() {
    var form = layui.form
    var layer = layui.layer


    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不能包含空格，且长度6~12之间！'],
        newPwd: function(value) {
            // console.log($('[name=oldPwd]').val())
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能很旧密码一样'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致，请重新输入'
            }
        }
    })

    console.log($('#pwdForm'))
    $('#pwdForm').on('submit', function(e) {
        console.log(e)
        e.preventDefault()
        updatePwd()
    })


})

function updatePwd() {
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: {
            oldPwd: $('[name=oldPwd]').val(),
            newPwd: $('[name=newPwd]').val()
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('修改密码失败！')
            }
            layer.msg('修改密码成功！')
            $('#pwdForm')[0].reset()

        }

    })
}