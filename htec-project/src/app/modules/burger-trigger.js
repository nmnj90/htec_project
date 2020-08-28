export default class BurgerTrigger {

    constructor() {
        this.run();
    }

    run() {
        document.getElementById('js-header-navigation-burger').addEventListener('click', this.triggerButtonBurger.bind(this));
    }

    triggerButtonBurger(e){
        document.getElementById('js-header-navigation-burger').classList.toggle('burger-is-active');
        document.getElementById('js-header-navigation-wrapper').classList.toggle('navigation-is-active');
    }
}