'use strict';

/**
 * 
 * @returns возвращает рандомный id для товаров
 */
const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random(36).substring(2, 15)
};

const cardLink = document.querySelectorAll('.card_img');
const cardBoxNav = document.querySelector('.card_box_nav')

cardLink.addEventListener('click', () => {
    cardBoxNav.classList.toggle('hiden');
});

console.log("putin huilo")





    /**
    
    const itemsBtn = document.querySelectorAll('.text_add_cart'); //все кнопки
    const item = document.querySelectorAll('.item'); // все классы которые являются родителями для кнопок
    const card = document.querySelector('.menu_link card_img'); // картинка корзины при клике будет выскакивать окно
    const cardQuantity = document.querySelector('.card_box_caunter'); //счетчик товаров над корзиной
    const fullPrice = document.querySelector('.card_box_nav_total_price'); //итоговая цена товара которая будет отражаться в корзине
    let price = 0;
    
    card.addEventListeneraddEventListener('click', () => {
        card.classList.toggle('hidden');
    
    
    
    
    
    /**
     * функция должна вернуть разметку
    */
    // const generateCartProduct = (title, price, id) => {
    //     return `



    //     </div>

    //     `;
    // };



    // itemsBtn.forEach(el => {
    //     el.closest('.item').setAttribute('data-id', randomId());
    //     el.addEventListener('click', (e) => {

    //     })
    // })
    * /


