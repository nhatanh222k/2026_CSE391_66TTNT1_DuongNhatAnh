const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

let students = [];

function getRank(score){

  if(score >= 8.5) return "Giỏi";
  if(score >= 7) return "Khá";
  if(score >= 5) return "Trung bình";
  return "Yếu";

}

function renderTable(){

  tableBody.innerHTML = "";

  students.forEach((sv,index)=>{

    const tr = document.createElement("tr");

    if(sv.score < 5){
      tr.classList.add("weak");
    }

    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${sv.name}</td>
      <td>${sv.score}</td>
      <td>${getRank(sv.score)}</td>
      <td>
        <button data-index="${index}" class="deleteBtn">Xóa</button>
      </td>
    `;

    tableBody.appendChild(tr);

  });

  updateStats();
}

function updateStats(){

  let total = students.length;
  let sum = 0;

  students.forEach(s => sum += s.score);

  let avg = total ? (sum/total).toFixed(2) : 0;

  stats.textContent = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;

}

function addStudent(){

  let name = nameInput.value.trim();
  let score = parseFloat(scoreInput.value);

  if(name === "" || isNaN(score) || score < 0 || score > 10){
    alert("Dữ liệu không hợp lệ");
    return;
  }

  students.push({
    name:name,
    score:score
  });

  renderTable();

  nameInput.value="";
  scoreInput.value="";
  nameInput.focus();

}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress",(e)=>{

  if(e.key === "Enter"){
    addStudent();
  }

});

tableBody.addEventListener("click",(e)=>{

  if(e.target.classList.contains("deleteBtn")){

    const index = e.target.getAttribute("data-index");

    students.splice(index,1);

    renderTable();

  }

});