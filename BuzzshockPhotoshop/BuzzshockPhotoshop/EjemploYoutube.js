var wnd = new Window("dialog", "Prueba youtube");
var Pannel1 = wnd.add("panel", undefined, "Settings");
var button1 = Pannel1.add("button", undefined, "Cancel", {name: "cancel"});

wnd.show();