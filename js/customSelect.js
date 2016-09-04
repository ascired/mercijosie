var numberOfSelects = $('.js-custom-select').length;

// Iterate over each select element
$('.js-custom-select').each( function() {
    
    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length,
        selectedIndex =  $(this).children('option:selected').index();

    // Hides the select element
    $this.addClass('hidden');
    
    // Wrap the select element in a div
    $this.wrap('<div class="select" />');
    
    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');
    
    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');
    
    // Show the first select option in the styled div     
    $styledSelect.text($this.children('option').eq(selectedIndex).text());
    
    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class' : 'options'
    }).insertAfter($styledSelect);
    // Insert a list item into the unordered list for each select option
    for(var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text()
        }).appendTo($list);
    }
    
    // Cache the list items
    var $listItems = $list.children('li');
    $listItems.eq(selectedIndex).addClass('selected');
    
    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click( function(e) {
        e.stopPropagation();
        $('div.styledSelect.active').each( function() {
            $(this).removeClass('active')
                .next('ul.options').filter(':not(:animated)').slideUp(200);   
        });

        $(this).toggleClass('active')
            .next('ul.options').filter(':not(:animated)').slideToggle(200);
    });
    
    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click( function(e) {
        e.stopPropagation();
        var opt = $(this);
        $styledSelect.text($(this).text())
            .removeClass('active');
        $this.val($(this).text().toLowerCase());
        $list.filter(':not(:animated)').slideUp(250, function() {
            $listItems.removeClass('selected');
            opt.addClass('selected');
        });
    });
    
    // Hides the unordered list when clicking outside of it
    $(document).click( function() {
        $styledSelect.removeClass('active');
        $list.filter(':not(:animated)').slideUp(250);
    });
    
});

