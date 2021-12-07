import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(isBlank(to.meta.title) ? to.name : to.meta.title)
  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})

function isBlank(str) {
  if (str === null || str === '' || typeof str === 'undefined') {
    return true
  }
  return false
}
