import Ember from 'ember';
import computed from 'ember-new-computed';

export default Ember.Component.extend({
  checked: null,
  classNames: ['materialize-selectable-item'],

  _checked: computed('checked', 'group.selection', 'group.selection.[]', {
    get() {
      var group = this.get('group');
      if (!group) {
        return this.get('checked');
      }
      else {
        return group.isValueSelected(this.get('value'));
      }
    },
    set (key, val) {
      var group = this.get('group');
      if (!group) {
        this.set('checked', val);
      }
      else {
        group.setValueSelection(this.get('value'), val);
      }
      return !!val;
    }
  }),

  isSelected: Ember.computed.alias('_checked'),

  _setupLabel() {
    var $input = this.$('.materialize-selectable-item-input')[0];

    var inputId = $input ? $input.id : null;
    this.$('.materialize-selectable-item-label').attr('for', inputId);
  },

  didInsertElement() {
    this._super(...arguments);
    this._setupLabel();
  },

  group: Ember.computed(function () {
    return this.nearestWithProperty('__materializeSelectableItemGroup');
  })
});
