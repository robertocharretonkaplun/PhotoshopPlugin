// Create a window
var window = new Window("dialog", "Alert Box Builder");
BtnPannel = window.add("panel", undefined, "Build it");
BtnCancel = BtnPannel.add("button", undefined, "Cancel", { name: "cancel" });

window.show();