const BURRITO = "img/burrito.png";
const BURRITO_BOWL = "img/burrito_bowl.png";
const TACOS = "img/three_tacos.png";

const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list= document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

//array of objects
let products = [
    {
        "id": 1,
        "name": "Burrito",
        "image":"burrito.png", //could not use the above defined constants since this text will be parsed as the image URL
        "price": 9.00
    },
    {
        "id": 2,
        "name": "Bowl",
        "image":"burrito_bowl.png",
        "price": 10.00
    },
    {
        "id": 3,
        "name": "Tacos",
        "image":"three_tacos.png",
        "price": 8.00
    },
    {
        "id": 4,
        "name": "Chips and Sides",
        "image":"chips_sides.png",
        "price": 6.00
    },
    {
        "id": 5,
        "name": "Quesadilla",
        "image":"quesadilla.png",
        "price": 7.00
    },
    {
        "id": 6,
        "name": "Salad",
        "image":"salad.png",
        "price": 9.00
    },
    {
        "id": 7,
        "name": "Lifestyle Bowl",
        "image":"lifestyle_bowl.png",
        "price": 10.00
    },
    {
        "id": 8,
        "name": "Kid's Meal",
        "image":"kidsmeal.png",
        "price": 7.00
    },
    {
        "id": 9,
        "name": "House Special Drink",
        "image":"drinks.png",
        "price": 3.00
    }
]


let listCards = [];

//initApp() will create new divs for every object in the item list
const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");  //.createElement a js function that can create a div or something else for me
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "img/${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">$${value.price}.00</div>
            <button onclick = "addToCart(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()

const addToCart = key => { //key is the parameter to the "arrow function" - a shothand form for a js function
    if(listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }

    reloadCart()
}

const reloadCart = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice= 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity;

        if(value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src = "img/${value.image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">$${value.price}.00</div>

                <div>
                    <button style = "background-color:#8d2b0d;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#8d2b0d;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv)
        }

        total.innerText = "$" + totalPrice + ".00";
        quantity.innerText = count;
        
    })
}


const changeQuantity = (key, quantity) => {
    if(quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCart()
}
