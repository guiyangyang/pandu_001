/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor','xiaoyang']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function isvalidUserphone(str) {
  return (/^1[34578]\d{9}$/.test(phone))
}

// 验证 密码
export function validatePassword(rule,value,callback) {
  let val = value.trim();
  if(val == ''){
    callback(new Error('请输入密码'));
    return ;
  }
  let pwdReg = /^[a-zA-Z0-9]{6,15}$/;  
  if(!pwdReg.test(val)){
    callback(new Error('请输入6-15位数字和字母密码，字母区分大小写'))
  }else{
    callback()
  }
}


// 验证 手机号
export function validateUserphone(rule,value,callback) {
  if (!(/^1[34578]\d{9}$/.test(value))) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 验证 用户名
export function validateUsername(rule,value,callback) {
  let val = value.trim();
      if(val == ''){
        callback(new Error('请输入用户名'));
        return ;
      }
      let charReg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
      var res = charReg.test(val);
      if(!res){//有非法字符(除了中英文、数字、下划线以外的字符)
        callback(new Error('用户名仅支持中英文、数字和下划线'))
      }else{
        let len = 0;
        for (var i=0;i<val.length;i++){
          if(/[\u4E00-\u9FA5]/.test(val[i])){
            len +=2;
          }else{
            len +=1;
          }
          if(len > 14){break;}
        }
        if(len > 14){
          callback(new Error('请输入用户名不能超过7个汉字或14个字符'))
        }else{
          callback()
        }
      }
}