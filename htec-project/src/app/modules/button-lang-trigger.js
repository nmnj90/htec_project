export default class ButtonLangTrigger {

    constructor() {
      this.run();
    }

    run() {
        for(let i = 0;i < document.getElementsByClassName('js-header-lang-btn').length; i++) {
            document.getElementsByClassName('js-header-lang-btn')[i].addEventListener('click', this.buttonTrigger.bind(this));
        }
    }

    buttonTrigger(e) {
        document.getElementsByClassName('btn-is-active')[0].classList.remove('btn-is-active');
        e.target.classList.add('btn-is-active');
    }
}