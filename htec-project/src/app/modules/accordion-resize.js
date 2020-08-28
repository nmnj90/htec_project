export default class AccordionResize {

    constructor() {
        this.run();
    }

    run() {
       this.resizeAccordion(); 
       window.addEventListener("resize", this.resizeAccordion.bind(this));
    }

    resizeAccordion(){
        if(screen.width < 600) {
            document.getElementById('js-accordion').style.maxWidth = screen.width - 30 + "px";
        } else {
            document.getElementById('js-accordion').style.maxWidth = "1130px";
        }
    }
}