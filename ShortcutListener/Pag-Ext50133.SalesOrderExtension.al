pageextension 50133 "Sales Order Extension" extends "Sales Order"
{
    layout {
        addbefore(General) {
            usercontrol(Shortcut;"Shortcut Listener") {
                trigger ControlReady();
                begin
                    CurrPage.Shortcut.RegisterKeypress('F9', 'PostOrder', 'Post...');
                    CurrPage.Shortcut.RegisterKeypress('F8', 'Shipment', 'Shipments');
                end;
            }
        }
    }
}