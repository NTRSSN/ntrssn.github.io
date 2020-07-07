function Accordeon(selector) {
    const acco = document.querySelector(selector);
    const items = acco.querySelector('[data-list]').children;
    
    acco.addEventListener('click', function(event) {
        const target = event.target.closest('[data-trigger]');

        if (!target) return;

        event.preventDefault();
        const activeClass = target.dataset.trigger;
        const item = target.parentNode;

        if (item.classList.contains(activeClass)) {
            item.classList.remove(activeClass);
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove(activeClass);
            }

            item.classList.add(activeClass);
        }
    });
}


new Accordeon('#acc-menu');
