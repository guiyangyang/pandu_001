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