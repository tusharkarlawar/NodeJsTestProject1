var form = document.getElementById("bookingForm"); 
var ul = document.getElementById("ullist"); 
var totalPriceSpan = document.getElementById('totalPrice'); 
var totalPrice =0; 
form.addEventListener("submit", adding = function (e) { 
  e.preventDefault(); 
  var selling = document.getElementById("selling").value; 
  var product = document.getElementById("product").value; 
 
 
  let obj = { 
    selling: selling, 
    product: product, 
     
  }; 
 
  //console.log(obj) 
 
  async function postData() { 
    try { 
      const response = await axios.post( 
        "http://localhost:3000/api/mydata", 
        obj 
      ); 
 
      showOutput(obj, response.data.id); 
      //updateProduct(response.data.selling); 
      updateProduct(obj.selling); 
 
      document.getElementById('selling price').value = ''; 
      document.getElementById('product').value = ''; 
      console.log("response.data=", response.data); 
    } catch (error) { 
      console.log(error); 
    } 
  } 
 
  postData(); 
 
}); 
 
 
document.addEventListener("DOMContentLoaded", async () => { 
  try { 
    const response = await axios.get( 
      "http://localhost:3000/api/mydata" 
    ); 
 
    for (let i = 0; i < response.data.length; i++) { 
      showOutput(response.data[i], response.data[i].id); 
      updateProduct(response.data[i].selling); 
    } 
  } catch (error) { 
    console.error(error); 
  } 
}); 
 
 
function showOutput(obj, obj_id) { 
  var list = document.createElement("li"); 
 
  var sellingValueSpan = document.createElement("span"); // Create a span for selling value 
  sellingValueSpan.className = "selling-value"; 
  sellingValueSpan.textContent = obj.selling; // Set the selling value 
  list.appendChild(sellingValueSpan); 
 
  var productInfo = document.createElement("span"); 
  productInfo.textContent = " - " + obj.product; 
  list.appendChild(productInfo); 
 
  var deletebtn = document.createElement("button"); 
  deletebtn.className = "delete"; 
  deletebtn.appendChild(document.createTextNode("Delete")); 
  list.appendChild(deletebtn); 
 
  list.setAttribute('data-id', obj_id); 
 
  ul.appendChild(list); 
} 
 
 
 
ul.addEventListener('click', removeitem = function (e) { 
  if (e.target.classList.contains('delete')) { 
    var li = e.target.parentNode; 
    var id = li.getAttribute('data-id'); 
     
    // Get the selling value of the item being deleted 
    var sellingValue = li.querySelector(".selling-value").textContent; 
 
    async function deleteData() { 
      try { 
        const response = await axios.delete( 
          `http://localhost:3000/api/mydata/${id}`
        ); 
 
        ul.removeChild(li); 
        updateProduct(sellingValue, false); // Update the totalPrice 
 
      } catch (error) { 
        console.log(error); 
      } 
    } 
 
    deleteData(); 
  } 
}); 
function updateProduct(val, add = true) { 
  val = parseInt(val); 
 
  if (add) { 
    totalPrice += val; 
  } else { 
    totalPrice -= val; 
  } 
  totalPriceSpan.textContent = totalPrice; 
}