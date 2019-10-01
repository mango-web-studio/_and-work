window.onload = function() {
    // stylization of "select" elements
    let divWrapSelects, selElmnt, a, b, c;
    /*look for any elements with the class "select_wrap":*/
    divWrapSelects = document.getElementsByClassName("select_wrap");
    for (let i = 0; i < divWrapSelects.length; i++) {
        selElmnt = divWrapSelects[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("div");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        divWrapSelects[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("div");
        b.setAttribute("class", "select-items select-hide");
        for (let j = 0; j < selElmnt.length; j++) {
            /*for each option in the original select element, create a new DIV that will act as an option item:*/
            c = document.createElement("div");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function() {
                /*when an item is clicked, update the original select box, and the selected item:*/
                let y, s, h, tarrifInput;
                s = this.parentElement.parentElement.getElementsByTagName("select")[0];
                // div element with class name "select-selected"
                h = this.parentElement.previousSibling;
                for (let i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        if (this.parentElement.parentElement.parentElement.classList.contains('meeting_room_description_tarrif_plan')) {
                            // the input element with class name "tarrif_input"
                            tarrifInput = this.parentElement.parentElement.parentElement.nextElementSibling.querySelector('input');
                            if (tarrifInput) {
                                // write in the input element value of the slected option
                                tarrifInput.value = s[s.selectedIndex].getAttribute('data-price');
                            }
                        }
                        h.innerHTML = this.innerHTML;
                        y = this.parentElement.getElementsByClassName("same-as-selected");
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
            /*when the select box is clicked, close any other select boxes, and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document, except the current select box:*/
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
    /*if the user clicks anywhere outside the select box, then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
};