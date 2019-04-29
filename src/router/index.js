import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/books',
    component: Layout,
    redirect: '/books/literature',
    name: 'Books',
    meta: { title: '书籍专区', icon: 'example' },
    children: [
      {
        path: 'literature',
        name: 'Literature',
        component: () => import('@/views/books/literature'),
        meta: { title: '文学历史', icon: 'table' }
      },
      {
        path: 'novel',
        name: 'Novel',
        component: () => import('@/views/books/novel'),
        meta: { title: '小说传记', icon: 'table' }
      },
      {
        path: 'technology',
        name: 'technology',
        component: () => import('@/views/books/technology'),
        meta: { title: '科技时尚', icon: 'tree' }
      },
      {
        path: 'education',
        name: 'Education',
        component: () => import('@/views/books/education'),
        meta: { title: '教育哲学', icon: 'table' }
      },
      {
        path: 'others',
        name: 'Others',
        component: () => import('@/views/books/others'),
        meta: { title: '其他类', icon: 'table' }
      },
      //education
    ]
  },
  {
    path: '/videos',
    component: Layout,
    redirect: '/videos/movies',
    name: 'Videos',
    meta: { title: '视频专区', icon: 'example' },
    children: [
      {
        path: 'movies',
        name: 'Movies',
        component: () => import('@/views/videos/movies'),
        meta: { title: '电影', icon: 'table' }
      },
      {
        path: 'tvplay',
        name: 'Tvplay',
        component: () => import('@/views/videos/tvplay'),
        meta: { title: '电视剧', icon: 'table' }
      },
      {
        path: 'ITvideo',
        name: 'ITvideo',
        component: () => import('@/views/videos/ITvideo'),
        meta: { title: 'IT视频', icon: 'tree' }
      },
      {
        path: 'interest',
        name: 'Interest',
        component: () => import('@/views/videos/interest'),
        meta: { title: '兴趣视频', icon: 'table' }
      },
      {
        path: 'others',
        name: 'Others',
        component: () => import('@/views/videos/others'),
        meta: { title: '其他类', icon: 'table' }
      },
      //education
    ]
  },
  {
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Upload',
        component: () => import('@/views/upload/index'),
        meta: { title: '上传分享', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
