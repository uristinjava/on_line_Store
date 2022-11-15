'use strict'

const quantityEl = document.querySelector('.card_box_caunter'); //переменная счетчика корзины card_box_caunter
const fullPriceEl = document.querySelector('card_box_nav_total') //переменная блока ИТОГО
const fullPriceValueEl = document.querySelector('.card_box_nav_total_price'); // счетчик итоговой цены переменная ИТОГО куда показывается вся стоимость покупки
const cardEl = document.querySelector('card_box_nav')//переменная корзины


const itemProducts = document.querySelectorAll('.item');// коллекция всех item нужно для присваивания рандомных id
const productsBts = document.querySelectorAll('.add_link'); //коллекция кнопок


const card = {};




/**
 * 
 * @returns возвращает случайный номер Id
 */
const randomID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
};

itemProducts.forEach(el => {
    el.closest('.item').setAttribute('data-id', randomID());
});



/**
 * 
 * @param {принимает строку itemPrice} str 
 * @returns возвращает число из строки без символов для сложения цен
 */
const transformPriceNum = (currentPrice) => {
    return parseFloat(currentPrice.slice(1));    //!!!!itWORK
};



//добавляем обработчик события "клик" для появления корзины !!!!itWORK
document.querySelector('.card_img').addEventListener('click', () => {
    document.querySelector('.card_box_nav').classList.toggle('hidden')
});

//Добавляем обработчик события по клику на кнопку add to card
document.querySelector('.item_box').addEventListener('click', event => {
    if (!event.target.closest('.add_link')) {
        return;
    }
    const itemEl = event.target.closest('.item'); //получаем ближайщего родителя 

    const itemName = event.target.closest('.item').querySelector('.item_header').textContent //получаем наименование товара
    itemEl.setAttribute('data-name', itemName) // присвоили data-name в item

    const itemPrice = transformPriceNum(event.target.closest('.item').querySelector('.item_price').textContent) //получаем цену товара тип NUMBER
    itemEl.setAttribute('data-price', itemPrice); // присвоили data-price в item

    const id = itemEl.dataset.id // получаем id родителя установленного в data-id
    const name = itemEl.dataset.name //получаем name родителя установленного в data-name
    const price = itemEl.dataset.price //получаем price родителя установленного в data-price



    //Добавить в корзину товар
    //addToCard(id, name, price); //нужно прописать функцию добавления товара в корзину
});

const addToCard = (id, name, price) => {
    if (!(id in card)) {
        card[id] = { id: id, name: name, price: price, count: 0 };
        card[id].count++;

        quantityEl.textContent = getTotalCardCount().toString(); //прописать функцию getTotalBasketCount

        fullPriceValueEl.textContent = getTotalCardPrice().toFixed(2);//прописать функцию

        renderProductInBasket(id); //прописать функцию отрисовки 
    }
};

const getTotalCardCount = () => {
    return Object.values(card).reduce((acc, product) => acc + product.count, 0);
};

const getTotalCardPrice = () => {
    return Object
        .values(card)
        .reduce((acc, product) => acc + product.price * product.count, 0);
};

console.log(document.querySelector('.item').dataset.id)

const renderProductInBasket = (itemId) => {
    const cardRowEl = document
        .querySelector(`.item`).dataset.id; //card_box_nav_link_title_list
    if (!cardRowEl) {
        renderNewProductInBasket(itemId);
        return;
    }
    const product = card[itemId];
    //cardRowEl.querySelector('.count').textContent = product.count;

    // cardRowEl
    //     .querySelector('.productTotalRow')
    //     .textContent = (product.price * product.count).toFixed(2);

};

const renderNewProductInBasket = (id) => {
    const productRow = `
    <div class="card_box_nav_link_title_list" data-id = ${id}>
        <div class="card_box_nav_link name"> ${document.querySelector('.item').dataset.name} </div>
        <div class="card_box_nav_link count"> ${card[id].count}  </div>
        <div class="card_box_nav_link price"> ${(card[id].price * card[id].count).toFixed(2)} </div>
    </div>
    `
    document
        .querySelector('.card_box_nav_link_title_list')
        .insertAdjacentHTML("beforebegin", productRow);
}

console.log(document.querySelector('.card_box_nav_link_title_list'))