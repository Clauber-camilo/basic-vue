APP.Services.User = (function(){
	//url base
    //exemplo: base_url + '/' + login
	var base_url = 'https://api.github.com/users';
	return {
		getUsers: function() {
            return $.get(base_url);
        },
        getUsersInfo: function(login) {
        	return $.get(base_url + '/' + login);
        }
	}
})(); 