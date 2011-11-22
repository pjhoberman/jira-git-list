    var branches = [],
        dashboards =    ["Filter Results: Ready for Staging QA",
                        "Filter Results: Ready for Code Review",
                        "Filter Results: Ready for Production Deployment"];
                        
    $('h3.dashboard-item-title').each(function(){
        if( $.inArray( $(this).text(), dashboards ) > -1){
            $(this).parents('.dashboard-item-header').next('.dashboard-item-content').find('iframe').contents().find('tr.issuerow').each(function(){
                var row = $(this),
                subsystem = row.find('.customfield_10080 .labels').text().trim();

                if(subsystem === "None" || subsystem.search('panama') > -1 ){
                    branches.push(row.attr('data-issuekey'));
                }
            });
        } // if
    }); // each
    
    if( branches.length ){
        var string = 'git merge ';
        for(var i=0; i<branches.length; i++){
            string += ' origin/' + branches[i];
        }
        prompt('for the git', string);
    }
    else {
        alert('No Branches');
    }
    