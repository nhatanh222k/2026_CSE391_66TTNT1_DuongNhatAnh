const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const terms = document.getElementById("terms");
const successMsg = document.getElementById("successMsg");

function showError(id,message){
  document.getElementById(id+"Error").textContent = message;
}

function clearError(id){
  document.getElementById(id+"Error").textContent = "";
}

function validateFullname(){

  let value = fullname.value.trim();

  if(value === ""){
    showError("fullname","Không được để trống");
    return false;
  }

  if(value.length < 3){
    showError("fullname","Phải ≥ 3 ký tự");
    return false;
  }

  if(!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)){
    showError("fullname","Chỉ chứa chữ và khoảng trắng");
    return false;
  }

  clearError("fullname");
  return true;

}

function validateEmail(){

  let value = email.value.trim();

  if(value === ""){
    showError("email","Không được để trống");
    return false;
  }

  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
    showError("email","Email không hợp lệ");
    return false;
  }

  clearError("email");
  return true;

}

function validatePhone(){

  let value = phone.value.trim();

  if(value === ""){
    showError("phone","Không được để trống");
    return false;
  }

  if(!/^0\d{9}$/.test(value)){
    showError("phone","SĐT phải 10 số và bắt đầu bằng 0");
    return false;
  }

  clearError("phone");
  return true;

}

function validatePassword(){

  let value = password.value;

  if(value === ""){
    showError("password","Không được để trống");
    return false;
  }

  if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)){
    showError("password","≥8 ký tự, có hoa, thường, số");
    return false;
  }

  clearError("password");
  return true;

}

function validateConfirm(){

  if(confirm.value !== password.value){
    showError("confirm","Mật khẩu không khớp");
    return false;
  }

  clearError("confirm");
  return true;

}

function validateGender(){

  let gender = document.querySelector('input[name="gender"]:checked');

  if(!gender){
    showError("gender","Phải chọn giới tính");
    return false;
  }

  clearError("gender");
  return true;

}

function validateTerms(){

  if(!terms.checked){
    showError("terms","Bạn phải đồng ý điều khoản");
    return false;
  }

  clearError("terms");
  return true;

}

form.addEventListener("submit",(e)=>{

  e.preventDefault();

  let valid =
  validateFullname() &
  validateEmail() &
  validatePhone() &
  validatePassword() &
  validateConfirm() &
  validateGender() &
  validateTerms();

  if(valid){

    form.style.display = "none";

    successMsg.textContent =
    "Đăng ký thành công! 🎉 Xin chào " + fullname.value;

  }

});

fullname.addEventListener("blur",validateFullname);
email.addEventListener("blur",validateEmail);
phone.addEventListener("blur",validatePhone);
password.addEventListener("blur",validatePassword);
confirm.addEventListener("blur",validateConfirm);

fullname.addEventListener("input",()=>clearError("fullname"));
email.addEventListener("input",()=>clearError("email"));
phone.addEventListener("input",()=>clearError("phone"));
password.addEventListener("input",()=>clearError("password"));
confirm.addEventListener("input",()=>clearError("confirm"));