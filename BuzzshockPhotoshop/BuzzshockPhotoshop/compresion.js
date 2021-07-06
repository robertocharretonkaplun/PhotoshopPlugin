// Ref for changing channels: https://community.adobe.com/t5/photoshop/scripting-rgb-channels-for-layers/td-p/2393654
// Ref for Action references: https://csharp.hotexamples.com/es/examples/Photoshop/ActionReference/PutEnumerated/php-actionreference-putenumerated-method-examples.html


var doc = app.activeDocument;
var wnd = new Window("dialog", "Buzzshock Compression");
wnd.size = [300, 300];
var Logo = wnd.add("image", undefined, File("C:/Users/personal/Documents/unnamed.png.png"));
BtnPannel = wnd.add("panel", undefined, "LOD Settings");
//Logo.size = [150,150];
var myButtonGroup = wnd.add("group");

var value = BtnPannel.add("statictext", undefined, "LOD:  ");
//var e = BtnPannel.add("edittext", undefined, 50);
var slider = BtnPannel.add("slider", undefined, 1, 0, 50);
slider.onChanging = function () { value.text = "LOD: "+ slider.value; }

// Rechannel Btn
BtnRechannel = myButtonGroup.add("button", undefined, "Rechannel");
    
BtnRechannel.onClick = function () {
    // Get each layer by individual
    var RL = doc.layers[0];
    var ML = doc.layers[1];
    var AOL = doc.layers[2];

    // Set Red channel to Roughness
    doc.activeLayer = RL;
    setColorChannel(true, false, false);
    // Set Green channel to Metallic
    doc.activeLayer = ML;
    setColorChannel(false, true, false);
    // Set Blue channel to AO
    doc.activeLayer = AOL;
    setColorChannel(false, false, true);

    // Save file
    var file = new File(doc.path + "/" + "RGBCHANNEL" + ".png");
    var opts = new PNGSaveOptions();
    doc.saveAs(file, opts, true);
};
// Compress Button
BtnCompress = myButtonGroup.add("button", undefined, "Compress");
BtnCompress.alignment = "right";
BtnCompress.onClick = function () {
    // Resize the image

    doc.resizeImage(doc.width / slider.value, doc.height / slider.value);
    var file = new File(doc.path + "/" + "testRGB" + ".png");
    var opts = new PNGSaveOptions();
    doc.saveAs(file, opts, true);
};
// Cancel Button
BtnCancel = myButtonGroup.add("button", undefined, "Cancel", { name: "cancel" });


wnd.show();

function setColorChannel(R,G,B) {
    var AD = new ActionDescriptor();
    var AR = new ActionReference();
    AR.putEnumerated(app.charIDToTypeID('Lyr '),
                     app.charIDToTypeID('Ordn'),
                     app.charIDToTypeID('Trgt'));
    AD.putReference(app.charIDToTypeID('null'), AR);
    var AL = new ActionList();
    // Enable channel
    if(R) {
        AL.putEnumerated(app.charIDToTypeID('Chnl'),
                         app.charIDToTypeID('Rd  '));
    }

    if(G) {
        AL.putEnumerated(app.charIDToTypeID('Chnl'), 
                         app.charIDToTypeID('Grn  '));
    }

    if (B) {
        AL.putEnumerated(app.charIDToTypeID('Chnl'), 
                         app.charIDToTypeID('Bl  '));
    }
    
    var ADForChannelRestrictions = new ActionDescriptor();
    ADForChannelRestrictions.putList(app.stringIDToTypeID('channelRestrictions'), AL);
    AD.putObject(app.charIDToTypeID('T   '), app.charIDToTypeID('Lyr '), ADForChannelRestrictions);
    executeAction(app.charIDToTypeID('setd'), AD, DialogModes.NO);
};

// Create script to make batch export all docs turn to be from dds to png and png to dds