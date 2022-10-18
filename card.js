"use strict";

const productsBts = document.querySelectorAll('.add_link'); //коллекция кнопок
const listItem = document.querySelector('.title_list'); //товар в корзине
const cardEl = document.querySelector('.card_box_nav_item');//переменная корзины
const quantity = document.querySelector('.card_box_caunter'); //переменная счетчика корзины card_box_caunter
const fullPriceValue = document.querySelector('.card_box_nav_total_price'); // счетчик итоговой цены переменная ИТОГО куда показывается вся стоимость покупки






const fullPrice = document.querySelector('.card_box_nav_total'); //переменная которая хранит и текст итого и спан счетчика общей стоиомсти
const itemElts = document.querySelectorAll('.item');//коллекция товаров
const itemPrices = document.querySelectorAll('.item_price')//коллекция цен товара
const itemPrice = document.querySelector('.item_price').innerText;//переменная цены товара

const itemEl = document.querySelector('.item'); // переменная item

let price = 0; //переменная в которую будут приходить цены товаров для выведения в ИТОГО

const card = {}

let count = 0;


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
const transformPriceNum = (currentPrice) => {
    return parseFloat(currentPrice.slice(1));    //!!!!itWORK
};



//добавляем обработчик события "клик" для появления корзины !!!!itWORK
document.querySelector('.card_img').addEventListener('click', () => {
    document.querySelector('.card_box_nav').classList.toggle('hidden')
});

//добавляем рандомный id для каждого item !!!!itWORK - если мы будем добавлять товар, то не нужно будет думать про id
itemElts.forEach(el => {
    el.closest('.item').setAttribute('data-id', randomID());
});


//функция отрисовки html разметки для корзины - !!!!itWORK
const generateCardProduct = (id, productName, priceForPrint, count = 0) => {
    const rowHtml = `
     <div class="card_box_nav_link title_list" data-id = ${id}>
        <div class="card_box_nav_link name"> ${productName} </div>
        <div class="card_box_nav_link count"> ${++count} </div>
        <div class="card_box_nav_link price"> ${priceForPrint} </div>
    </div>
 `;
    return rowHtml
};

//функция возвращает строку html в корзину при клике
const renderHtml = (id, productName, priceForPrint, count) => {
    const rowHtml = document
        .querySelector('.card_box_nav_link_title_list')
        .insertAdjacentHTML('beforeEnd', generateCardProduct(id, productName, priceForPrint, count));
    return rowHtml
};


//функция возвращение количества товаров в корзине !!!!itWORK
const printQuantity = () => {
    let length = document.querySelector('.card_box_nav_link_title_list').children.length;
    quantity.textContent = length;
};

//Функция сложения общей стоимости товаров !!!!itWORK
const summFullPrice = (currentPrice) => {
    price += currentPrice;
    return Math.round(price * 100) / 100
};



/**
 * 
 * @returns возвращает сумму всех цен в разметку 
 * выдает округленное число до второго знака по правилам математики
    !!!!itWORK
 */
const printSumm = () => {

    return document.querySelector('.card_box_nav_total_price')
        .textContent = `$${Math.round(price * 100) / 100}`
};





//обрабатываем каждую кнопку на событие 'клик'
productsBts.forEach(el => {
    //el.closest('.item').setAttribute('data-id', randomID()); //присваиваем рандомные id каждому item без клика !!!!itWORK
    //добавляем обработчик события по клику на кнопку add to card
    el.addEventListener(('click'), (e) => {
        const self = e.currentTarget; //нажатие на определнную кнопку !!!!itWORK   
        const parent = self.closest('.item'); //определяем родителя у кнопки item !!!!itWORK
        const id = parent.dataset.id; //переменная data-id достаем уникальный номер родителя !!!!itWORK

        //получаем наименование товара который соответствует определенному item=> связываем item и название товара !!!!itWORK
        const productName = parent.querySelector('.item_header').innerText;

        //присваеваем item атрибут data-name соответствующий наименованию товара
        parent.setAttribute('data-name', productName);

        //получаем цену для вывода в печать !!!!itWORK
        const priceForPrint = parent.querySelector('.item_price').textContent

        //переменная цены которая соответствует определенному item => связываем item и стоимость товара сразу получаем цену в num для ведения расчетов (сложение) !!!!itWORK
        const priceForCalck = transformPriceNum(priceForPrint);

        //присваеваем item атрибут data-price соответствующий наименованию товара
        parent.setAttribute('data-price', priceForCalck);

        //сумма  !!!!itWORK
        summFullPrice(priceForCalck)

        //вывести цену ИТОГО в корзину !!!!itWORK
        printSumm()


        // отрисовываем строку html в корзине!!!!itWORK
        renderHtml(id, productName, priceForPrint, count)

        //вывести число товаров в счетчик !!!!itWORK
        printQuantity()



    });
});














//пробы
// const addToCard = (id, name, price) => {
//     if (!(id in card)) {
//         card[id] = { id: id, name: name, price: price, count: 0 };
//         card[id].count++;

//         quantityEl.textContent = getTotalCardCount().toString(); //прописать функцию getTotalBasketCount

//         fullPriceValueEl.textContent = getTotalCardPrice().toFixed(2);//прописать функцию

//         renderHtml(id, name, price);
//     }
// }
// const getTotalCardCount = () => {
//     return Object.values(card).reduce((acc, product) => acc + product.count, 0);
// };

// const getTotalCardPrice = () => {
//     return Object
//         .values(card)
//         .reduce((acc, product) => acc + product.price * product.count, 0);
// };

//пробы закончились
