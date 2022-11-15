'use strict';

const itemEls = document.querySelectorAll('.item')//коллекция товаров 
const addBtn = document.querySelector('.add_link'); // кнопка добавить в корзину
const itemEl = document.querySelector('.item'); // переменная товара

const cart = document.querySelector('.card_box_nav_link_title_list')// переменная внутринностей корзины
const cardEl = document.querySelector('.card_box_nav')// корзина

const totalPriceEl = document.querySelector('.card_box_nav_total_price')//Место куда выводится общая стоимость товара


/**
 * 
 * @returns возвращает случайный номер Id
 */
const randomID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
};



//присваиваем рандомный id для каждого товара
itemEls.forEach(el => {
    el.setAttribute('data-id', randomID())
})

//функция перевода цены товара для подсчета //itWORK
const transformPriceNum = (currentPrice) => {
    return parseFloat(currentPrice.replace(/[^0-9,.]/g, ' '))

};


const normalPrice = (currentPrice) => {
    let i = Math.round(currentPrice * 100) / 100
    return `$ ${String(i)}`
}





//добавляем открытия корзины при клике
document.querySelector('.card_img').addEventListener('click', () => {
    cardEl.classList.toggle('hidden')
});

//отлавливаем клик по кнопке add_to_cart
window.addEventListener('click', event => {

    let counterTotal = document.querySelector('.card_box_caunter') // счетчик товаров находящихся в корзине


    if (!event.target.closest('.add_link')) {
        return
    }

    //при клике на add to cart увеличиваем счетчик количество товаров в корзине !!!!!!!itWORK
    counterTotal.innerText = ++counterTotal.innerText;

    const item = event.target.closest('.item') // переменная товара
    const id = item.dataset.id // id товара
    const name = item.querySelector('.item_header').innerText //наименование товара
    let count = 1
    const price = transformPriceNum(item.querySelector('.item_price').innerText)


    const itemInfo = {
        id: id,
        name: name,
    };

    //проверяем есть ли товар в корзине
    const itemInCart = cart.querySelector(`[data-id = "${itemInfo.id}"]`);


    //если товара в корзине, то прибавляем единицу к счетчику
    if (itemInCart) {
        //суммируем количество товаров одного типа
        const counterEl = itemInCart.querySelector('.count')
        counterEl.innerText = ++counterEl.innerText

        //суммируем сумму одного товара
        const priceEl = itemInCart.querySelector('.price')
        priceEl.innerText = `$${Math.round((price * parseInt(counterEl.innerText)) * 100) / 100}`

    } else {

        const cartItemHtml = `
    <div class="card_box_nav_link title_list" data-id = ${itemInfo.id}>
        <div class="card_box_nav_link name"> ${itemInfo.name} </div>
        <div class="card_box_nav_link count"> ${count} </div>
        <div class="card_box_nav_link price"> $${price}</div>
    </div>
    `;
        cart.insertAdjacentHTML('beforeend', cartItemHtml)
    }


    //сумма всех товаров
    summFullPrice()

});

//считаем сумму всех товаров
const summFullPrice = () => {
    const cartItems = document.querySelectorAll('.title_list');
    let totalPrice = 0;

    cartItems.forEach(el => {
        let i = el.querySelector('.price').innerText;
        const priceInCart = transformPriceNum(i)

        totalPrice += priceInCart
    })
    totalPriceEl.innerText = normalPrice(totalPrice)
};









