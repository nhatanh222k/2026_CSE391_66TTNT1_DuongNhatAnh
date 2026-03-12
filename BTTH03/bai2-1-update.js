const form = document.getElementById("registerForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const terms = document.getElementById("terms");
const nameCount = document.getElementById("nameCount");
const strengthFill = document.getElementById("strengthFill");
const togglePassword = document.getElementById("togglePassword");
const successMsg = document.getElementById("successMsg");

function showError(id,msg){
  document.getElementById(id+"Error").textContent = msg;
}

function clearError(id){
  document.getElementById(id+"Error").textContent="";
}

function validateFullname(){

  let v = fullname.value.trim();

  if(v.length < 3){
    showError("fullname","≥3 ký tự");
    return false;
  }

  if(!/^[a-zA-ZÀ-ỹ\s]+$/.test(v)){
    showError("fullname","Chỉ chứa chữ");
    return false;
  }

  clearError("fullname");
  return true;

}

function validateEmail(){

  let v = email.value.trim();

  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){
    showError("email","Email không hợp lệ");
    return false;
  }

  clearError("email");
  return true;

}

function validatePhone(){

  let v = phone.value.trim();

  if(!/^0\d{9}$/.test(v)){
    showError("phone","SĐT phải 10 số");
    return false;
  }

  clearError("phone");
  return true;

}

function validatePassword(){

  let v = password.value;

  if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)){
    showError("password","≥8 ký tự có hoa, thường, số");
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

  let g = document.querySelector('input[name="gender"]:checked');

  if(!g){
    showError("gender","Chọn giới tính");
    return false;
  }

  clearError("gender");
  return true;

}

function validateTerms(){

  if(!terms.checked){
    showError("terms","Phải đồng ý điều khoản");
    return false;
  }

  clearError("terms");
  return true;

}

function updateNameCount(){

  nameCount.textContent = fullname.value.length + "/50";

}

function checkPasswordStrength(){

  let v = password.value;

  let score = 0;

  if(v.length >= 8) score++;
  if(/[A-Z]/.test(v)) score++;
  if(/[a-z]/.test(v)) score++;
  if(/\d/.test(v)) score++;
  if(/[^A-Za-z0-9]/.test(v)) score++;

  if(score <= 2){
    strengthFill.style.width="33%";
    strengthFill.style.background="red";
  }
  else if(score <=4){
    strengthFill.style.width="66%";
    strengthFill.style.background="orange";
  }
  else{
    strengthFill.style.width="100%";
    strengthFill.style.background="green";
  }

}

togglePassword.addEventListener("click",()=>{

  if(password.type === "password"){
    password.type = "text";
  }else{
    password.type = "password";
  }

});

fullname.addEventListener("input",updateNameCount);

password.addEventListener("input",checkPasswordStrength);

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
    form.style.display="none";
    successMsg.textContent =
    "Đăng ký thành công 🎉 Xin chào " + fullname.value;
  }

});