export default class AccordionResize {

    constructor() {
        this.run();
    }

    run() {
       this.resizeAccordionOnLoad();  
       window.addEventListener("resize", this.resizeAccordionOnResize.bind(this));
    }

    resizeAccordionOnLoad(){
        if(screen.width < 600) {
            document.getElementById('js-accordion').style.maxWidth = screen.width - 30 + "px";
        } else {
            document.getElementById('js-accordion').style.maxWidth = "1130px";
        }
    }

    resizeAccordionOnResize(e){
        if(e.target.innerWidth < 1130) {
            document.getElementById('js-accordion').style.maxWidth = e.target.innerWidth - 30 + "px";
        } else {
            document.getElementById('js-accordion').style.maxWidth = "1130px";
        }
    }
}