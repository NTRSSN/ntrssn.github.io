const openItem = item => {
    const container = item.closest('.team__elem');
    const contentBlock = container.find('.team__member-desc');
    const textBlock = contentBlock.find('.team__member-block');
    const reqHeight = textBlock.height();

    container.addClass('active');
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__member-desc');
    const itemContainer = container.find('.team__elem');

    itemContainer.removeClass('active');
    items.height(0);
}

$('.team__member-name').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__elem');

    if (elemContainer.hasClass('active')) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }


});