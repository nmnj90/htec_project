export default class NewsData {

    constructor() {
        this.section = 'js-top-results';
        this.lang = 'gb';
        this.category = null;
        this.search = false;
        this.run();
    }

    run() {
        this.getNewsData('js-top-results', 'gb', null);

        document.getElementById('js-input-trigger').addEventListener('click', this.tiggerButtonInput.bind(this));

        document.querySelector("#js-form").addEventListener('submit', this.submitForm.bind(this));

        for(let i = 0; i < document.getElementsByClassName('js-tab').length; i++) {
            document.getElementsByClassName('js-tab')[i].addEventListener('click', this.tabClick.bind(this));
        };

        for(let i = 0;i < document.getElementsByClassName('js-header-lang-btn').length; i++) {
            document.getElementsByClassName('js-header-lang-btn')[i].addEventListener('click', this.triggerButtonLang.bind(this));
        }

        for(let i = 0; i < document.getElementsByClassName('js-accordion-title').length; i++){
            document.getElementsByClassName('js-accordion-title')[i].addEventListener('click', this.accordionClick.bind(this));
        }

    }

    getNewsData(section, countryValue, categoryValue) {
        const ul = document.getElementById(section);
        let url;
        if(this.search == true) {
            let inputValue = document.getElementById('js-input').value;
            url = 'https://newsapi.org/v2/top-headlines?q=' + inputValue + '&apiKey=da33ec4d829e41b6b493459b77b2601a';
        } else {
            if(categoryValue == null ) {
                url = 'https://newsapi.org/v2/top-headlines?country=' + countryValue + '&apiKey=da33ec4d829e41b6b493459b77b2601a';
            } else {
                url = 'https://newsapi.org/v2/top-headlines?country=' + countryValue + '&category=' + categoryValue + '&apiKey=da33ec4d829e41b6b493459b77b2601a';
            }
        }
        document.getElementById(this.section).innerHTML = '';
        fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            let articles = data.articles;
            if(data.articles.length > 0) {
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
            } else {
                let paragraph = 'No search results, please try again'
                let p = document.createElement('p');
                p.innerHTML = paragraph;
                ul.appendChild(p);
            }
        })
    }

    triggerButtonLang(e) {
        if(this.search == false) {
            document.querySelector('.btn-is-active').classList.remove('btn-is-active');
            e.target.classList.add('btn-is-active');
            this.lang = e.target.innerHTML
            this.getNewsData(this.section, this.lang, this.category);
        }
    }

    tabClick(e) {
        this.search = false;
        document.getElementsByClassName('tab-is-active')[0].classList.remove('tab-is-active');
        document.getElementById(e.target.dataset.id).classList.add('tab-is-active');
        document.getElementsByClassName('link-is-active')[0].classList.remove('link-is-active');
        e.target.classList.add('link-is-active');
        if(e.target.dataset.id == 'tab-top-news') {
            this.category = null;
            this.section = 'js-top-results';
        } else {
            this.category = document.getElementsByClassName('accordion-is-active')[0].firstElementChild.innerHTML;
            this.section = 'js-' + document.getElementsByClassName('accordion-is-active')[0].firstElementChild.innerHTML;
        }
        if(this.search != true) {
            document.getElementById('js-header-lang').classList.remove('header-lang-is-disabled');
            document.getElementById('js-input-wrapper').classList.remove('header-input-wrapper-is-active');
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

    tiggerButtonInput(e) {
        document.getElementsByClassName('link-is-active')[0].classList.remove('link-is-active');
        e.target.classList.add('link-is-active');
        this.search = true;
        this.section = 'js-search'
        if(this.search == true) {
            document.getElementById('js-header-lang').classList.add('header-lang-is-disabled');
            document.getElementById('js-input-wrapper').classList.toggle('header-input-wrapper-is-active');
        }
    }

    submitForm(e) {
        if(document.getElementById('js-input').value.length > 0) {
            document.getElementsByClassName('tab-is-active')[0].classList.remove('tab-is-active');
            document.getElementById('tab-search').classList.add('tab-is-active');
            this.getNewsData(this.section);
            e.preventDefault();
        }
    }
}