import { filter, filteredDataCount, filtersActive, filterSize, filtering } from "./filter.js";
import { currentData, filteredData, setCurrentData } from './storage.js';
import { foundCount, reshuffle } from './items.js';
import { smallCart } from './Smallcart.js';


export const filtersPopup = document.querySelector('.filters__popup');
const filterShowBtn = filtersPopup.querySelector('.filters__show-animals');
let filterTimer;

export function findClickTarget(e) {
    let target = e.target;
    if (target.className == "checkbox") {
        filtersPopup.classList.remove('filters__popup_active')
        clearTimeout(filterTimer);
        if (target.checked) {
            filterTimer = setTimeout(() => insertPopup(target), 3000);
            filtersActive.push(target);
        } else {
            filtersPopup.classList.remove('filters__popup_active')
            if (filtersActive.includes(target)) {
                filtersActive.splice(filtersActive.indexOf(target), 1);
            }
            filterTimer = setTimeout(() => insertPopup(filtersActive[filtersActive.length - 1]), 3000);
        }
    }
    if (target.className == "filters__input") {
        filtersPopup.classList.remove('filters__popup_active')
        clearTimeout(filterTimer);
        if (target.value) {
            filterTimer = setTimeout(() => insertPopup(filterSize), 3000);
            // filtersActive.push(filterSize);
            if (!filtersActive.includes(target)) { filtersActive.push(target); }
        } else {
            filtersPopup.classList.remove('filters__popup_active')
            // if (filtersActive.includes(filterSize)) {
            //     filtersActive.splice(filtersActive.indexOf(filterSize), 1);
            // }            
            if (filtersActive.includes(target)) {
                filtersActive.splice(filtersActive.indexOf(target), 1);
            }
            filterTimer = setTimeout(() => insertPopup(filtersActive[filtersActive.length - 1]), 3000);
        }
    }
    console.log(filtersActive);
    if (filtersActive.length == 0) {
        setCurrentData(filteredData.slice());
        reshuffle();
    }
}

function insertPopup(target) {
    if (target) {
        foundCount.textContent = filteredDataCount;
        if (target.className == "checkbox") {
            filtersPopup.style.left = target.labels[0].getBoundingClientRect().width + 32 + 'px';
            filtersPopup.style.top = target.labels[0].getBoundingClientRect().y - filter.getBoundingClientRect().y + "px";
            if (!filtersPopup.classList.contains('filters__popup_active')) {
                filtersPopup.classList.add('filters__popup_active');
            }
        }
        if (target.className == "filters__inputs") {
            filtersPopup.style.left = filterSize.getBoundingClientRect().width + 32 + 'px';
            filtersPopup.style.top = filterSize.getBoundingClientRect().y - filter.getBoundingClientRect().y + "px";
            if (!filtersPopup.classList.contains('filters__popup_active')) {
                filtersPopup.classList.add('filters__popup_active');
            }
        }

    }
}

// filter.addEventListener("click", () => findClickTarget(event))


filterShowBtn.addEventListener('click', function (e) {
    e.preventDefault();
    reshuffle();
})