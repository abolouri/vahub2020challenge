function getRandomWord(){

    randomarray = ["Alpha","Bravo","Charlie","Delta","Echo","Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Square","Rectangle","LoremIpsum","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    randomText = randomarray[Math.floor(Math.random() * randomarray.length)];
    return randomText;
}
function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


function addACard(taskid,title,description,start_time,expected_end,time_logged,is_billable,base_billing_rate,overtime_billing_rate,current_status){
    var labelText = '';
    switch (current_status){
        case 0:
            //not started
            labelText = '<span class="badge badge-secondary" style="float: right; top: 0px; right: 0px; position: relative;">Pending</span>';
            break;
        case 1:
            //cancelled
            labelText = '<span class="badge badge-secondary" style="float: right; top: 0px; right: 0px; position: relative;">Cancelled</span>';
            break;
        case 2:
            //in progress/open
            labelText = '<span class="badge badge-primary" style="float: right; top: 0px; right: 0px; position: relative;">Open</span>';
            break;
        case 3:
            //completed
            labelText = '<span class="badge badge-success" style="float: right; top: 0px; right: 0px; position: relative;">Completed</span>';
            break;
        default:
            labelText = '<span class="badge badge-secondary" style="float: right; top: 0px; right: 0px; position: relative;">Pending</span>';
            break;
    }

    // convert time logged into minutes and seconds

    // we will store task id in the div[data-taskcard] data attribute. If we need to find properties and attributes.
    // We will use jQuery's .data() to store data into the task object, which we will be able to pull from the object to manipulate, delete, pause and update




    var constructedCard = '\n' +
        '                <div class="card" style="padding-bottom:20px;" >\n' +
        '                    <div class="card-body" data-selected="false" data-taskcard="'+taskid+'">' +
        labelText+ //dynamic label marker
        '                        <h5 class="card-title" style="float: left;">'+title+'</h5>\n' +
        '\n' +
        '                        <br>\n' +
        '\n' +
        '                        <h3 style="">'+fancyTimeFormat(time_logged)+'</h3>\n' +
        '\n' +
        '                        <div data-selected="false" style="display:none;">\n' +
        '                        <p class="card-text">\n' +
        '                        [This is an example of a task description for the va2020 concept project][This is an example of a task description for the va2020 concept project][This is an example of a task description for the va2020 concept project][This is an example of a task description for the va2020 concept project]</p>\n' +
        '\n' +
        '                        <center >\n' +
        '                        <a href="#" class="btn btn-secondary btn-sm" style="color:#000;background-color:#c7c7cc;text-align: left; float: none; left: auto; position: relative; right: 20px;" data-resettime="'+taskid+'">\n' +
        '                            Reset</a>\n' +
        '                        <a href="#" class="btn btn-primary btn-circle btn-xl" style="color: #000;background-color: #fff;border-color: #FF9500" data-tasktoggle="'+taskid+'"><i class="fa fa-play fa-3x" style="padding-top:10%;padding-left:10%"></i></a>\n' +
        '\n' +
        '                        <a href="#" class="btn btn-secondary btn-sm" style="color:#000;background-color:#c7c7cc;position: relative; right: 0px; left: 20px;" data-taskcomplete="'+taskid+'">Mark as complete</a>\n' +
        '                        </center>\n' +
        '<p class="" style="float: left; position: relative; bottom: auto; top: 30px;"><i class="fa fa-trash" data-deletetask="'+taskid+'"></i></p> ' +
        '</div>\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '                </div>\n' +
        '            </div>';

    $('#cardtarget').append($.parseHTML(constructedCard));
    //populate it with attributes
    $("div[data-taskcard="+taskid+"]").data('selected',false);
    $("div[data-taskcard="+taskid+"]").data('selected',false);


}

$(document).ready(function(){
    $('[data-deletetask]').click(function(){
        taskid = $(this).data('deletetask');
        console.log('deleting task for '+taskid);

    });

    $('[data-taskcard]').click(function(){
        taskid = $(this).data('taskcard');
        console.log('clicked on the task card for '+taskid);

    });

    //Script loaded; Lets get our current tasks
    $.ajax({
        url: '/api/v1/tasks',
        type: 'GET',
        contentType: 'application/json',
        data: {
            title:getRandomWord(),
            description:getRandomWord()+getRandomWord()+getRandomWord(),
            start_time: Math.floor(Date.now() / 1000),
            expected_end: Math.floor(Date.now() / 1000)+(60*60), // 1 hour task
            time_logged: 300, // 5 minutes logged
            base_billing_rate: 0, // zero pennies per hour
            overtime_billing_rate : 0, // zero pennies per hour
            current_status : 0, // Not started

        },
        dataType: 'json',
    }).done(function( data ) {
        data.forEach(function(item){
            console.log(item);
            addACard(item.id, item.title,item.description,item.start_time,item.expected_end,item.time_logged,item.is_billable,item.base_billing_rate,item.overtime_billing_rate,item.current_status);

        });
        $( "#cardtarget" ).append( JSON.stringify (data) );
    });


    //TODO: run a jstimeout every minute to increment / PUT more time on each running/active task


});
