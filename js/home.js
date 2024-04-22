// Array of card data objects
const cardDataList = [
  {
    imageUrl: "../images/tables/table1.jpg",
    title: "Table 1",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table2.jpg",
    title: "Table 2",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table3.jpg",
    title: "Table 3",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table4.jpg",
    title: "Table 4",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",

    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table5.jpg",
    title: "Table 5",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table6.jpg",
    title: "Table 6",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table7.jpg",
    title: "Table 7",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table2.jpg",
    title: "Table 8",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table1.jpg",
    title: "Table 9",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "tables",
  },
  {
    imageUrl: "../images/tables/table1.jpg",
    title: "Chair 1",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "chairs",
  },
  {
    imageUrl: "../images/tables/table2.jpg",
    title: "Chair 2",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "chairs",
  },
  {
    imageUrl: "../images/tables/table3.jpg",
    title: "Chair 3",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "chairs",
  },
  {
    imageUrl: "../images/tables/table7.jpg",
    title: "Chair 4",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "chairs",
  },
  {
    imageUrl: "../images/tables/table2.jpg",
    title: "Chair 5",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "chairs",
  },
  {
    imageUrl: "../images/tables/table1.jpg",
    title: "Chair 6",
    description:
      "aesthetic conference chair,elegant plywood curvature shell design is",
    price: "22.47",
    currency: "AED",
    tags: "chairs",
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.onload = function () {
  var dataSetRandom = shuffleArray(cardDataList);
  dataSetRandom = dataSetRandom.slice(0, 9);
  renderMainItems(dataSetRandom);
  recommendedItems(dataSetRandom);
};

function renderMainItems(dataSetRandom) {
  // Create a row for the cards
  const row = document.createElement("div");
  row.className = "row mr-0";

  // to remove old items from recomendation list
  if (document.getElementsByClassName("main")[0] !== undefined)
    document.getElementsByClassName("main")[0].remove();

  const mainDiv = document.createElement("div");
  mainDiv.className = "main";
  document.querySelector(".render-main-content").appendChild(mainDiv);

  // Iterate over the array and create cards
  dataSetRandom.forEach((cardData) => {
    const col = document.createElement("div");
    col.className = "col-sm-4 mb-3 pr-0"; // Added margin bottom to space out the columns

    const card = document.createElement("div");
    card.className = "card cardLarge";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top img-fluid rounded";
    cardImg.src = cardData.imageUrl;
    cardImg.alt = "Card Image";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = cardData.title;

    const cardText = document.createElement("div");
    cardText.className = "card-text";
    cardText.textContent = cardData.description;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card-price";
    cardPrice.textContent = cardData.currency + " " + cardData.price;

    const cardTags = document.createElement("input");
    cardTags.setAttribute("type", "hidden");
    cardTags.className = "card-tag";
    cardTags.textContent = cardData.tags;

    const cardButton = document.createElement("a");
    cardButton.className = "btn btn-dark width-100";
    cardButton.href = "#";
    cardButton.textContent = "Add to Cart";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardTags);
    cardBody.appendChild(cardButton);

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    col.appendChild(card);
    row.appendChild(col);
  });

  // Append the row to the sidebar
  document.querySelector(".main").appendChild(row);
}

function showSearchItem() {
  var searchItem = document.getElementById("searchInput");
  var filteredResults = cardDataList.filter((data) => {
    if (
      data.title
        .toLocaleLowerCase()
        .includes(searchItem.value.toLocaleLowerCase())
    ) {
      return data;
    }
  });
  renderMainItems(filteredResults);
  recommendedItems(filteredResults);
}

function recommendedItems(filteredItems) {
  var filteredTags = filteredItems.map((data) => {
    return data.tags.toLocaleLowerCase();
  });
  var unique = filteredTags.filter(
    (item, index) => filteredTags.indexOf(item) === index
  );

  var recommendedResults = cardDataList.filter((data) => {
    if (data.tags.toLocaleLowerCase().includes(unique[0].toLocaleLowerCase())) {
      return data;
    }
  });

  // var recommendedResults = cardDataList.filter(
  //   (o1) => !filteredTags.some((o2) => o1.tags.includes(o2.tags))
  // );

  // Create a row for the cards
  const row = document.createElement("div");
  row.className = "row mr-0";

  // to remove old items from recomendation list
  if (document.getElementsByClassName("rec-div")[0] !== undefined)
    document.getElementsByClassName("rec-div")[0].remove();

  const recDiv = document.createElement("div");
  recDiv.className = "rec-div";
  document.querySelector(".right-side-bar-main").appendChild(recDiv);

  var counter = 1;
  // Iterate over the array and create cards
  recommendedResults.forEach((cardData) => {
    if (counter <= 4) {
      const col = document.createElement("div");
      col.className = "col-sm-12 pr-0 noMar"; // Added margin bottom to space out the columns

      const card = document.createElement("div");
      card.className = "card cardSmall";

      const cardRow = document.createElement("div");
      cardRow.className = "row g-0";

      const cardCol4Img = document.createElement("div");
      cardCol4Img.className = "col-sm-4 g-0";

      const cardImg = document.createElement("img");
      cardImg.className = "card-img-top img-fluid rounded";
      cardImg.src = cardData.imageUrl;
      cardImg.alt = "Card Image";

      const cardCol4BodyPrice = document.createElement("div");
      cardCol4BodyPrice.className = "col-sm-4 g-0 centerDiv";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("p");
      cardTitle.className = "card-title";
      cardTitle.textContent = cardData.title;

      const cardPrice = document.createElement("p");
      cardPrice.className = "card-price";
      cardPrice.textContent = cardData.currency + " " + cardData.price;

      const cardCol4BodyATC = document.createElement("div");
      cardCol4BodyATC.className = "col-sm-4 g-0";

      const cardButton = document.createElement("a");
      cardButton.className = "btn btn-dark card-atc";
      cardButton.href = "#";
      cardButton.textContent = "Add to Cart";

      cardCol4BodyPrice.appendChild(cardTitle);
      cardCol4BodyPrice.appendChild(cardPrice);
      cardCol4BodyATC.appendChild(cardButton);

      card.appendChild(cardRow);
      cardRow.appendChild(cardCol4Img);
      cardRow.appendChild(cardCol4BodyPrice);
      cardRow.appendChild(cardCol4BodyATC);

      cardCol4Img.appendChild(cardImg);
      cardCol4BodyPrice.appendChild(cardBody);
      cardCol4BodyATC.appendChild(cardBody);

      col.appendChild(card);
      row.appendChild(col);
    }
    counter = counter + 1;
  });
  // Append the row to the sidebar
  document.querySelector(".rec-div").appendChild(row);
}
