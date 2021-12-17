if(controller == 'events'){

	switch(action){
		case 'index':
			// Advanced search posts
			var events_name = (localStorage.getItem('events_name')) ? localStorage.getItem('events_name') : ''; $('#events_name').val(events_name);
			(events_name != '') ? $('#resetSearch').prop('disabled', false) : null;

			posts.searchFields['events_name'] = events_name;

			searchFieldsListener('keyup', ['events_name']);

			// Calling to the main function to list all records
			indexAction();
		break;
		case 'show':
			// Some code here
		break;
	}

}