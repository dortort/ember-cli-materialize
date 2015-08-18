import Ember from 'ember';
import MaterializeInputField from './md-input-field';
import layout from '../templates/components/md-input';

export default MaterializeInputField.extend({
  layout,
  type: 'text',

  validationClass: Ember.computed('validate', 'isValid', function() {
    if (this.get('validate')) {
      return this.get('isValid') ? 'valid' : 'invalid';
    }
    return '';
  }),

  setupLabel: Ember.on('didInsertElement', Ember.observer('value', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      var labelSelector = this.$('> label');
      if (Ember.isPresent(this.get('value')) && !labelSelector.hasClass('active')) {
        labelSelector.addClass('active');
      }
    });
  }))
});
