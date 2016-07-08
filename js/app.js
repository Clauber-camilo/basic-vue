var APP = {}; 

APP.bino =(function(){
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
					var login = $(this).parents('.user-block').data('id');
					bino.get_user_info(login);
				})  
				$temp.appendTo('.container-user');

			});	
		},
		get_user_info: function(login) { 
			$.get('https://api.github.com/users/' + login, function(data){
				console.log(data); 
			}); 
		}
	};
	return bino; 
})(jQuery);
APP.bino.init(); 

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