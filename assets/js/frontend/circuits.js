if(controller == 'circuits'){

	switch(action){
		case 'index':
			// Advanced search posts
			var circuits_name = (localStorage.getItem('circuits_name')) ? localStorage.getItem('circuits_name') : ''; $('#circuits_name').val(circuits_name);
			(circuits_name != '') ? $('#resetSearch').prop('disabled', false) : null;

			posts.searchFields['circuits_name'] = circuits_name;

			searchFieldsListener('keyup', ['circuits_name']);

			// Calling to the main function to list all records
			indexAction();
		break;
		case 'show':
			// Setting the circuit's id for searching the related events
			var showID = $('#circuits_sub_id').data('id');

			/// THE EVENTS

			// Parameters for data list sorting
			var subColumn = 'events_id';
			var subOrder = 'desc';
			var subPage = 1;

			// The posts sent with showAll
			var subEventsPosts = { showID : showID, subColumn: subColumn, subOrder: subOrder, subPage: subPage, subSection: 'events', subSearchFields: {} }

			// Advanced search posts
			var circuits_events_name = ''; $('#circuits_events_name').val(circuits_events_name);
			(circuits_events_name != '') ? $('#resetSubEventsSearch').prop('disabled', false) : null;

			subEventsPosts.subSearchFields['events_name'] = circuits_events_name;

			// Listener for pagination data
			$(document).on('click', '.events.pagination li a', function(e){
			    e.preventDefault();

			    var subPage = $(this).data('page');
			    subEventsPosts['subPage'] = subPage;

			    getSubAction(subEventsPosts, 'Events');
			});

			// Listener for resetting sorting data
			$(document).on('click', '#resetSubEventsSearch', function(e){
			    e.preventDefault();
			    subEventsPosts = subResetSearch();
			    getSubAction(subEventsPosts, 'Events');
			});

			// Function for removing sorting data sessions
			function subResetSorting(){
			    subEventsPosts['subPage'] = 1;

			    return subEventsPosts;
			}

			// Function for removing sorting data and advanced search sessions
			function subResetSearch(){
			    subEventsPosts['subPage'] = 1;
			    $('#' + controller + '_events_name').val('');
			    subEventsPosts.subSearchFields['events_name'] = '';
			    $('#resetSubEventsSearch').prop('disabled', true);

			    return subEventsPosts;
			}

			$('#circuits_events_name').on('keyup', function(){
				subEventsPosts = subResetSorting();
				var circuits_events_name = $(this).val();
				subEventsPosts.subSearchFields['events_name'] = circuits_events_name;
				if(circuits_events_name != ''){
				    $('#resetSubEventsSearch').prop('disabled', false);
				} else {
				    $('#resetSubEventsSearch').prop('disabled', true);
				}
				callSubAction(subEventsPosts, 'Events');
			});

			getSubAction(subEventsPosts, 'Events');
		break;
	}

}