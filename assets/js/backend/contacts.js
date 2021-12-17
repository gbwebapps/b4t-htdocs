if(controller == 'contacts'){

	switch(action){
		case 'showAll':
			// Advanced search posts
			var contacts_id = (localStorage.getItem('contacts_id')) ? localStorage.getItem('contacts_id') : ''; $('#contacts_id').val(contacts_id);
			(contacts_id != '') ? $('#contacts_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var contacts_firstname = (localStorage.getItem('contacts_firstname')) ? localStorage.getItem('contacts_firstname') : ''; $('#contacts_firstname').val(contacts_firstname);
			(contacts_firstname != '') ? $('#contacts_firstname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var contacts_lastname = (localStorage.getItem('contacts_lastname')) ? localStorage.getItem('contacts_lastname') : ''; $('#contacts_lastname').val(contacts_lastname);
			(contacts_lastname != '') ? $('#contacts_lastname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var contacts_email = (localStorage.getItem('contacts_email')) ? localStorage.getItem('contacts_email') : ''; $('#contacts_email').val(contacts_email);
			(contacts_email != '') ? $('#contacts_email').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var contacts_phone = (localStorage.getItem('contacts_phone')) ? localStorage.getItem('contacts_phone') : ''; $('#contacts_phone').val(contacts_phone);
			(contacts_phone != '') ? $('#contacts_phone').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['contacts_id'] = contacts_id;
			posts.searchFields['contacts_firstname'] = contacts_firstname;
			posts.searchFields['contacts_lastname'] = contacts_lastname;
			posts.searchFields['contacts_email'] = contacts_email;
			posts.searchFields['contacts_phone'] = contacts_phone;
			
			searchFieldsListener('keyup', ['contacts_id', 'contacts_firstname', 'contacts_lastname', 'contacts_email', 'contacts_phone']);

			// Calling to the main function to list all records
			showAllAction();
		break;
	}

}