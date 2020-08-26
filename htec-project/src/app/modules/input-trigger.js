export default class InputTrigger {

    constructor() {
      this.run();
    }

    run() {
        document.getElementById('js-input-trigger').addEventListener('click', this.buttonTrigger.bind(this));
    }

    buttonTrigger() {
        document.getElementById('js-input-wrapper').classList.toggle('header-input-wrapper-is-active');
    }
}