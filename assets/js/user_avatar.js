$(function() {
    var layer = layui.layer
    const image = document.getElementById('image');
    console.log(image)
    const options = {
        aspectRatio: 1,
        preview: '.img-preview',
        crop(event) {
            // console.log(event.detail.x);
            // console.log(event.detail.y);
            // console.log(event.detail.width);
            // console.log(event.detail.height);
            // console.log(event.detail.rotate);
            // console.log(event.detail.scaleX);
            // console.log(event.detail.scaleY);
        }
    }
    var cropper = new Cropper(image, options);

    console.log($('#chooseImgBtn'))

    $('#chooseImgBtn').on('click', function(e) {
        console.log(e)
        e.preventDefault()
            //模拟点击选中图片
        $('#file')[0].click()
    })

    // 绑定change事件
    $('#file').on('change', function(e) {
        e.preventDefault()
            // console.log($(this))
            //获取files
        var files = $(this)[0].files
        var file;
        //判断是否选中了图片
        if (files && files.length) {
            file = files[0]
            image.src = URL.createObjectURL(file)
            if (cropper) {
                //销毁之前的cropper
                cropper.destroy()
            }
            //重新设置
            cropper = new Cropper(image, options);


        } else {
            return layer.msg('请选择图片')
        }
    })

    $('#uploadImgBtn').on('click', function(e) {
        e.preventDefault()
        console.log(e)
            //获取base64 格式图片数据 
        let data = cropper.getCroppedCanvas({
            width: 100,
            height: 100
        }).toDataURL('image/png')
        console.log(data)
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: data
            },
            success: (res) => {
                console.log(res)
                layer.msg(res.message)
                if (res.status === 0) {
                    window.parent.getUserInfo()
                }

            },
            fail: (res) => {
                console.log(res)

            }
        })
    })





})