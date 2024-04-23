var shoppingCart = (function () {
  cart = [];
  function Item(name, price, count, src) {
    this.src = src;
    this.name = name;
    this.price = price;
    this.count = count;
  }

  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  var obj = {};

  obj.addItemToCart = function (name, price, count, src) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count, src);
    cart.push(item);
    saveCart();
  };

  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
      totalCart += totalCart * 0.05;
    }
    return Number(totalCart.toFixed(2));
  };

  obj.subTotalCart = function () {
    var subTotalCart = 0;
    for (var item in cart) {
      subTotalCart += cart[item].price * cart[item].count;
    }
    return Number(subTotalCart.toFixed(2));
  };

  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };
  return obj;
})();

$(document).on("click", ".add-to-cart", function (event) {
  event.preventDefault();
  var src = $(this).data("src");
  var price = Number($(this).data("price"));
  var title = $(this).data("title");
  shoppingCart.addItemToCart(title, price, 1, src);
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  const row = document.createElement("div");
  row.className = "row mr-0";

  if (document.getElementsByClassName("ord-div")[0] !== undefined)
    document.getElementsByClassName("ord-div")[0].remove();

  const recDiv = document.createElement("div");
  recDiv.className = "ord-div";
  document.querySelector(".right-side-bar-cart").appendChild(recDiv);

  cartArray.forEach((cardData) => {
    const col = document.createElement("div");
    col.className = "col-sm-12 pr-0 noMar";

    const card = document.createElement("div");
    card.className = "card cardSmall";

    const cardRow = document.createElement("div");
    cardRow.className = "row g-0";

    const cardCol4Img = document.createElement("div");
    cardCol4Img.className = "col-sm-4 g-0";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top img-fluid rounded small-img";
    cardImg.src = cardData.src;
    cardImg.alt = "Card Image";

    const cardCol4BodyPrice = document.createElement("div");
    cardCol4BodyPrice.className = "col-sm-3 g-0 centerDiv";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("p");
    cardTitle.className = "card-title";
    cardTitle.textContent = cardData.name;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card-price";
    cardPrice.textContent = "AED " + cardData.price;

    const cardCol4BodyATC = document.createElement("div");
    cardCol4BodyATC.className = "col-sm-5 g-0";

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions";

    const cardActionsDiv = document.createElement("div");
    cardActionsDiv.className = "input-group width80";

    const cardActionsMinusBtn = document.createElement("button");
    cardActionsMinusBtn.className = "minus-item input-group-addon btn btn-dark";
    cardActionsMinusBtn.setAttribute("data-name", cardData.name);
    cardActionsMinusBtn.textContent = "-";

    const cardActionsMinusInp = document.createElement("input");
    cardActionsMinusInp.className = "item-count form-control";
    cardActionsMinusInp.setAttribute("type", "text");
    cardActionsMinusInp.setAttribute("data-name", cardData.name);
    cardActionsMinusInp.value = cardData.count;

    const cardActionsPlusBtn = document.createElement("button");
    cardActionsPlusBtn.className = "plus-item input-group-addon btn btn-dark";
    cardActionsPlusBtn.setAttribute("data-name", cardData.name);
    cardActionsPlusBtn.textContent = "+";

    const cardActionsDeleteBtn = document.createElement("button");
    cardActionsDeleteBtn.className = "delete-item btn btn-dark btnDel";
    cardActionsDeleteBtn.setAttribute("data-name", cardData.name);
    cardActionsDeleteBtn.innerHTML =
      '<i class="fa fa-trash" aria-hidden="true"></i>';

    cardCol4BodyPrice.appendChild(cardTitle);
    cardCol4BodyPrice.appendChild(cardPrice);

    cardCol4BodyATC.appendChild(cardActions);
    cardActions.appendChild(cardActionsDiv);
    cardActionsDiv.appendChild(cardActionsMinusBtn);
    cardActionsDiv.appendChild(cardActionsMinusInp);
    cardActionsDiv.appendChild(cardActionsPlusBtn);
    cardActions.appendChild(cardActionsDeleteBtn);

    card.appendChild(cardRow);
    cardRow.appendChild(cardCol4Img);
    cardRow.appendChild(cardCol4BodyPrice);
    cardRow.appendChild(cardCol4BodyATC);

    cardCol4Img.appendChild(cardImg);
    cardCol4BodyPrice.appendChild(cardBody);
    cardCol4BodyATC.appendChild(cardBody);

    col.appendChild(card);
    row.appendChild(col);
  });

  document.querySelector(".ord-div").appendChild(row);
  $(".sub-total-cart").html(shoppingCart.subTotalCart());
  $(".total-cart").html(shoppingCart.totalCart());
}

$(document).on("click", ".delete-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// -1
$(document).on("click", ".minus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCart(name);
  displayCart();
});
// +1
$(document).on("click", ".plus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.addItemToCart(name);
  displayCart();
});

// Item count input
$(document).on("change", ".item-count", function (event) {
  var name = $(this).data("name");
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();
