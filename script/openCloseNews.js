window.onload = function() {

    let newsSection     = document.getElementsByClassName('news_main');
    let photos          = document.getElementsByClassName('news_portfolio_item');
    let newsDescription = document.getElementsByClassName('news_main_description');
    let newsArrow       = document.getElementsByClassName('news_label_arrow');

    for (let i = 0; i < newsSection.length; i++) {
        newsSection[i].addEventListener("click", function() {
            openNews(this);
        });
        newsArrow[i].addEventListener("click", function(e) {
            e.stopPropagation();
            closeNews(this);
        });
    }

    function openNews(elem) {
        let currentNewsLabelArrow  = elem.querySelector('.news_label_arrow');
        let currentNewsDescription = elem.querySelector('.news_main_description_wrap');

        currentNewsLabelArrow.style = {

        };

        for (let i = 0; i < newsSection.length; i++) {
            if (elem == newsSection[i]) {
                photos[i].style.display = "block";
                currentNewsDescription.style.height = `${newsDescription[i].offsetHeight}px`;
            } else {
                photos[i].style.display = "none";
                newsDescription[i].parentNode.style.height = '0px';
            }
        }
    }

    function closeNews(elem) {
        let newsHeader = elem.closest('.news_header');
        newsHeader.nextElementSibling.style.height = '0px';
    }
};