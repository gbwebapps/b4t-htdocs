if(controller == 'transactions'){
	switch(action){
		case 'showAll':
			// Advanced search posts
			var transactions_id = (localStorage.getItem('transactions_id')) ? localStorage.getItem('transactions_id') : ''; $('#transactions_id').val(transactions_id);
			(transactions_id != '') ? $('#transactions_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['transactions_id'] = transactions_id;
			
			searchFieldsListener('keyup', ['transactions_id']);

			var transactions_organizer_id = (localStorage.getItem('transactions_organizer_id')) ? localStorage.getItem('transactions_organizer_id') : ''; $('#transactions_organizer_id').val(transactions_organizer_id);
			(transactions_organizer_id != '') ? $('#transactions_organizer_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			var transactions_reason_code = (localStorage.getItem('transactions_reason_code')) ? localStorage.getItem('transactions_reason_code') : ''; $('#transactions_reason_code').val(transactions_reason_code);
			(transactions_reason_code != '') ? $('#transactions_reason_code').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			var event_id = (localStorage.getItem('event_id')) ? localStorage.getItem('event_id') : ''; $('#event_id').val(event_id);
			(event_id != '') ? $('#event_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			posts.searchIds['transactions_organizer_id'] = transactions_organizer_id;
			posts.searchIds['transactions_reason_code'] = transactions_reason_code;
			posts.searchIds['event_id'] = event_id;

			searchIdsListener('change', ['transactions_organizer_id', 'transactions_reason_code', 'event_id']);

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