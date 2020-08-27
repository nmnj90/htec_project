export default class InputTrigger {

    constructor() {
      this.run();
    }

    run() {
        document.getElementById('js-input-trigger').addEventListener('click', this.buttonTrigger.bind(this));
    }

    buttonTrigger(e) {
        document.getElementsByClassName('link-is-active')[0].classList.remove('link-is-active');
        document.getElementById('js-input-wrapper').classList.toggle('header-input-wrapper-is-active');
        e.target.classList.add('link-is-active');
    }
}