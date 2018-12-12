controladdin "Shortcut Listener" {
    Scripts = 'ShortcutListener/Scripts/shortcut.js';
    StartupScript = 'ShortcutListener/Scripts/startup.js';

    RequestedHeight = 1; // Some bug in 2018 prevents this from being 0
    RequestedWidth = 1;
    MaximumHeight = 1;
    MaximumWidth = 1;
    VerticalStretch = false;
    HorizontalStretch = false;

    event ControlReady();
    event KeyPressed(KeyPress: Text);
    procedure RegisterKeypress(KeyPress: Text; Icon: Text; Caption: Text);
}