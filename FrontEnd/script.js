var form = document.getElementById("bookingForm");
var ul = document.getElementById("ullist");


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
        "http://localhost:3000/api/users",
        obj
      );

      showOutput(obj, response.data.id);
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
      "http://localhost:3000/api/users"
    );

    for (let i = 0; i < response.data.length; i++) {
      showOutput(response.data[i], response.data[i].id);
    }
  } catch (error) {
    console.error(error);
  }
});


function showOutput(obj, obj_id) {

  var list = document.createElement("li");

  list.appendChild(document.createTextNode(obj.selling + " - " + obj.product));

  var deletebtn = document.createElement("button");
  deletebtn.className = "delete";
  deletebtn.appendChild(document.createTextNode("Delete"));
  list.appendChild(deletebtn);

  var editbtn = document.createElement("button");
  editbtn.className = "edit";
  editbtn.appendChild(document.createTextNode("Edit"));
  list.appendChild(editbtn);


  list.setAttribute('data-id', obj_id);


  ul.appendChild(list);

}



ul.addEventListener('click', removeitem = function (e) {

  if (e.target.classList.contains('delete')) {
    console.log(e.target);
    var li = e.target.parentNode;
    console.log("li=", li);
    var id = li.getAttribute('data-id');
    console.log("id=", id);



    async function deleteData() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/users/${id}`
        );

        //console.log(response.data);
        ul.removeChild(li);
      } catch (error) {
        console.log(error);
      }
    }

    deleteData();
  }

  if (e.target.classList.contains('edit')) {
    console.log(e.target);
    var li = e.target.parentNode;
    console.log("li=",li.textContent);
    let arr=li.textContent.split('-');
    console.log((arr));


    var id = li.getAttribute('data-id');
    console.log("id=", id);

    document.getElementById("selling").value=arr[0];
    document.getElementById("product").value=arr[1];

    async function editData() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/users/${id}`
        );

        //console.log(response.data);
        ul.removeChild(li);
      } catch (error) {
        console.log(error);
      }
    }

    editData();
  }

});