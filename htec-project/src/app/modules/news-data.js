export default class NewsData {

    constructor() {
        this.section = 'js-top-results';
        this.lang = 'gb';
        this.category = null;
        this.run();
    }

    run() {
        this.getNewsData('js-top-results', 'gb', null);

        for(let i = 0; i < document.getElementsByClassName('js-tab').length; i++) {
            document.getElementsByClassName('js-tab')[i].addEventListener('click', this.tabClick.bind(this));
        };

        for(let i = 0;i < document.getElementsByClassName('js-header-lang-btn').length; i++) {
            document.getElementsByClassName('js-header-lang-btn')[i].addEventListener('click', this.triggerButton.bind(this));
        }

        for(let i = 0; i < document.getElementsByClassName('js-accordion-title').length; i++){
            document.getElementsByClassName('js-accordion-title')[i].addEventListener('click', this.accordionClick.bind(this));
        }

    }

    getNewsData(section, countryValue, categoryValue) {
        const ul = document.getElementById(section);
        let url;
        if(categoryValue == null ) {
            url = 'https://newsapi.org/v2/top-headlines?country=' + countryValue + '&apiKey=1bba8f14ce07454285f34240181d07fc';
        } else {
            url = 'https://newsapi.org/v2/top-headlines?country=' + countryValue + '&category=' + categoryValue + '&apiKey=1bba8f14ce07454285f34240181d07fc';
        }
        fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            let articles = data.articles;
            return articles.map(function(article) {
                let li = document.createElement('li'),
                    div = document.createElement('div'),
                    h2 = document.createElement('h2'),
                    img = document.createElement('img'),
                    p = document.createElement('p');
                h2.innerHTML = article.author;
                img.src = article.urlToImage;
                p.innerHTML = article.description;
                li.appendChild(div);
                div.appendChild(img);
                div.appendChild(h2);
                div.appendChild(p);
                ul.appendChild(li);
            })
        })
    }

    triggerButton(e) {
        document.getElementsByClassName('btn-is-active')[0].classList.remove('btn-is-active');
        e.target.classList.add('btn-is-active');
        document.getElementById(this.section).innerHTML = '';
        this.lang = e.target.innerHTML
        this.getNewsData(this.section, this.lang, this.category);
    }

    tabClick(e) {
        document.getElementsByClassName('tab-is-active')[0].classList.remove('tab-is-active');
        document.getElementById(e.target.dataset.id).classList.add('tab-is-active');
        if(e.target.dataset.id == 'tab-top-news') {
            this.category = null;
            this.section = 'js-top-results';
        } else {
            this.category = document.getElementsByClassName('accordion-is-active')[0].firstElementChild.innerHTML;
            this.section = 'js-' + document.getElementsByClassName('accordion-is-active')[0].firstElementChild.innerHTML;
        }
        this.getNewsData(this.section, this.lang, this.category);
    }

    accordionClick(e){
        document.getElementsByClassName('accordion-is-active')[0].classList.remove('accordion-is-active');
        e.target.parentElement.classList.toggle('accordion-is-active');
        this.category = e.target.innerHTML;
        this.section = 'js-' + e.target.innerHTML;
        this.getNewsData(this.section, this.lang , this.category);
    }
}