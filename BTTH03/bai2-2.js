const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const delivery = document.getElementById("delivery");
const address = document.getElementById("address");
const note = document.getElementById("note");

const noteCount = document.getElementById("noteCount");
const totalPrice = document.getElementById("totalPrice");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");

const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

const successMsg = document.getElementById("successMsg");


const prices = {
  "Áo":150000,
  "Quần":200000,
  "Giày":300000
};



function showError(id,msg){
  document.getElementById(id+"Error").textContent = msg;
}

function clearError(id){
  document.getElementById(id+"Error").textContent = "";
}



function validateProduct(){

  if(product.value === ""){
    showError("product","Phải chọn sản phẩm");
    return false;
  }

  clearError("product");
  return true;

}



function validateQuantity(){

  let q = Number(quantity.value);

  if(!Number.isInteger(q) || q < 1 || q > 99){
    showError("quantity","Số lượng 1-99");
    return false;
  }

  clearError("quantity");
  return true;

}



function validateDelivery(){

  let date = new Date(delivery.value);
  let today = new Date();

  let maxDate = new Date();
  maxDate.setDate(today.getDate()+30);

  if(delivery.value === ""){
    showError("delivery","Phải chọn ngày");
    return false;
  }

  if(date < today){
    showError("delivery","Không được là ngày quá khứ");
    return false;
  }

  if(date > maxDate){
    showError("delivery","Không quá 30 ngày");
    return false;
  }

  clearError("delivery");
  return true;

}



function validateAddress(){

  if(address.value.trim().length < 10){
    showError("address","Địa chỉ ≥10 ký tự");
    return false;
  }

  clearError("address");
  return true;

}



function validateNote(){

  if(note.value.length > 200){
    showError("note","Tối đa 200 ký tự");
    return false;
  }

  clearError("note");
  return true;

}



function validatePayment(){

  let p = document.querySelector('input[name="payment"]:checked');

  if(!p){
    showError("payment","Phải chọn phương thức");
    return false;
  }

  clearError("payment");
  return true;

}



function updateTotal(){

  let price = prices[product.value] || 0;
  let q = Number(quantity.value) || 0;

  let total = price*q;

  totalPrice.textContent = total.toLocaleString("vi-VN");

}



function updateNoteCount(){

  let len = note.value.length;

  noteCount.textContent = len + "/200";

  if(len > 200){
    noteCount.style.color = "red";
  }else{
    noteCount.style.color = "black";
  }

}



form.addEventListener("submit",(e)=>{

  e.preventDefault();

  let valid =
  validateProduct() &
  validateQuantity() &
  validateDelivery() &
  validateAddress() &
  validateNote() &
  validatePayment();

  if(valid){

    let total = (prices[product.value]*quantity.value)
      .toLocaleString("vi-VN");

    summary.innerHTML =
    `
    Sản phẩm: ${product.value} <br>
    Số lượng: ${quantity.value} <br>
    Tổng tiền: ${total} VND <br>
    Ngày giao: ${delivery.value}
    `;

    confirmBox.style.display = "block";

  }

});



confirmBtn.addEventListener("click",()=>{

  confirmBox.style.display = "none";
  form.style.display = "none";

  successMsg.textContent = "Đặt hàng thành công 🎉";

});



cancelBtn.addEventListener("click",()=>{

  confirmBox.style.display = "none";

});



product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);

note.addEventListener("input",updateNoteCount);



product.addEventListener("blur",validateProduct);
quantity.addEventListener("blur",validateQuantity);
delivery.addEventListener("blur",validateDelivery);
address.addEventListener("blur",validateAddress);
note.addEventListener("blur",validateNote);