/*!
 * Flywork v1.7 - Vanilla Javascript custom frontend fancy components for web applications
 * Copyright 2019-2024 Silvio Delgado (https://github.com/silviodelgado)
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 * https://github.com/silviodelgado/FlyworkCSS
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.Flywork = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';

    const flywork_init = function (reset) {
        let elems = document.querySelectorAll('.flywork-labels .form-control');
        elems.forEach(function (el, i) {
            el.addEventListener('blur', function (evt) {
                el.setAttribute('value', el.value);
            });
        });

        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            var evtFocus = new CustomEvent('focus');
        } else {
            var evtFocus = document.createEvent('CustomEvent');
            evtFocus.initCustomEvent('focus', true, true);
        }

        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            var evtBlur = new CustomEvent('blur');
        } else {
            var evtBlur = document.createEvent('CustomEvent');
            evtBlur.initCustomEvent('blur', true, true);
        }
        elems = document.querySelectorAll('.flywork-labels select.form-control, .flywork-labels select.form-select');
        elems.forEach(function (el, i) {
            el.dispatchEvent(evtFocus);
            el.dispatchEvent(evtBlur);
        });

    }

    return {
        init: flywork_init
    }
});