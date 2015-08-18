import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('md-card-collapsible', {
  unit: true
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('collapsible card renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  const component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
