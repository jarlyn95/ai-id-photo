import defaultSettings from '@/settings'

const title = defaultSettings.title || '在线证件照'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
