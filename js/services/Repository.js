APP.Services.Repository = (function(){
	var base_url = 'https://api.github.com/users';
	var url_repo_info = 'https://api.github.com/repos';
	return {
		getRepository: function(login) {
            return $.get(base_url + '/' + login + '/repos');
        },
        getRepositoryInfo: function(name, repositorio) {
        	return $.get(url_repo_info + '/' + name + '/' + repositorio); 
        }
	}
})(); 