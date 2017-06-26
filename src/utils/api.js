import fetchData from './fetchData'

// 获取用户数据
export const getUserInfo = userName => {
  fetchData.get(`/user/${userName}`).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(`获取用户详情失败：${e}`)
  })
}