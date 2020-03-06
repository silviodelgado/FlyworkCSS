(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.flywork = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';

    var chk = document.querySelectorAll('.flywork-checkbox [type="checkbox"]');
    chk.forEach(function (el, i) {
        var id = el.getAttribute('id');
        el.addEventListener('change', function (evt) {
            var lbl = document.querySelectorAll('label[for="' + id + '"]');
            lbl[0].classList.toggle('checked');
        });
    });

    var rb = document.querySelectorAll('.flywork-radio [type="radio"]');
    rb.forEach(function (el, i) {
        el.addEventListener('change', function (evt) {
            var name = this.getAttribute('name');
            var id = this.getAttribute('id');

            var inputs = document.querySelectorAll('input[name="' + name + '"]');
            inputs.forEach(function (item, j) {
                var el_id = item.getAttribute('id');
                item.removeAttribute('checked');
                var lbl = document.querySelector('label[for="' + el_id + '"]');
                lbl.classList.remove('checked');
            });

            var el = document.querySelector('#' + id);
            el.setAttribute('checked', true);
            var lbl = document.querySelector('label[for="' + id + '"]');
            lbl.classList.add('checked');
        });
    });

    var elems = document.querySelectorAll('.flywork-radio [type="radio"]:checked, .flywork-checkbox [type="checkbox"]:checked');
    elems.forEach(function (el, i) {
        var el_id = el.getAttribute('id');
        var lbl = document.querySelector('label[for="' + el_id + '"]');
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

});