if(controller == 'news'){

	switch(action){
		case 'index':
			// Advanced search posts
			var news_name = (localStorage.getItem('news_name')) ? localStorage.getItem('news_name') : ''; $('#news_name').val(news_name);
			(news_name != '') ? $('#resetSearch').prop('disabled', false) : null;

			posts.searchFields['news_name'] = news_name;

			searchFieldsListener('keyup', ['news_name']);

			// Calling to the main function to list all records
			indexAction();
		break;
		case 'show':
			// Some code here
		break;
	}

}