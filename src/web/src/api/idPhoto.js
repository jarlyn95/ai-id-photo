import request from '@/utils/request'

const api_url = {
  make_id_photo: process.env.VUE_APP_PROXY + '/download_cert_image'
}

export function makeIdPhoto(data) {
  return request({
    url: api_url.make_id_photo,
    method: 'POST',
    data
  })
}
