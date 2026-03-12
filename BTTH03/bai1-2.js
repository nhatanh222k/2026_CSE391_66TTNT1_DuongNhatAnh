const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

const searchInput = document.getElementById("search");
const rankFilter = document.getElementById("rankFilter");
const scoreHeader = document.getElementById("scoreHeader");

let students = [];
let filteredStudents = [];

let sortOrder = null;



function getRank(score){

  if(score >= 8.5) return "Giỏi";
  if(score >= 7) return "Khá";
  if(score >= 5) return "Trung bình";
  return "Yếu";

}



function applyFilters(){

  let keyword = searchInput.value.toLowerCase();
  let rank = rankFilter.value;

  filteredStudents = students.filter(sv => {

    let matchName = sv.name.toLowerCase().includes(keyword);

    let matchRank = true;

    if(rank !== "all"){
      matchRank = getRank(sv.score) === rank;
    }

    return matchName && matchRank;

  });

  if(sortOrder === "asc"){
    filteredStudents.sort((a,b)=>a.score-b.score);
  }

  if(sortOrder === "desc"){
    filteredStudents.sort((a,b)=>b.score-a.score);
  }

  renderTable();

}



function renderTable(){

  tableBody.innerHTML = "";

  if(filteredStudents.length === 0){

    tableBody.innerHTML = `<tr>
    <td colspan="5">Không có kết quả</td>
    </tr>`;

    updateStats();
    return;
  }

  filteredStudents.forEach((sv,index)=>{

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
        <button data-index="${students.indexOf(sv)}" class="deleteBtn">
        Xóa
        </button>
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

  stats.textContent =
  `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;

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

  nameInput.value="";
  scoreInput.value="";
  nameInput.focus();

  applyFilters();

}



addBtn.addEventListener("click", addStudent);



scoreInput.addEventListener("keypress",(e)=>{

  if(e.key === "Enter"){
    addStudent();
  }

});



searchInput.addEventListener("input", applyFilters);



rankFilter.addEventListener("change", applyFilters);



scoreHeader.addEventListener("click",()=>{

  if(sortOrder === null){
    sortOrder = "asc";
  }
  else if(sortOrder === "asc"){
    sortOrder = "desc";
  }
  else{
    sortOrder = "asc";
  }

  scoreHeader.textContent = "Điểm";

  if(sortOrder === "asc"){
    scoreHeader.textContent += " ▲";
  }
  else{
    scoreHeader.textContent += " ▼";
  }

  applyFilters();

});



tableBody.addEventListener("click",(e)=>{

  if(e.target.classList.contains("deleteBtn")){

    const index = e.target.getAttribute("data-index");

    students.splice(index,1);

    applyFilters();

  }

});



applyFilters();