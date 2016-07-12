

var Users = Vue.extend({
	template: '#template-users',
	data: function(){ 
		var users =['']
		return {
			users: users, 
			avatar: 'https://avatars.githubusercontent.com/u/1?v=3'
		}; 
	},

	ready: function() {
		Vue.http.get('https://api.github.com/users').then(function(data){
				localStorage.setItem('user', JSON.stringify(data));	 
				this.users = data.data;
				console.log(users);
				// data: {
				// 	usuarios: (data); 
				// }
		});	
	}
});
var User = Vue.extend({
	template: '#template-user',
	data: function(){ 
		return {
			message: 'Users.users', 
			avatar: 'https://avatars.githubusercontent.com/u/1?v=3'
		}; 
	}
});

Vue.component('user', User)		
Vue.component('users',Users) 
new Vue ({
	el: 'body'				
});
// Vue.component('counter', {
// 	template: '#counter-template',
// 	props: ['subject'],
// 	data: function (){
// 		return { count: 0 }; 
// 	}
// }); 
// Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);

// else {
// 	home.show_info(JSON.parse(localStorage.getItem('usersInfo'))); 	
// }

// var data = {
// 	message: 'Hello Vue.js!' ,
// 	count: 0
// }
// new Vue({
// 	el: '#user',
// 	data: data, 
// 	methods: { 
// 		updateCount: function() { 
// 			this.count += 1; 	
// 		}
// 	}
// }); 

/*APP.bino =(function(){
	var bino = { 
		init: function () {
			$.get('https://api.github.com/users', function(data){
				//console.log(data); 
				bino.render(data); 
			}); 
		},
		render: function (users) { 
			users.forEach( function(user){
				var $temp = $('.template').clone();
				$temp.removeClass('template');
				$temp.find('.user-block__avatar').attr('src', user.avatar_url);
				$temp.find('.user-block__name').text(user.login); 
				$temp.find('a').data('id', user.login); 
				$temp.find('a').on('click', function(event) {
					var login = $(this).data('id');
					bino.get_user_info(login);
				})  
				$temp.appendTo('.container-user');

			});	
		},
		get_user_info: function(login) { 
			$.get('https://api.github.com/users/' + login, function(data){
				bino.show_info(data);
			});
			$.get('https://api.github.com/users/' + login + '/repos', function(data){
				bino.show_repositories(data);
			}); 
		},
		show_info: function(info){
			$('.modal-trigger').leanModal();
			
			$('.show-info').find('.show-info__avatar').attr('src', info.avatar_url);
			$('.show-info').find('.show-info__name').text(info.name);
			$('.show-info').find('.show-info__email').text(info.email);
			$('.show-info').find('.show-info__city').text(info.location);			
		},
		show_repositories: function(data) { 
			//$('.container-repo').html('');	
			data.forEach(function(repo){
				var $temp = $('.template-repositorios').clone();
				$temp.removeClass('template-repositorios');
				$temp.find('.repositorio__name').text(repo.name);
				console.log(repo.name);
				$temp.appendTo('.container-repo');
				
				//console.log(repo);
			});	
		}
	};
	return bino; 
})(jQuery);
APP.bino.init(); */

/*bino = { 
	init: function () {
		$.get('https://api.github.com/users', function(data){
			//console.log(data); 
			bino.render(data); 
		}); 
	},
	render: function (users) { 
		for (var i=0 in users) {
			var $temp = $('.template').clone();
			console.log(users[i]);
			$temp.removeClass('template');
			$temp.find('.user-block__avatar').css('background-image', 'url(' + users[i].avatar_url +  ')');
			$temp.find('.user-block__name').text(users[i].login); 
			$temp.find('a').attr('onclick', 'bino.get_user_info("' + users[i].login + '");');  
			$temp.appendTo('.container-user');
		}		
	},
	get_user_info: function(login) { 
		$.get('https://api.github.com/users/' + login, function(data){
			console.log(data); 
		}); 
	}
};
bino.init(); */