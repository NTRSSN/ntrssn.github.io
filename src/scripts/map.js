let myMap;


const init = () => {
    myMap = new ymaps.Map("map", {
        center: [45.029222, 39.014774],
        zoom: 11.95,
        controls: []
    });

    const coords = [
        [45.005714, 39.025815],
        [45.034084, 39.143978],
        [45.055968, 39.016944],
        [45.029463, 39.026879]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./img/icons/marker.svg",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);