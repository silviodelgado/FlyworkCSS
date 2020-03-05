(function () {
    "use strict";

    $('.flywork-checkbox [type="checkbox"]').each(function (i, el) {
        var id = $(el).attr('id');
        $(el).on('change', function () {
            $('label[for="' + id + '"]').toggleClass('checked', el.checked);
        });
    })
    $('.flywork-radio [type="radio"]').on('change', function () {
        var name = $(this).attr('name');
        var id = $(this).attr('id');

        $('input[name="' + name + '"]').each(function (i, el) {
            var el_id = $(el).attr('id');
            $(el).removeAttr('checked');
            $('label[for="' + el_id + '"]').removeClass('checked');
        });
        $('#' + id).attr('checked', true);
        $('label[for="' + id + '"]').addClass('checked');
    });
    $('.flywork-radio [type="radio"]:checked, .flywork-checkbox [type="checkbox"]:checked').each((i, el) => {
        var el_id = $(el).attr('id');
        $('label[for="' + el_id + '"]').addClass('checked');
    });
    $('.flywork-labels input.form-control, .flywork-labels select.form-control, flywork-labels textarea.form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
    $('.flywork-labels .form-control').on('blur', function (e) {
        $(this).attr('value', this.value);
    });
    $('.flywork-labels select.form-control').trigger('focus').trigger('blur'); // bugfix
})();