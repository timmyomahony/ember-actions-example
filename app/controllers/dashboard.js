import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dashboard: service(),
  selectModules: false,
  actions: {
    exportModules() {
      this.get('dashboard.selectedModules').forEach(component => {
        component.export();
      })
      this.get('dashboard').deselectAll();
      this.set('selectModules', false);
    },
    toggleSelectAll() {
      this.get('dashboard').toggleSelectAll();
    },
    toggleSelectModules() {
      this.set('selectModules', ! this.get('selectModules'));
    }
  }
});
