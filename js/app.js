var User = Vue.extend({
	template: '#template-user',
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data: function () {
		return { 
			avatar: this.user.avatar_url,
			name: this.user.login
		}
	}
	
}); 
var Users = Vue.extend({
	template: '#template-users',
	name: 'Users',
	data: function() {
		return {
			users: []
		}
	},
	ready: function () {
		this.$http.get('https://api.github.com/users').then(function(data){
			//localStorage.setItem('user', JSON.stringify(data));
			this.users = data.data;
		}); 
	}
});
var UserInfo = Vue.extend({
	template: '#template-userInfo',
	name: 'userInfo', 
	data: function() {
		return {
			avatar: '',
			name: '', 
			email: '', 
			city: '',
			repositories: []
		}
	},
	ready: function () {
		this.$http.get('https://api.github.com/users' + '/' + this.$route.params.username).then(function(data){
			var objData = data.data;
			this.avatar = objData.avatar_url;
			this.name = objData.name;
			this.email = objData.email; 
			this.city = objData.location; 
			console.log(data.data);
		}); 
	},
});
var App = Vue.extend({
	template: '#template-conteudo'
})
Vue.component('content', App)
Vue.component('user', User)		
Vue.component('user-info',UserInfo)

var router = new VueRouter()

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
router.map({
	'/': {
		component: Users
	},
    '/user/:username': {
    	name: 'user',
   		component: UserInfo
	},
})


router.start(App, '#App')