if(controller == 'comments'){
	switch(action){
		case 'showAll':
			// Advanced search posts
			var comments_id = (localStorage.getItem('comments_id')) ? localStorage.getItem('comments_id') : ''; $('#comments_id').val(comments_id);
			(comments_id != '') ? $('#comments_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var comments_title = (localStorage.getItem('comments_title')) ? localStorage.getItem('comments_title') : ''; $('#comments_title').val(comments_title);
			(comments_title != '') ? $('#comments_title').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['comments_id'] = comments_id;
			posts.searchFields['comments_title'] = comments_title;
			
			searchFieldsListener('keyup', ['comments_id', 'comments_title']);

			var comments_member_id = (localStorage.getItem('comments_member_id')) ? localStorage.getItem('comments_member_id') : ''; $('#comments_member_id').val(comments_member_id);
			(comments_member_id != '') ? $('#comments_member_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			var event_id = (localStorage.getItem('event_id')) ? localStorage.getItem('event_id') : ''; $('#event_id').val(event_id);
			(event_id != '') ? $('#event_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			posts.searchIds['comments_member_id'] = comments_member_id;
			posts.searchIds['event_id'] = event_id;

			searchIdsListener('change', ['comments_member_id', 'event_id']);

			// Calling to the main function to list all records
			showAllAction();
		break;
		case 'add':
			// Some code here
		break;
		case 'edit':
			// Some code here...
		break;
	}

}