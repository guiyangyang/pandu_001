export const dateFormatter = (nows) => {
    if (!nows) return ''
    var now = new Date(Number(nows))
    var year = now.getFullYear()
   
    var month = now.getMonth() + 1
    month = checkAddZone(month)
   
    var date = now.getDate()
    date = checkAddZone(date)
    return year + '-' + month + '-' + date
  }
   
  function checkAddZone (num) {
    return num<10 ? '0' + num.toString() : num
  }
   
  export function dateTimeFormatter (t) {
    if (!t) return ''
    t = new Date(Number(t)).getTime()
    t = new Date(t)
    var year = t.getFullYear()
    var month = (t.getMonth() + 1)
    month = checkAddZone(month)
   
    var date = t.getDate()
    date = checkAddZone(date)
   
    var hour = t.getHours()
    hour = checkAddZone(hour)
   
    var min = t.getMinutes()
    min = checkAddZone(min)
   
    var se = t.getSeconds()
    se = checkAddZone(se)
   
    return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + se
  }