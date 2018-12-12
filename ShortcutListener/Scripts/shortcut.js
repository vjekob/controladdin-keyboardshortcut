(function () {
    var shortcuts = {};
    var documents = [];

    function keyEventToString(e) {
        var key = "";
        if (e.altKey)
            key = "Alt+" + key;
        if (e.ctrlKey)
            key = "Ctrl+" + key;
        if (e.shiftKey)
            key = "Shift+" + key;
        key += e.key;
        return key;
    }

    function listenerDown(e) {
        if (e.repeat)
            return;

        var key = keyEventToString(e);
        if (!shortcuts[key])
            return;

        e.preventDefault();
        e.stopImmediatePropagation();
    }

    function listenerUp(e) {
        if (e.repeat)
            return;

        var key = keyEventToString(e);
        if (!shortcuts[key])
            return;

        var button = findButton(shortcuts[key]);
        if (!button)
            return;

        button.click();

        Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("KeyPressed", [key]);
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    function findButton(btn) {
        for (var d = 0; d < documents.length; d++) {
            var buttons = documents[d].querySelectorAll("a > span > span > img");
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].src.indexOf("_Action_" + btn.icon + "_") >= 0) {
                    var couldbe = buttons[i];
                    var spans = couldbe.parentElement.parentElement.parentElement.querySelectorAll("span");
                    for (var j = 0; j < spans.length; j++) {
                        if (spans[j].innerText === btn.caption) {
                            return couldbe;
                        }
                    }
                }
            }
        }
    }

    function injectListeners(w, d) {
        documents.push(d);
        w.addEventListener("keydown", listenerDown, true);
        d.addEventListener("keydown", listenerDown, true);
        w.addEventListener("keyup", listenerUp, true);
        d.addEventListener("keyup", listenerUp, true);

        var frames = d.getElementsByTagName("IFRAME");
        for (var i = 0; i < frames.length; i++)
            injectListeners(frames[i].contentWindow, frames[i].contentDocument);
    }

    injectListeners(window.top, window.top.document);

    window.RegisterKeypress = function (keypress, icon, caption) {
        shortcuts[keypress] = {
            icon: icon,
            caption: caption
        };
    }
})();