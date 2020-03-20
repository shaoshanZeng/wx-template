const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 后端传秒 时间格式化输出 
const dateFromat = ((second)=>{
  var days = parseInt(second / (60 * 60 * 24));
  var hours = parseInt((second % (60 * 60 * 24)) / (60 * 60));
  var minutes = parseInt((second % (60 * 60)) / 60);
  var seconds = second % 60;
  return days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
}) 


// 提示
 const errorToast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

// 请求的提示
const showMsg = (title, content, callBack, param) => {
  wx.showModal({
    title: title,
    content: content,
    success: (res) => {
      if (res.confirm) {
        if (callBack != null && param != null) {
          callBack(param);
        } else if (callBack != null) {
          callBack();
        }
      }
    }
  })
}


module.exports = {
  formatTime: formatTime,
  dateFromat: dateFromat,
  errorToast: errorToast,
  showMsg: showMsg
}
