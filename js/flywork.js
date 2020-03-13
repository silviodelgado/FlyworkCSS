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

    const flywork_init = function () {

        let chk = document.querySelectorAll('.flywork-checkbox [type="checkbox"]');
        let rb = document.querySelectorAll('.flywork-radio [type="radio"]');
        let elems = document.querySelectorAll('.flywork-radio [type="radio"]:checked, .flywork-checkbox [type="checkbox"]:checked');

        chk.forEach(function (el, i) {
            let id = el.getAttribute('id');
            el.addEventListener('change', function (evt) {
                let lbl = document.querySelectorAll('label[for="' + id + '"]');
                lbl[0].classList.toggle('checked');
            });
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
        });

        elems.forEach(function (el, i) {
            let el_id = el.getAttribute('id');
            let lbl = document.querySelector('label[for="' + el_id + '"]');
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

    return {
        init: flywork_init
    }
});