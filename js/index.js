var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDisc = document.getElementById("productDisc");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");

// Make the Array which contain the data
var productContainer = [];
if (localStorage.getItem("products") != null) {
  localStorageGet();
}
function getProduct() {
  if (
    productName.value &&
    productPrice.value &&
    productCategory.value &&
    productDisc.value
  ) {
    var product = {
      name1: productName.value,
      price: Number(productPrice.value),
      category: productCategory.value,
      desc: productDisc.value,
    };

    // Push data to the array
    productContainer.push(product);
    // Store data on Local storage
    localStorageSave();
    // To clear form after click submit button
    clearform();
  } else {
    clearform();
  }
}

// Display data on the table

function displayProduct(arr) {
  var tableRowData = ``;
  for (var i = 0; i < arr.length; i++) {
    tableRowData += `
    <tr>
    <td>${arr[i].name1}</td>
    <td>${arr[i].price}</td>
    <td>${arr[i].category}</td>
    <td>${arr[i].desc}</td>
    <td>
    <button class="btn btn-md btn-outline-info" onclick="updateItem(${i})">update</button>
    </td>
    <td>
    <button class="btn btn-md btn-outline-danger" onclick="deleteProduct(${i});">delete</button>
    </td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = tableRowData;
}

// Clear Form
function clearform() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDisc.value = "";
}

// Click delete button and delete that row
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorageSave();
}

// Search An Item

function searchItem(item) {
  var productsArray = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name1
        .toLowerCase()
        .includes(item.toLocaleLowerCase()) == true
    ) {
      productsArray.push(productContainer[i]);
      displayProduct(productsArray);
      console.log(item);
    }
  }
}

// Update Item

var indexUbdate = 0;
function updateItem(i) {
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  productName.value = productContainer[i].name1;
  productPrice.value = productContainer[i].price;
  productCategory.value = productContainer[i].category;
  productDisc.value = productContainer[i].desc;
  indexUbdate = i;
}

// Reblace The Update Element with The Updated one
function replaceElementArray() {
  var updatedObj = {
    name1: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDisc.value,
  };
  productContainer.splice(indexUbdate, 1, updatedObj);

  displayProduct(productContainer);
  localStorageSave();
}

// Get data from Local storage and render it

function localStorageGet() {
  productContainer = JSON.parse(
    localStorage.getItem("products", productContainer)
  );
  displayProduct(productContainer);
}

// Send data to Local storage

function localStorageSave() {
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProduct(productContainer);
}
