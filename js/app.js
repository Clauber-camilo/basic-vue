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
			users: [],
			find: false 
		}
	},
	ready: function () {
		this.$http.get('https://api.github.com/users').then(function(data){
			//localStorage.setItem('user', JSON.stringify(data));
			this.users = data.data;
			this.find = true; 
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
			response: false
		}
	},
	ready: function () {
		this.$http.get('https://api.github.com/users/' + this.$route.params.username).then(function(data){
			var objData = data.data;
			this.avatar = objData.avatar_url;
			this.name = objData.name;
			this.email = objData.email; 
			this.city = objData.location; 
			this.response = true; 

		}); 
	},
});

var ReposList = Vue.extend({
	template: "#template-repository-list", 
	data: function(){
		return{ 
			repositories: [],
			repoInfo: [],
		}
	},
	ready: function() {
		this.$http.get('https://api.github.com/users/' + this.$route.params.username + '/repos').then(function(data){
			this.repositories = data.data;
		});	
		$('.collapsible').collapsible({
		    accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});
	},
	methods: {
		getRepoInfo : function (repository){
			this.$http.get('https://api.github.com/repos/' + this.$route.params.username + '/' + repository ).then(function(data){
				this.repoInfo = data.data;
			});				
		}
	}
})

var App = Vue.extend({
	template: '#template-conteudo'
})

Vue.component('content', App)
Vue.component('user', User)		
Vue.component('user-info',UserInfo)
Vue.component('repository-list', ReposList)
var router = new VueRouter()

router.map({
	'/': {
		name: 'home', 
		component: Users
	},
    '/user/:username': {
    	name: 'user',
   		component: UserInfo
	},
})


router.start(App, '#App')