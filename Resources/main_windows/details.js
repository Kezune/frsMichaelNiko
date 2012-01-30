var win      = Ti.UI.currentWindow;
var orderReq = Titanium.Network.createHTTPClient();
 
//-- Tekstveld naam
var names = Titanium.UI.createTextField({
    color:'#336699',
    top:80,
    left:10,
    width:300,
    height:40,
    hintText:'Name',
    backgroundImage:'../images/textfield.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false
});
 
//-- Adres veld
var address1 = Titanium.UI.createTextField({
    color:'#336699',
    top:120,
    left:10,
    width:300,
    height:40,
    hintText:'Address 1',
    backgroundImage:'../images/textfield.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false
});
 
//-- Zipcode veld
var address2 = Titanium.UI.createTextField({
    color:'#336699',
    top:160,
    left:10,
    width:300,
    height:40,
    hintText:'City, State, Zip Code',
    backgroundImage:'../images/textfield.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
 

 
win.add(names);
win.add(address1);
win.add(address2);
 
//-- Overzicht aankopen maken
function getOverzicht()
{
    var text = win.cat + ' :\n';
    if (win.titels.length == 0)
    {
        text += 'Niets geselecteerd';
    }
    else
    {
        for (var i = 0; i < win.titels.length; i++)
        {
            text +=  win.titels[i] + '\n';
        }
    }
    return text;
}
 
//-- overzicht weergeven
var fotoInfoText = Ti.UI.createLabel({
    text:getOverzicht(),
    font:{
        fontFamily:'Verdana',
        fontSize:14
    },
    color:'black',
    shadowColor:'#333',
    shadowOffset:{x:1,y:1},
    textAlign:'left',
    width:Ti.Platform.displayCaps.platformWidth,
    height:160,
    top:160,
    left:10
});
win.add(fotoInfoText);
 
//-- Order Button
var order = Ti.UI.createButton({
    width:137,
    height:75,
    backgroundImage:'../images/bestellen.png',
    top:300,
    left:165,
    opacity:0
});
 
//-- Cancel Button
var cancel = Ti.UI.createButton({
    width:137,
    height:75,
    backgroundImage:'../images/annul.png',
    top:300,
    left:10,
    opacity:0
});
 
//-- If android OS, use the image property instead of backgroundImage (Ti SDK bug)
if (Ti.Platform.osname == 'android')
{
    order.image = '../images/bestellen.png';
    cancel.image = '../images/annul.png';
}
win.add(order);
win.add(cancel);
 
//-- Fade orderbutton
order.animate({
    opacity:1,
    duration:500
});
 
//-- Fade cancelbutton
cancel.animate({
    opacity:1,
    duration:500
});
//-- Cancel btn event
cancel.addEventListener('click',function(){
    Ti.App.fireEvent('cancelDetails',{cat:win.cat,path:win.path,titels:win.titels});
});

//-- Submit orderbtn, kijken of velden ingevuld zijn
order.addEventListener('click',function() {
    if (names.value == '' || address1.value == '' || address2.value == '')
    {
        alert('Gelieve al de velden in te vullen');
    }
    else
    {
        //-- gegevens versturen
        orderReq.open('POST','http://users.telenet.be/Kezune/mobiele/submit_order.php');
        var params = {
            names: names.value,
            address1: address1.value,
            address2: address2.value,
            cat: win.cat,
            titels: win.titels
        };
        orderReq.send(params);
    }
});

//-- onLoad http request
orderReq.onload = function()
{
    var json = this.responseText;
    var response = JSON.parse(json);
 
    //-- Mail verzonden
    if (response.mail == true)
    {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Success',
            message: 'Bestelling geplaatst!',
            buttonNames: ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click',function(e)
        {
            Ti.App.fireEvent('resetApp');
        });
    }
    else
    {
        //-- Mail mislukt
        alert("Bestelling mislukt");
        
    }
};
 

