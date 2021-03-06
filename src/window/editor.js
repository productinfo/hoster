const mokit = require('mokit');
const template = require('../common/template');
const os = require('os');
const ipcRenderer = require('electron').ipcRenderer;
const textarea = require('./textarea');

module.exports = new mokit.Component({
  template: template('.editor'),
  components: { textarea },

  props: {

    item: { value: {} },
    downloading: false,

    //记录条数
    count() {
      if (!this.item) return 0;
      this.item.content = this.item.content || '';
      return this.item.content.split(os.EOL)
        .filter(item => {
          let trimedItem = item.trim();
          return trimedItem && /^[a-z0-9]/i.test(trimedItem);
        }).length;
    }
  },

  textareaChanged(content) {
    this.item.content = content;
  },

  contextmenu() {
    ipcRenderer.send('contextmenu');
  },

  download() {
    this.downloading = true;
    ipcRenderer.send('download', {});
  }
});