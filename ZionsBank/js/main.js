
$(function()
{
    // load the phone number from the localStorage if it exists
   if(localStorage.getItem("rawPhone") != null){
       $("#phone-input").FormatFromDB((localStorage.getItem("rawPhone")));
    }  
    
    // phone number's key down event to mask the phone number
    $("#phone-input").keydown(function(e)
    {
        $(this).phoneMask($(this).attr("mask"), e);        
    });
    
  }); 

// mask the phone number based on the mask from the input
$.fn.phoneMask = function phoneMask(mask, e)
{
    var num = e.key;
    var key = e.keyCode || e.charCode;

    // detect a delete or backspace key
    if( (key == 8 || key == 46))
    {
        a = $(this).val();
        
       var output = a.replace(/(^[(|)].*)([a-zA-Z0-9]{1})/,"$1_");
        
        $(this).attr("placeholder", output);
        $(this).val($(this).attr("placeholder"));

        var phoneVal = $(this).val().replace(/[^a-zA-Z0-9]+/g,"");
        
        if(phoneVal.length==0)
        {
            $(this).val("");
            $(this).attr("placeholder", mask);
            localStorage.clear();
            return;
        }
        e.preventDefault();    
    }
    // otherwise replace the next _ with the key pressed if it was a printable key
    else if(num.match(/^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]$/i)){
        a = $(this).attr("placeholder");
        output = a.replace("_",num);
        $(this).attr("placeholder", output);
        $(this).val($(this).attr("placeholder"));    
    }

    // extract the raw phone number
    var rawPhone = $(this).val().replace(/[^a-zA-Z0-9]+/g,"");

    // clear feedback text after each key stroke
    $("#phone-invalid-feedback").text("");

    // if the phone number starts with 1 or 0
    if(rawPhone.match(/^[0|1]/))
    {
        if($("#phone-invalid-feedback").text().length>0)
            $("#phone-invalid-feedback").append("<br/>")
        $("#phone-invalid-feedback").append("Can't begin with 0 or 1");
    }
    // if the phone number length is less than 10 numbers
    if(rawPhone.length<10)
    {          
        if($("#phone-invalid-feedback").text().length>0)
            $("#phone-invalid-feedback").append("<br/>")
        $("#phone-invalid-feedback").append("must be exactly 10 digits");
    }
    // if the phone number doesn't only have numbers
    if(rawPhone.match(/[\D]+/))
    {
        if($("#phone-invalid-feedback").text().length>0)
            $("#phone-invalid-feedback").append("<br/>")
        $("#phone-invalid-feedback").append("must be numbers only");
    }
    
    //if the raw phone number is 10 digits store it to the localStorage
    if(rawPhone.match(/[\d]{10}/)){
        localStorage.setItem("rawPhone", rawPhone);
    }

}

// Format the raw phone number from the database
$.fn.FormatFromDB = function FormatFromDB(rawPhoneNumber)
{    
    if(rawPhoneNumber!=null && rawPhoneNumber.length==10){
        formattedPhoneNumber = rawPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        $(this).val(formattedPhoneNumber);
    }
}
