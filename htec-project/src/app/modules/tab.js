export default class Tab {

    constructor() {
      this.run();
    }

    run() {
        for(let i = 0; i < document.getElementsByClassName('js-tab').length; i++) {
            document.getElementsByClassName('js-tab')[i].addEventListener('click', this.tabClick.bind(this));
        };
    }

    tabClick(e) {
        document.getElementsByClassName('tab-is-active')[0].classList.remove('tab-is-active');
        document.getElementById(e.target.dataset.id).classList.add('tab-is-active');
    }
}