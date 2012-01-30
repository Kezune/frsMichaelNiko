var win = Ti.UI.currentWindow;

//-- categorie views
var movies = Ti.UI.createView({width:216,height:156,backgroundImage:'../images/categories/film.png'});
var music = Ti.UI.createView({width:216,height:156,backgroundImage:'../images/categories/music.png'});
var games = Ti.UI.createView({width:216,height:156,backgroundImage:'../images/categories/games.png'});
var returncat;

//-- Categorien
var categories = [
    {title:'Movies'},
    {title:'Music'},
    {title:'Games'},
];


//-- categorie titel
var catTitle = Ti.UI.createLabel({
    text:'1. Kies categorie (swipe)',
        font:{
            fontFamily:'Verdana',
            fontWeight:'bold',
            fontSize:18
        },
        color:'#01aef0',
        shadowColor:'#333',
        shadowOffset:{x:1,y:1},
        textAlign:'left',
        height:58,
        left:40
        
});

//-- cat title background
var catTitleView = Ti.UI.createView({
        width:328,
        height:58,
        left:-6,
        opacity:0,
        top:45
});
catTitleView.add(catTitle);

//-- cat type label
var catType = Ti.UI.createLabel({
        text:'Movies',
        font:{
            fontFamily:'Verdana',
            fontWeight:'bold',
            fontSize:16
        },
        color:'black',
        shadowColor:'#333',
        shadowOffset:{x:1,y:1},
        textAlign:'center',
        width:Ti.Platform.displayCaps.platformWidth,
        height:20,
        top:100,
        opacity:0
});

//-- scroll met categorien
var scrollView = Ti.UI.createScrollableView({
    views:[movies,music,games],
    showPagingControl:true,
    clipViews:false,
        top:120,
        left:30,
        right:30,
        height:180,
        opacity:0
});

//-- selectiebtn
var next = Ti.UI.createButton({
        width:137,
        height:75,
        backgroundImage:'../images/selecteren.png',
        top:300,
        opacity:0
});

//-- If android OS, use the image property instead of backgroundImage (Ti SDK bug)
if (Ti.Platform.osname == 'android')
{
    next.image = '../images/selecteren.png';
}

next.addEventListener('click',function(e){
    Ti.App.fireEvent('titels',{
        cat:categories[scrollView.currentPage].title,
        path:categories[scrollView.currentPage].path
    });
});

win.add(scrollView);
win.add(catTitleView);
win.add(catType);
win.add(next);

//-- Fade scrollview
scrollView.animate({
    opacity:1,
    duration:500
});

//-- Fade cat titel
catTitleView.animate({
    opacity:1,
    duration:500
});

catType.animate({
    opacity:1,
    duration:500
});

//-- Fade selectbtn
next.animate({
    opacity:1,
    duration:500
});


scrollView.addEventListener('scroll',function(){
    catType.text = categories[scrollView.currentPage].title;
});


if (returncat != null)
{
    catType.text = cats[returncat].title;
}
