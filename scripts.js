const itemsContainer = document.getElementById('items')
import data from './data.js'
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal= document.getElementById('cart-total')

itemList.innerHTML = '<li> Hello World</li>'


for (let i = 0; i < data.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item'
    const img = document.createElement('img');
    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)
    itemsContainer.appendChild(newDiv)
    const desc = document.createElement('P')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)
    itemsContainer.appendChild(newDiv)
    const price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)
    const button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
}
    const all_items_button = Array.from(document.querySelectorAll("button"))
    all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))

itemList.onclick = function(e) {
//console.log("Clicked List!!")
//console.log(e.target)
if(e.target && e.target.classList.contains('remove')){

  const name = e.target.dataset.name
  removeItem(name)
} else if (e.target && e.target.classList.contains('remove-one')){
  const name = e.target.dataset.name
  removeItem(name, 1)
}else if (e.target && e.target.classList.contains('add-one')){
  const name = e.target.dataset.name
  addItem(name, 1)
}
showItems()
}
const cart = []

function addItem(name, price) {
  for (let i = 0; i < cart.length; i += 1){
    if (cart[i].name === name) {
      cart[i].qty += 1
      return

    }
  }

  const item = { name, price, qty: 1 }
  cart.push(item)
}

function showItems() {
    const qty = getQty()
    cartQty.innerHTML = `You have ${qty} items in your cart`

  let itemStr = ''
  for (let i = 0; i < cart.length; i += 1){
      // console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)


      const {name, price, qty} = cart[i]

      itemStr += `<li>
      ${name} $${price} x ${qty} = ${qty * price}
      <button class="remove" data-name="${name}">Clear</button>
      <button class="add-one" data-name="${name}"> + </button>
      <button class="remove-one" data-name="${name}"> - </button>
      </li>`
  }
  itemList.innerHTML = itemStr


  cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

function getQty () {
  let qty = 0
  for (let i = 0; i < cart.length; i += 1) {
    qty += cart[i].qty
  }
  return qty
}

function getTotal() {
  let total = 0
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty
  }
  return total.toFixed(2)
}

function removeItem(name, qty = 0){
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      if(qty > 0) {
        cart [i].qty -= qty
      }

      if (cart[i].qty < 1 || qty === 0) {
        cart.splice(i, 1)
      }
      showItems()

      return
    }
  }
}

addItem('Poutine', 10.99)
addItem('Bacon Poutine', 12.99)
addItem('Poutine', 10.99)
addItem('Poutine', 10.99)
addItem('Poutine', 10.99)
removeItem('Poutine', 1)



showItems ()
