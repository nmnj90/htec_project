export default class NewsData {

    constructor() {
      this.run();
      this.section = 'js-top-results';
    }

    run() {
        this.getNewsData('gb', 'js-top-results');

        for(let i = 0;i < document.getElementsByClassName('js-header-lang-btn').length; i++) {
            document.getElementsByClassName('js-header-lang-btn')[i].addEventListener('click', this.buttonTrigger.bind(this));
        }
    }

    getNewsData(countryValue, section) {
        const ul = document.getElementById(section);
        const url = 'https://newsapi.org/v2/top-headlines?country=' + countryValue + '&apiKey=1bba8f14ce07454285f34240181d07fc';
        fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            let articles = data.articles;
            return articles.map(function(article) {
                let li = document.createElement('li'),
                    h2 = document.createElement('h2'),
                    img = document.createElement('img'),
                    p = document.createElement('p');
                h2.innerHTML = article.author;
                img.src = article.urlToImage;
                p.innerHTML = article.description;
                li.appendChild(h2);
                li.appendChild(img);
                li.appendChild(p);
                ul.appendChild(li);
            })
        })
    }

    buttonTrigger(e) {
        document.getElementsByClassName('btn-is-active')[0].classList.remove('btn-is-active');
        e.target.classList.add('btn-is-active');
        document.getElementById(this.section).innerHTML = '';
        this.getNewsData(e.target.innerHTML, this.section);
    }
}