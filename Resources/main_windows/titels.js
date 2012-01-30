var win = Ti.UI.currentWindow;

var scrollView	= Ti.UI.createScrollView();
var numtitels = 0;

//-- artikels
var titels	= [
	{title:'Transformers',container:null},
	{title:'The Matrix',container:null},
	{title:'Mortal Kombat',container:null},
	{title:'Shrek',container:null},
	{title:'50 Cent',container:null},
	{title:'Scarface',container:null}
];

//-- titels 
var titelsTitle = Ti.UI.createLabel({
	text:'2. Kies uw artikel(s)',
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

//-- titels background
var titelsTitleView = Ti.UI.createView({
	width:328,
	height:58,
	top:45,
	left:-6,
	opacity:0
});
titelsTitleView.add(titelsTitle);

//-- foto
var foto = Ti.UI.createView({
	top:270,
	width:216,
	height:156,
	backgroundImage:win.path
});

var titelsHolder = Ti.UI.createView({
	width:216,
	height:156
});
foto.add(titelsHolder);
win.add(foto);
win.add(titelsTitleView);

//-- Details Button
var details = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/gegevens.png',
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
	details.image = '../images/gegevens.png';
	cancel.image = '../images/annul.png';
	foto.image = win.path;
}
else
{
	foto.opacity = 0;
}
win.add(details);
win.add(cancel);

//-- Cancel btn
cancel.addEventListener('click',function(e){
	Ti.App.fireEvent('canceltitels',{cat:win.cat});
});


details.addEventListener('click',function(e){
 var fotoInfo = [];
    for (var i = 0; i < titels.length; i++)
    {
        if (titels[i].container != null)
        {
            fotoInfo.push(titels[i].title);
        }
    }
    Ti.App.fireEvent('details',{cat:win.cat,path:win.path,titels:fotoInfo});
});

//-- Fade views en buttons
titelsTitleView.animate({
	opacity:1,
	duration:500
});

foto.animate({
	opacity:1,
	duration:500
});

details.animate({
	opacity:1,
	duration:500
});

cancel.animate({
	opacity:1,
	duration:500
});

//-- Items selecteren en deselecteren
function titelListClick(e)
{
	if (e.source.selected)
	{
		e.source.selected = false;
		e.source.backgroundImage = '../images/checkbox_no.png';

		numtitels -= 1;
		if (titels[e.source.titelID].container != null)
		{
			titelsHolder.remove(titels[e.source.titelID].container);
			titels[e.source.titelID].container = null;
		}
	}
	else
	{

			e.source.selected = true;
			e.source.backgroundImage = '../images/checkbox_yes.png';

			var aTitel = Ti.UI.createView({
				backgroundImage:titels[e.source.titelID].path
			});

			if (Ti.Platform.osname == 'android')
			{
				aTitel.image = titels[e.source.titelID].path;
			}
			else
			{
				aTitel.opacity = 0;
				aTitel.animate({
					opacity:1,
					duration:500
				});
			}
			titelsHolder.add(aTitel);
			titels[e.source.titelID].container = aTitel;
			numtitels += 1;
		}
	}


function createtitelsList()
{
   scrollView.opacity = 0;
    scrollView.top = 120;
    scrollView.height = 120;
    scrollView.contentWidth = Ti.Platform.displayCaps.platformWidth;
    scrollView.contentHeight = 'auto';
    scrollView.showVerticalScrollIndicator = true;
    win.add(scrollView);
 
    for (i = 0; i < titels.length; i++)
    {
        
        var titelLabel = Ti.UI.createLabel({
            text:titels[i].title,
            font:{
                fontFamily:'Verdana',
                fontWeight:'bold',
                fontSize:14
            },
            color:'black',
            shadowColor:'#333',
            shadowOffset:{x:1,y:1},
            textAlign:'left',
            width:Ti.Platform.displayCaps.platformWidth - 10,
            left:10
        });
 
        
        var checkbox = Ti.UI.createView({
            width:340,
            height:16,
            backgroundImage:'../images/checkbox_no.png',
            selected:false,
            titelID:i
        });
 
 
        var toggler = Ti.UI.createView({
            width:Ti.Platform.displayCaps.platformWidth,
            height:20,
            top: i * 20
        });
 
        
        checkbox.addEventListener('singletap',titelListClick);
        toggler.add(titelLabel);
        toggler.add(checkbox);
 
        scrollView.add(toggler);
    }
    scrollView.animate({
        opacity:1,
        duration:500
    });
}
createtitelsList();

