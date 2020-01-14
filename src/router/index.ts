import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store";
import controller from "../controller";

Vue.use(VueRouter)

const turntableRouter = [
	{
        path: "",
        redirect: {
            path: "index"
        }
	},
	{
        path: "index",
        component: () => import("@/pages/turntable/index.vue")
    },
]

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
    path: "/turntable/",
    component: () => import("@/pages/turntable/main.vue"),
            children: turntableRouter
	}
]

const router = new VueRouter({
  	routes
});

router.afterEach(function (to, from) {
    // 获取活动详情
	store.act.status = "loading";
	controller.getActivityInfo().then((res: any) => {
        console.log(res);
        store.act.data = res.data;
        store.act.status = "success";
    });
});

export default router
