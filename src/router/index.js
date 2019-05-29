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
    redirect: '/books',
    name: 'Dashboard',
    alwaysShow: true,
    hidden: true,
    meta: { title: 'dashboard', icon: 'excel' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'excel' },
    }]
  },
  {
    path: '/books',
    component: Layout,
    redirect: '/books/literature',
    name: 'Books',
    meta: { title: '书籍专区', icon: 'excel' },
    children: [
      {
        path: 'literature',
        name: 'Literature',
        hidden:true,
        component: () => import('@/views/books/literature'),
        meta: { title: '文学历史', icon: 'list' }
      },
      // {
      //   path: 'novel',
      //   name: 'Novel',
      //   component: () => import('@/views/books/novel'),
      //   meta: { title: '小说传记', icon: 'list' }
      // },
      // {
      //   path: 'technology',
      //   name: 'technology',
      //   component: () => import('@/views/books/technology'),
      //   meta: { title: '科技时尚', icon: 'list' }
      // },
      // {
      //   path: 'education',
      //   name: 'Education',
      //   component: () => import('@/views/books/education'),
      //   meta: { title: '教育哲学', icon: 'list' }
      // },
      // {
      //   path: 'others',
      //   name: 'Others',
      //   component: () => import('@/views/books/others'),
      //   meta: { title: '其他书籍', icon: 'list' }
      // },
    ]
  },
  {
    path: '/videos',
    component: Layout,
    redirect: '/videos/movies',
    name: 'Videos',
    meta: { title: '视频专区', icon: 'dashboard' },
    children: [
      {
        path: 'movies',
        name: 'Movies',
        hidden:true,
        component: () => import('@/views/videos/movies'),
        meta: { title: '电影', icon: 'list' }
      },
      // {
      //   path: 'teleplay',
      //   name: 'Teleplay',
      //   component: () => import('@/views/videos/teleplay'),
      //   meta: { title: '电视剧', icon: 'list' }
      // },
      // {
      //   path: 'ITvideo',
      //   name: 'ITvideo',
      //   component: () => import('@/views/videos/ITvideo'),
      //   meta: { title: 'IT视频', icon: 'list' }
      // },
      // {
      //   path: 'interest',
      //   name: 'Interest',
      //   component: () => import('@/views/videos/interest'),
      //   meta: { title: '兴趣视频', icon: 'list' }
      // },
      // {
      //   path: 'others',
      //   name: 'Others',
      //   component: () => import('@/views/videos/others'),
      //   meta: { title: '其他视频', icon: 'list' }
      // },
    ]
  },
  {
    path: '/read',
    component: Layout,
    redirect: '/read/readList',
    name: 'Read',
    meta: { title: '阅读专区', icon: 'example' },
    children: [
      {
        path: 'readList',
        name: 'ReadList',
        component: () => import('@/views/read/readList'),
        meta: { title: '阅读专区', icon: 'example' }
      },
      {
        path: 'openRead',
        name: 'OpenRead',
        hidden:true,
        component: () => import('@/views/read/openRead'),
        meta: { title: '阅读专区', icon: 'list' }
      }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    redirect: '/upload/index',
    name: 'Upload',
    meta: { title: '上传专区', icon: 'guide' },
    children: [
      {
        path: 'index',
        name: 'UploadIndex',
        hidden:true,
        component: () => import('@/views/upload/index'),
        meta: { title: '上传网盘资源', icon: 'list' }
      },
      // {
      //   path: 'uploadEpub',
      //   name: 'UploadEpub',
      //   component: () => import('@/views/upload/uploadEpub'),
      //   meta: { title: '上传本地书籍', icon: 'list' }
      // }
    ]
  },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Icon',
  //       component: () => import('@/views/icon/index'),
  //       meta: { title: 'icon图标', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/personData',
    name: 'person',
    // alwaysShow: true,
    hidden: true,
    meta: { title: '个人资料', icon: 'excel' },
    children: [{
      path: 'personData',
      component: () => import('@/views/person/personData'),
      // meta: { title: '个人资料', icon: 'excel' },
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
