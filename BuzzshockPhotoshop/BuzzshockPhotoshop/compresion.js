




var doc = app.activeDocument;
var wnd = new Window("dialog", "Buzzshock Compression");
wnd.size = [300, 300];
var Logo = wnd.add("image", undefined, File("C:/Users/personal/Documents/unnamed.png.png"));
BtnPannel = wnd.add("panel", undefined, "LOD Settings");
//Logo.size = [150,150];


var value = BtnPannel.add("statictext", undefined, "LOD:  ");
//var e = BtnPannel.add("edittext", undefined, 50);
var slider = BtnPannel.add("slider", undefined, 1, 0, 50);
slider.onChanging = function () { value.text = "LOD: "+ slider.value; }

// Compress Button
BtnCompress= BtnPannel.add("button", undefined, "Compress");
BtnCompress.onClick = function () {
    // Resize the image

    doc.resizeImage(doc.width / slider.value, doc.height / slider.value);
    var file = new File(doc.path + "/" + doc.name + ".png");
    var opts = new PNGSaveOptions();
    doc.saveAs(file, opts, true);
}
// Cancel Button
BtnCancel = BtnPannel.add("button", undefined, "Cancel", { name: "cancel" });
wnd.show();
//doc.resizeImage(doc.width * 4, doc.height * 8);
