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

      itemStr += `<li> ${name} $${price} x ${qty} = ${qty * price} </li>`
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
