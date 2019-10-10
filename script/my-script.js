window.onload = function() {
    /* stylization of "select" elements */
    let divWrapSelects, selElmnt, a, b, c;
    /* look for any elements with the class "select_wrap": */
    divWrapSelects = document.getElementsByClassName("select_wrap");
    for (let i = 0; i < divWrapSelects.length; i++) {
        selElmnt = divWrapSelects[i].getElementsByTagName("select")[0];
        /* for each element, create a new DIV that will act as the selected item: */
        a = document.createElement("div");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        divWrapSelects[i].appendChild(a);
        /* for each element, create a new DIV that will contain the option list: */
        b = document.createElement("div");
        b.setAttribute("class", "select-items select-hide");
        for (let j = 0; j < selElmnt.length; j++) {
            /* for each option in the original select element, create a new DIV that will act as an option item: */
            c = document.createElement("div");
            c.innerHTML = selElmnt.options[j].innerHTML;
            // added a class atribute to hide the first "option" of the "select" element
            if ( j == selElmnt.selectedIndex ) {
                c.setAttribute("class", "select-hide");
            }
            c.addEventListener("click", function() {
                /* when an item is clicked, update the original select box, and the selected item: */
                let y, s, h, tarrifInput;
                s = this.parentElement.parentElement.getElementsByTagName("select")[0];
                // div element with class name "select-selected"
                h = this.parentElement.previousSibling;
                for (let i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        if (this.closest('.choose_tarrif_plan')) {
                            // the input element with class name "tarrif_input"
                            tarrifInput = this.parentElement.parentElement.parentElement.nextElementSibling.querySelector('input');
                            if (tarrifInput) {
                                // write in the input element value of the slected option
                                tarrifInput.value = `${s[s.selectedIndex].getAttribute('data-price')} uah`;
                            }
                        }
                        h.innerHTML = this.innerHTML;
                        y = this.parentElement.getElementsByClassName("select-hide");
                        for (let k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected select-hide");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        divWrapSelects[i].appendChild(b);

        a.addEventListener("click", function(e) {
            /* when the select box is clicked, close any other select boxes, and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* a function that will close all select boxes in the document, except the current select box: */
        let x, y, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (let i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (let i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /* if the user clicks anywhere outside the select box, then close all select boxes: */
    document.addEventListener("click", closeAllSelect);


/* FOR NEWS PAGE */
/* Opens and closes news on the "news" page. */
    let newsSection     = document.querySelectorAll('.news_main');
    let photos          = document.querySelectorAll('.news_portfolio_item');
    let newsDescription = document.querySelectorAll('.news_main_description');
    let newsArrow       = document.querySelectorAll('.news_label_arrow');

    for (let i = 0; i < newsSection.length; i++) {
        newsSection[i].addEventListener("click", function() {
            openNews(this);
        });
        newsArrow[i].addEventListener("click", function(e) {
            e.stopPropagation();
            closeNews(this);
        });
    }
    // when you click on the block the news opens
    function openNews(elem) {
        let currentNewsDescription = elem.querySelector('.news_main_description_wrap');
        elem.classList.add('open');

        for (let i = 0; i < newsSection.length; i++) {
            if (elem == newsSection[i]) {
                // photos[i].style.display = "block";
                photos[i].style.opacity = 1;
                photos[i].style.visibility = 'visible';
                currentNewsDescription.style.height = `${newsDescription[i].offsetHeight}px`;
            } else {
                // photos[i].style.display = "none";
                photos[i].style.opacity = 0;
                photos[i].style.visibility = 'hidden';
                newsDescription[i].parentNode.style.height = '0px';
                newsSection[i].classList.remove('open');
            }
        }
    }
    // when you click on the arrow the news closes
    function closeNews(elem) {
        let currentNewsHeader  = elem.closest('.news_header');
        let currentNewsSection = elem.closest('.news_main');
        currentNewsHeader.nextElementSibling.style.height = '0px';
        currentNewsSection.classList.remove('open');
    }
    

/* FOR PRICE PAGE */
/* Opens and closes portfolio on the "price" page. */
    let portfolioLabels = document.querySelectorAll('.meeting_room_description_label');
    let portfolioPhotos = document.querySelectorAll('.price_portfolio_item');

    for (let i = 0; i < portfolioLabels.length; i++) {
        portfolioLabels[i].addEventListener("click", function() {
            openPortfolio(this);
        });
    }
    // when you click on the block the news opens
    function openPortfolio(elem) {
        console.log('label');
        for (let i = 0; i < portfolioLabels.length; i++) {
            if (elem == portfolioLabels[i]) {
                portfolioPhotos[i].style.opacity = 1;
                portfolioPhotos[i].style.visibility = 'visible';
            } else {
                portfolioPhotos[i].style.opacity = 0;
                portfolioPhotos[i].style.visibility = 'hidden';
            }
        }
    }

/* To display the element with class name 'bottom_marquee_position' after scrolling */
    let bottomMarquee = document.querySelector('.bottom_position_marquee');
    let scrollingElem = document.querySelector('.scrolling_element');
    if (scrollingElem) {
        scrollingElem.addEventListener('scroll', function () {
            if (bottomMarquee) {
                if ((scrollingElem.scrollTop + scrollingElem.clientHeight) == scrollingElem.scrollHeight) {
                    bottomMarquee.style.opacity = 1;
                } else {
                    bottomMarquee.style.opacity = 0;
                }
            }
        });
    }

/* To scroll smoothly by click the arrow (price.html) */
    let downArrow       = document.querySelector('.down_arrow_to_scroll');
    let scrollsElements = document.querySelectorAll('.arrow_scrolls_elem');
    if (downArrow) {
        downArrow.addEventListener('click', function () {
            for (let i = 0; i < scrollsElements.length; i++) {
                if (scrollsElements[i].getBoundingClientRect().top.toFixed() > 0) {
                    scrollsElements[i].scrollIntoView({behavior: 'smooth'});
                    for (let j = 0; j < portfolioPhotos.length; j++) {
                        if ( i == j) {
                            portfolioPhotos[j].style.opacity = 1;
                            portfolioPhotos[j].style.visibility = 'visible';
                        } else {
                            portfolioPhotos[j].style.opacity = 0;
                            portfolioPhotos[j].style.visibility = 'hidden';
                        }
                    }
                    break;
                }
            }
        });
    }

/* FOR PHONE PAGE */
/* Сreates a mask for entering a phone number */
    if (document.getElementById("phone")) {
        let phoneInput = document.getElementById("phone");
        let phoneMask = new Inputmask("+38(999)-999-99-99");
        phoneMask.mask(phoneInput);
    }
};