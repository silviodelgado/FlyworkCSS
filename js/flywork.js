/*!
 * Flywork v1.6 - Vanilla Javascript custom frontend fancy components for web applications
 * Copyright 2019 Silvio Delgado (https://github.com/silviodelgado)
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
        if (reset || false) {
            let fly = document.querySelectorAll('.fly');
            fly.forEach((el, i) => {
                el.classList.remove('fly');
            });
        }

        let chk = document.querySelectorAll('.flywork-checkbox [type="checkbox"]:not(.fly)');
        let rb = document.querySelectorAll('.flywork-radio [type="radio"]:not(.fly)');
        let elems = document.querySelectorAll('.flywork-radio [type="radio"]:checked, .flywork-checkbox [type="checkbox"]:checked');

        chk.forEach(function (el, i) {
            el.addEventListener('change', function (evt) {
                let lbl = document.querySelector('label[for="' + el.id + '"]');
                lbl.classList.toggle('checked');
                document.getElementById(el.id)[this.checked ? 'setAttribute' : 'removeAttribute']('checked', this.checked ? 'checked' : null);
            });
            el.classList.add('fly');
        });

        rb.forEach(function (el, i) {
            el.addEventListener('change', function (evt) {
                let name = this.getAttribute('name');
                let id = this.getAttribute('id');

                let inputs = document.querySelectorAll('input[name="' + name + '"]');
                inputs.forEach(function (item, j) {
                    let el_id = item.getAttribute('id');
                    item.removeAttribute('checked');
                    let lbl = document.querySelector('label[for="' + el_id + '"]');
                    lbl.classList.remove('checked');
                });

                let el = document.querySelector('#' + id);
                el.setAttribute('checked', true);
                let lbl = document.querySelector('label[for="' + id + '"]');
                lbl.classList.add('checked');
            });
            el.classList.add('fly');
        });

        elems.forEach(function (el, i) {
            let lbl = document.querySelector('label[for="' + el.id + '"]');
            lbl.classList.add('checked');
        });

        elems = document.querySelectorAll('.flywork-labels .form-control');
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
        elems = document.querySelectorAll('.flywork-labels select.form-control');
        elems.forEach(function (el, i) {
            el.dispatchEvent(evtFocus);
            el.dispatchEvent(evtBlur);
        });

    }

    const refresh_labels = (context) => {
        let selector = '.flywork-radio [type="radio"],.flywork-checkbox [type="checkbox"]';
        let elems = (context || document).querySelectorAll(selector);
        elems.forEach(function (el, i) {
            let lbl = document.querySelector('label[for="' + el.id + '"]');
            console.log('el', el);
            console.log('el.chk', el.checked);
            if (el.checked)
                lbl.classList.add('checked');
            else
                lbl.classList.remove('checked');
        });
    };

    return {
        init: flywork_init,
        refreshLabels: refresh_labels
    }
});