Titanium.UI.setBackgroundColor('#8C0221');

// Creates a tab group with Titanium.UI API.
var tabGroup = Titanium.UI.createTabGroup();

//-- Main window aanmaken
var main = Ti.UI.createWindow({
    url:'main_windows/main.js',
    
});

// Create the window "tweetWin"
var tweetWin = Titanium.UI.createWindow ({
    title: "@FreeRecordShop", 
    backgroundColor: "#fff", 
    url: "main_windows/tweets.js"
});

// Create the tab "mainTab"
var mainTab = Titanium.UI.createTab ({
    title: "Shop", 
    icon: "KS_nav_mashup.png", 
    window: main 
});

// Create the tab "tweetTab"
var tweetTab = Titanium.UI.createTab ({
    title: "Twitter", 
    icon: "KS_nav_mashup.png", 
    window: tweetWin 
});

// Add the tab to our tab group
tabGroup.addTab(mainTab);
tabGroup.addTab(tweetTab);
tabGroup.open();