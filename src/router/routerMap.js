import Home from '../pages/home/index.vue'

const routes = [
	{
	 path: '/', 
	 component: Home
	}
];

const views = ['login','layout'];

// 按需加载
views.forEach(item => {
	routes.push({
		path:`/${item}`,
		component: () => import(`../pages/${item}/index.vue`)
	})
})

export default routes;