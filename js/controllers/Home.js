APP.Controllers.Home = (function(){
	var home = {
		init: function () {
            //getUsers() nos retorna uma instancia de jqXHR
            //ao user o método then dele, nós vamos ter disponivel os dados buscados
            //como primeiro parametro da função interna (o data)
           /* APP.Services.User.getUsers().then(function(data) {
                home.render(data);
            });*/
            if (localStorage.getItem('users') == null ) {
            	localStorage.setItem('users',JSON.stringify(APP.Sources.users));	
            }
            home.render(JSON.parse(localStorage.getItem('users')));	
            //$('.modal-trigger').leanModal();
             
		},
		render: function (users) {
			users.forEach( function(user){
				var $temp = $('.template').clone();
				$temp.removeClass('template');
				$temp.find('.user-block__avatar').attr('src', user.avatar_url);
				$temp.find('.user-block__name').text(user.login);
				$temp.find('a').data('id', user.login);
				$temp.find('a').on('click', function(event) {
					event.preventDefault();
					var login = $(this).data('id');
					home.get_user_info(login);
				})
				$temp.appendTo('.container-user');
			});
		},
		get_user_info: function(login) {
			/*if (localStorage.getItem('usersInfo') == null) {
				APP.Services.User.getUsersInfo(login).then(function(data){
					localStorage.setItem('userInfo', JSON.stringify(data));	
					home.show_info(data); 
				});	
			}else {
				home.show_info(JSON.parse(localStorage.getItem('usersInfo'))); 	
			}*/
			
			/*if (localStorage.getItem('repositories') == null) {
				APP.Services.Repository.getRepository(login).then(function(data){
					localStorage.setItem('repositories', JSON.stringify(data));	
					home.show_repositories(data); 
				});	
			}else {
				home.show_repositories(JSON.parse(localStorage.getItem('repositories'))); 	
			}*/
			APP.Services.User.getUsersInfo(login).then(function(data){
				home.show_info(data);	
			});
			APP.Services.Repository.getRepository(login).then(function(data){
				home.show_repositories(data); 
			});
		},
		show_info: function(info){
			$('#modal').openModal();
			$('.show-info').find('.show-info__avatar').attr('src', info.avatar_url);
			$('.show-info').find('.show-info__name').text(info.name);
			$('.show-info').find('.show-info__email').text(info.email);
			$('.show-info').find('.show-info__city').text(info.location);
		},
		show_repositories: function(data) {
			// temp = '<tr><td class="repositorio__name"><a href="#"></a></td></tr>';
 			temp = '<li class="container-repo__list"><div class="repositorio__name collapsible-header"></div><div class="collapsible-body">'+
 			'<p><span class="repositorio__fullname"></span></br> '+
 			'<span class="repositorio__description"></span></br>'+
 			'<span class="repositorio__forks"></span></br>'+
 			'<span class="repositorio__create"></span></br>'+
 			'<span class="repositorio__default-branch"></span></br>'+
 			'<span class="repositorio__stargazer"></span></br>'+
 			'<span class="repositorio__watcher"></span></br>'+
 			'</p></div></li>';
			$('.container-repo').html("");

			data.forEach(function(repo){
				var $temp = $(temp);
				$temp.find('.repositorio__name').text(repo.name);
				$temp.appendTo('.container-repo');
				$temp.find('.repositorio__name').data('id', repo.owner.login);
				$temp.find('.repositorio__name').data('repo', repo.name);
				$temp.find('.repositorio__name').on('click', function(event){
					var login = $(this).data('id');
					var repositorio = $(this).data('repo');
					APP.Services.Repository.getRepositoryInfo(login, repositorio).then(function(data){
						home.show_info_repositories(data); 
					});
				})
			});  
		},
		show_info_repositories: function(infoRepositories) {
			$rep = '.repositorio__'; 
			$temp = $('.collapsible-body');
			$temp.find($rep + 'fullname').text('Fullname: '+ infoRepositories.full_name);
			$temp.find($rep + 'description').text('Description: '+ infoRepositories.description);
			$temp.find($rep + 'forks').text('Forks: '+ infoRepositories.forks);
			$temp.find($rep + 'create').text('Create: '+ infoRepositories.created_at);
			$temp.find($rep + 'default-branch').text('Default Branch: '+ infoRepositories.default_branch);
			$temp.find($rep + 'stargazer').text('Stargazers: '+ infoRepositories.stargazers_count);
			$temp.find($rep + 'watcher').text('Watchers: '+ infoRepositories.watchers_count);
			console.log(infoRepositories);
		}
	}; 
	return home; 
})(); 