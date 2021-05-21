/**
 * 用户请求相关模块
 */

import request from '@/utils/request.js'

export const getmobile = (mobile) => {
  return request({
    method: 'GET',
    url: `/sendSms.json/?mobile=${mobile}`,
  })
}

export const getLiftCard = values => {
  return request({
    method: 'GET',
    url: `/receive.json/?mobile=${values.mobile}&vercode=${values.code}`,
  })
}
