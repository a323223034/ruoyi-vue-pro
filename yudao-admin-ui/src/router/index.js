import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/social-login',
    component: (resolve) => require(['@/views/socialLogin'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/infra/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/codegen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit/:tableId(\\d+)',
        component: (resolve) => require(['@/views/tool/codegen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  },
  {
    path: '/flow',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'leave/apply',
        component: (resolve) => require(['@/views/oa/leave/apply/index'], resolve),
        name: '请假表单-申请',
        meta: { title: '请假表单-申请', icon: 'form' }
      }
    ]
  },
  {
    path: '/flow',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'leave/approve',
        component: (resolve) => require(['@/views/oa/leave/approve/index'], resolve),
        name: '请假表单-审批',
        meta: { title: '请假表单-审批', icon: 'form' }
      }
    ]
  },
  {
    path: '/bpm',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'manager/form/edit',
        component: (resolve) => require(['@/views/bpm/form/formEditor'], resolve),
        name: '流程表单-编辑',
        meta: { title: '流程表单-编辑' }
      }
    ]
  },
  {
    path: '/bpm',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'manager/model/edit',
        component: (resolve) => require(['@/views/bpm/model/modelEditor'], resolve),
        name: '流程模型-编辑',
        meta: { title: '流程模型-编辑' }
      }
    ]
  },
  {
    path: '/bpm',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'manager/definition',
        component: (resolve) => require(['@/views/bpm/definition/index'], resolve),
        name: '流程定义',
        meta: { title: '流程定义' }
      }
    ]
  },
]

export default new Router({
  base: process.env.VUE_APP_APP_NAME ? process.env.VUE_APP_APP_NAME : "/",
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
