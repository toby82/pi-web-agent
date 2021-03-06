function initialiseGPIO() {
    var url = '/cgi-bin/toolkit/gpio_manager_api.py';
    processing();
    getJSONResponse(url, renderGPIO);
}

function renderGPIO(data) {

    $.each(data, function (index, value) {
        var leftPin = value[0];
        
        
        //create inout widget
        var tdInOutL$ = getInOutWidget(leftPin);
        
        //create on off widget
        var tdOnOffL$ = getOnOffWidget(leftPin);
        
        //create name
        var tdNameL$="<td>" + leftPin['Name'].trim() + "</td>";
        
        var rightPin = value[1];
        
        //create inout widget
        var tdInOutR$ = getInOutWidget(rightPin);
        
        //create on off widget
        var tdOnOffR$ = getOnOffWidget(rightPin);
        
        //create name
        var tdNameR$="<td>" + rightPin['Name'].trim() + "</td>";
        
        var row$ = "<tr></tr>";
        row$ = $(row$).append(tdInOutL$, tdOnOffL$, tdNameL$,
                              tdNameR$, tdOnOffR$, tdInOutR$);      
        $('table#gpio_table').append(row$);
    });
    
    endProcessing();

}

function getOnOffWidget(pin) {
    
    
    if (pin['Mode'] != 'IN' && pin['Mode'] != 'OUT') {
        if (pin['Mode'] != null)
            return '<td><span class="label label-warning">' + pin['Mode'] + '</span></td>';
        else
            return '<td><span class="label label-warning">' + pin['Name'].trim() + '</span></td>';
    }
    
    var onoff$ = $("#data-onoff").html();

    var label = $(onoff$).find('label').attr('for', 'wPiV-'+pin['wPi']);
    var input = $(onoff$).find('input');
    input = $(input).prop('checked', pin['Val'] == 1);
    input = $(input).attr('id', 'wPiV-'+pin['wPi']);
    input = $(input).attr('name', pin['Name'].trim());
    input = $(input).data('wPi', pin['wPi']);
    
    if (pin['Mode'] != 'IN' && pin['Mode'] != 'OUT') {
        input = $(input).prop('disabled', true);
    }
    onoff$ = $(onoff$).html(input);
    onoff$ = $(onoff$).append(label);
    var tdOnOff$ = "<td></td>";
    tdOnOff$ = $(tdOnOff$).append(onoff$);
    
    
    
    return tdOnOff$;
}

function getInOutWidget(pin) {
    if (pin['Mode'] != 'IN' && pin['Mode'] != 'OUT') {
        if (pin['Mode'] != null)
            return '<td><span class="label label-warning">' + pin['Mode'] + '</span></td>';
        else
            return '<td><span class="label label-warning">' + pin['Name'].trim() + '</span></td>';
    }
    
    var inout$ = $("#data-inout").html();
    
    var label = $(inout$).find('label').attr('for', 'wPiD-'+pin['wPi']);
    var input = $(inout$).find('input');
    input = $(input).prop('checked', pin['Mode'] == "OUT");
    input = $(input).attr('name', pin['Name'].trim());
    input = $(input).attr('direction', pin['Mode'].trim());
    input = $(input).attr('id', 'wPiD-'+pin['wPi']);
    inout$ = $(inout$).html(input);
    inout$ = $(inout$).append(label);
    var tdInOut$ = "<td></td>";
    tdInout$ = $(tdInOut$).append(inout$);
    
    return tdInout$;
}

function gpio_clear() {
    /*var url='/cgi-bin/toolkit/onOffPin.py?cmd=cleanup'
    var value='0';
    $('#gpio_table').remove();
    var info=getResponse(url, null);
    result = info;
    var xmlDoc = result,
    $xml = $( xmlDoc ),
    $title = $xml.find("response");
    value = $title.text();
    if (value == 0) {
        html_message = '<div class="success" id="user_message">Successful clean up</div>';
    } 
    else {
        html_message = '<div class="error" id="user_message">Cleanup failed</div>';
    }
    
    $('#user_space').prepend(html_message);
    setTimeout(function() { location.reload(); }, 1000);
    */
    alert("The cleanup is problematic for the moment, it may hung your Pi. Remember to set the inputs you switched on to IN mode");
}

function submit_gpio_direction(element) {
     
     var url='/cgi-bin/toolkit/onOffPin.py?op=direction&id='+element.id.split('-')[1]+'&direction='
     var direction='IN';
     if (element.attributes["direction"].value=="IN")
     {
        direction='OUT';
     }
     url+=direction+"&from="+element.attributes["direction"].value
     var info=getJSONResponse(url, null);

}

function submit_gpio_value(element) {
     
     var url='/cgi-bin/toolkit/onOffPin.py?op=value&id='+element.id.split('-')[1]+'&value='
     var value='0';
     if (element.checked)
     {
        value='1';
     }
     url+=value
     var info=getResponse(url, null);
}

$(function() {
    initialiseGPIO();
});
