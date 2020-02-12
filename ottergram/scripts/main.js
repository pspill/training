'use strict';

const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageUrl, titleText) {
    let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.src = imageUrl;
    let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-title-url');
}

function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickedHanlder(thumbnail) {
    thumbnail.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumbnail);
    });
}

function getThumbnailsArray() {
    let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    return Array.from(thumbnails);
}

function initializeEvents() {
    let thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickedHanlder);
}

initializeEvents();