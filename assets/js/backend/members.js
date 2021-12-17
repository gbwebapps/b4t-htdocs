if(controller == 'members'){
	switch(action){
		case 'showAll':
			// Advanced search posts
			var members_id = (localStorage.getItem('members_id')) ? localStorage.getItem('members_id') : ''; $('#members_id').val(members_id);
			(members_id != '') ? $('#members_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var members_firstname = (localStorage.getItem('members_firstname')) ? localStorage.getItem('members_firstname') : ''; $('#members_firstname').val(members_firstname);
			(members_firstname != '') ? $('#members_firstname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var members_lastname = (localStorage.getItem('members_lastname')) ? localStorage.getItem('members_lastname') : ''; $('#members_lastname').val(members_lastname);
			(members_lastname != '') ? $('#members_firstname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var members_email = (localStorage.getItem('members_email')) ? localStorage.getItem('members_email') : ''; $('#members_email').val(members_email);
			(members_email != '') ? $('#members_firstname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var members_phone = (localStorage.getItem('members_phone')) ? localStorage.getItem('members_phone') : ''; $('#members_phone').val(members_phone);
			(members_phone != '') ? $('#members_firstname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['members_id'] = members_id;
			posts.searchFields['members_firstname'] = members_firstname;
			posts.searchFields['members_lastname'] = members_lastname;
			posts.searchFields['members_email'] = members_email;
			posts.searchFields['members_phone'] = members_phone;
			
			searchFieldsListener('keyup', ['members_id', 'members_firstname', 'members_lastname', 'members_email', 'members_phone']);

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