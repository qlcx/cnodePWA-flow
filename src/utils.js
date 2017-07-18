// 话题标签
const tagsMap = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  top: '置顶',
}

// 设置话题标签
export const setTopicTag = ({tab, isGood, isTop}) => {
  if (isTop) {
    return '置顶'
  } else if (isGood) {
    return '精华'
  } else if (tagsMap[tab]) {
    return tagsMap[tab]
  } else {
    return null
  }
}