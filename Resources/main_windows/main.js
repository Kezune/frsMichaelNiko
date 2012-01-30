var win             = Ti.UI.currentWindow;
 
//-- windows maken
var cats          = Ti.UI.createWindow();
var titels        = Ti.UI.createWindow();
var details       = Ti.UI.createWindow();
 
//-- achtergrondimg
win.backgroundImage = '../images/bg_main.png';
 


// Creates a tab group with Titanium.UI API.
var tabGroup = Titanium.UI.createTabGroup();


 
//-- functie om naar titels te kijken
function toonTitels(e)
{
    if (e.titels)
    {
        details.close();
    }
    else
    {
        cats.close();
    }
 
    titels.url            = 'titels.js';
    titels.cat            = e.cat;
    titels.path           = e.path;
    titels.returntitels   = e.titels;
    titels.open();
}
 
//-- categorie window opendoen
function openCat(e)
{
    titels.close();
    
    if (e.cat)
    {
        cat.cat = e.cat;
    }
    cats.url = 'category.js';
    cats.open();
}
 
//-- open details
function openDetails(e)
{
    titels.close();
    details.cat         = e.cat;
    details.path        = e.path;
    details.titels      = e.titels;
    details.url         = 'details.js';
    details.open();
}
 
//-- custom events
Ti.App.addEventListener('titels',toonTitels);
Ti.App.addEventListener('cancelTitels',openCat);
Ti.App.addEventListener('details',openDetails);
Ti.App.addEventListener('cancelDetails',toonTitels);
Ti.App.addEventListener('resetApp',resetApp);


//-- Na bestelde order, app herstarten
function resetApp()
{
    details.close();
    openCat({});
}
 
openCat({});