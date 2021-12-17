if(controller == 'orders'){
	switch(action){
		case 'showAll':
			// Advanced search posts
			var orders_id = (localStorage.getItem('orders_id')) ? localStorage.getItem('orders_id') : ''; $('#orders_id').val(orders_id);
			(orders_id != '') ? $('#orders_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var orders_name = (localStorage.getItem('orders_name')) ? localStorage.getItem('orders_name') : ''; $('#orders_name').val(orders_name);
			(orders_name != '') ? $('#orders_name').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['orders_id'] = orders_id;
			posts.searchFields['orders_name'] = orders_name;
			
			searchFieldsListener('keyup', ['orders_id', 'orders_name']);

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