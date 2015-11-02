import Ember from 'ember';
import MaterializeInputField from './md-input-field';
import layout from '../templates/components/md-select';

export default MaterializeInputField.extend({
  layout: layout,

  optionLabelPath: 'content',
  optionValuePath: 'content',

  setupSelect: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      // HACK for when no option pre-selected
      if (0 === this.$('select option:selected').length) {
        this.$('select option:first').attr('selected', true);
      }
      // init select
      this.$('select').material_select();
    });
  }),

  updateSelect: Ember.observer('content.[]', 'value', function() {
    Ember.run.later(() => {
      // update select
      this.$('select').material_select();
    });
  }),

  //TODO: clean up any listeners that $.select() puts in place
  // _teardownSelect() {
  //
  // }

  //TODO: this could be converted to a computed property, returning a string
  //  that is bound to the class attribute of the inputSelector
  errorsDidChange: Ember.observer('errors', function() {
    var inputSelector = this.$('input');
    // monitor the select's validity and copy the appropriate validation class to the materialize input element.
    if (!Ember.isNone(inputSelector)) {
      Ember.run.later(this, function() {
        var isValid = this.$('select').hasClass('valid');
        if (isValid) {
          inputSelector.removeClass('invalid');
          inputSelector.addClass('valid');
        } else {
          inputSelector.removeClass('valid');
          inputSelector.addClass('invalid');
        }
      }, 150);
    }
  })
});
