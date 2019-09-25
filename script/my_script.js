window.onload = function() {
    // stylization of "select" elements
    let divWrapSelect, selElmnt, a, b, c;
    /*look for any elements with the class "select_wrap":*/
    divWrapSelect = document.getElementsByClassName("select_wrap");

    for (let i = 0; i < divWrapSelect.length; i++) {
        selElmnt = divWrapSelect[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        divWrapSelect[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");

        for (let j = 0; j < selElmnt.length; j++) {
            /*for each option in the original select element, create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function() {
                /*when an item is clicked, update the original select box, and the selected item:*/
                let y, s, h, tarrifInput;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                // div element with class name "select-selected"
                h = this.parentNode.previousSibling;
                // the input element with class name "tarrif_input"
                tarrifInput = this.parentNode.parentNode.parentNode.nextElementSibling.querySelector('input');
                for (let i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        // write in the input element value of the slected option
                        tarrifInput.value = s.getElementsByTagName('option')[s.selectedIndex].getAttribute('data-price');
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (let k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        divWrapSelect[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes, and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });

        // a.innerHTML = selElmnt.options[selElmnt.selectedIndex];

    }
    
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document, except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
            arrNo.push(i)
            } else {
            y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box, then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
};