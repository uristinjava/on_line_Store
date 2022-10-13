'use strict'

const productsBts = document.querySelectorAll('.text_add_cart'); //коллекция кнопок
const item = document.querySelector('.item'); //переменная карточки товара
const card = document.querySelector('.card_box_nav hidden');//переменная корзины
const quantity = document.querySelector('.card_box_caunter'); //переменная счетчика корзины
const fullPrice = document.querySelector('.card_box_nav_total') //переменная итоговой цены
const itemPrice = document.querySelector('.item_price').textContent; //переменная цены в товаре !!!Передается строкой!!!

let price = 0; //переменная цены которая будет пересчитываться и подставляться в ИТОГО

/**
 * 
 * @returns возвращает случайный номер Id
 */
const randomID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
};

/**
 * 
 * @param {принимает строку itemPrice} str 
 * @returns возвращает число из строки без символов для сложения цен
 */
const transformPriceNum = (priceSrt) => {
    return parseFloat(priceSrt.slice(1));
};

/**
 * возвращает цену со знаком $ для подстановки в корзину ИТОГО
 */
const transformPriceStr = (price) => {
    return `$${price}`;
};

/**
 * выводит общую стоимость всех товаров
 */
const plussFullPrice = (currentPrice) => {
    currentPrice = transformPriceNum(itemPrice);
    return Math.round((price += currentPrice) * 100) / 100;
};


/**
 * выводит число в ИТОГО
 */
const printFullPrice = () => {
    fullPrice.textContent = `${transformPriceStr(price)}`
};

const printQuantity = () => {
    let length = item.querySelector('.card_box_nav').children.length;
    quantity.textContent = length;
};

const generateCardProduct = (itemHeader, count, ItemPrice, id) => {
    return `
    <div class="card_box_nav hidden">
         <div class="card_box_nav_title" data-id = ${id}>
            <div class="card_box_nav_title_name">Товар</div>
            <div class="card_box_nav_title_name">Количество</div>
            <div class="card_box_nav_title_name">Цена</div>
        </div>

        <div class="card_box_nav_item">
            <ul class="card_box_nav_link">
                 <li class="card_box_nav_link name">${itemHeader}</li>
                <li class="card_box_nav_link count">${count}</li>
                <li class="card_box_nav_link price">${ItemPrice}</li>
            </ul>

        </div>

        <div class="card_box_nav_total">
            Итого: <span class="card_box_nav_total_price">${price}</span>

        </div>
    </div>
    `;
};

productsBts.forEach(el => {
    el.closest('.item').setAttribute('data-id', randomID());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.item');
        let id = parent.dataset.id;
        let itemHeader = parent.querySelector('.item_header').textContent;;
        let count = parent.querySelector('.item');
        let pricesStr = parent.querySelector('.item_price').textContent;

        let priceNumber = transformPriceNum(parent.querySelector('.item_price').textContent);
        console.log(priceNumber);

        // действия:
        //ссумирует стоимость товара ИТОГО !it Work!
        plussFullPrice(priceNumber);
        console.log(plussFullPrice(priceNumber));

        //выводит полную стоимость 
        printFullPrice();

        //добавляет в корзину товар
        item.querySelector('.card_box_nav').insertAdjacentHTML('afterbegin', generateCardProduct(itemHeader, count, priceNumber, id))

        //счетает и выводит количество товаров в корзине через счетчик
        printQuantity()


        //добавляет несколько однотипных товаров в корзину




    });
});














