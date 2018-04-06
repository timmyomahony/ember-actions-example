import Service from '@ember/service';
import {computed} from '@ember/object';

export default Service.extend({
  modules: null,
  selectedModules: null,
  allSelected: computed('modules.[]', 'selectedModules.[]', function() {
    return this.get('modules.length') === this.get('selectedModules.length');
  }),
  toggleSelectAll() {
    if (this.get('allSelected')) {
      this.deselectAll();
    } else {
      this.selectAll();
    }
  },
  selectAll() {
    console.info(`Selecting ${this.get('modules.length')} module(s)`)
    this.get('selectedModules').clear();
    this.get('selectedModules').setObjects(this.get('modules'));
  },
  deselectAll() {
    console.info(`Deselecting ${this.get('selectedModules.length')} module(s)`)
    this.get('selectedModules').clear();
  },
  selectModule(component) {
    console.info(`Selecting module ${component.get('elementId')}`);
    let selectedModules = this.get('selectedModules'),
        modules = this.get('modules');
    if(!selectedModules.includes(component) && modules.includes(component)) {
      selectedModules.addObject(component);
    }
  },
  deselectModule(component) {
    console.info(`Deselecting module ${component.get('elementId')}`);
    let selectedModules = this.get('selectedModules'),
        modules = this.get('modules');
    if(selectedModules.includes(component) && modules.includes(component)) {
      selectedModules.removeObject(component);
    }
  },
  moduleSelected(component) {
    return this.get('selectedModules').includes(component);
  },
  register(component) {
    let modules = this.get('modules');
    if(! modules.includes(component)) {
      console.log(`Registering component ${component.get('elementId')}`);
      modules.addObject(component);
    } else {
      console.error(`Couldn't register component ${component.get('elementId')} to module ${this.get('elementId')}`);
    }
  },
  unregister(component) {
    let modules = this.get('modules');
    if(modules.includes(component)) {
      console.log(`Unregistering component ${component.get('elementId')}`);
      modules.removeObject(component);
    } else {
      console.error(`Couldn't unregister component ${component.get('elementId')} from module ${this.get('elementId')}`);
    }
  },
  init() {
    this._super(...arguments);
    this.set('modules', []);
    this.set('selectedModules', []);
  }
});
