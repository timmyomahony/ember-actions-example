import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default Component.extend({
  dashboard: service(),
  notifications: service('notification-messages'),
  classNameBindings: [
    'isSelectable',
    'isSelected'
  ],
  isSelectable: false,
  isSelected: computed('dashboard.selectedModules.[]', function() {
    return this.get('dashboard.selectedModules').includes(this);
  }),
  click() {
    if(this.get('isSelectable')) {
      if(! this.get('isSelected')) {
        this.get('dashboard').selectModule(this);
      } else {
        this.get('dashboard').deselectModule(this);
      }
    }
  },
  // Send event to iframe
  export(panoSlug) {
    this.get('notifications').success(`Exporting module ${this.get('elementId')}`, {
      autoClear: true
    });
  },
  didInsertElement() {
    this._super(...arguments);
    
    // Register with service
    this.get('dashboard').register(this);
  },
  willRemoveElement() {
    this._super(...arguments);

    // Unregister with service
    this.get('dashboard').unregister(this);
  }
});
