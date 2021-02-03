// Setup Variables For Display Data

let companyDom = document.querySelector(".company");
let company = data;

// Display Data

let drawcompanyUI;
(drawcompanyUI = function (company = []) {
    let UI = company.map((item) => {
        return `
        <div class="company-item">
            <img src="${item.imageUrl}" alt="" class="company-item-img">
            <div class="company-item-info">
                <h2 class="company-item-title">${item.title}</h2>
                <p class="company-item-desc">${item.desc}</p>
                <span class="company-item-job d-block mb-2">Required job: ${item.job}</span>
                <span class="company-item-work d-block mb-2">Work Time: ${item.workTime}</span>
                <span class="company-item-empNum d-block mb-2">Employees Number: ${item.empNum}</span>
                <button class="btn btn-dark" onclick="apply(${item.id})">Apply For Job</button>
            </div><!-- ./company-item-info -->
        </div><!-- ./company-item -->
        `;
    });
    companyDom.innerHTML = UI.join("");
})(company);

/////////////////////////////////////////

// Search


let searchBtn = document.querySelector("#search");

searchBtn.addEventListener("keyup", search);


function search(){
    let newCompany =  company;
    let title = searchBtn.value.trim();
    let selected =  newCompany.filter(item => {
        // item.job= item.job.map(function (name) {
        //     return name.toLowerCase();
        // });
        // item.job= item.job.filter(function (i) {
        //     return i.indexOf(title.toLowerCase()) !==-1;
        // });
        return item.title.toLowerCase().indexOf(title.toLowerCase()) !==-1;
    });
    drawcompanyUI(selected);
}

////////////////////////////////////////////

// Filter

let filterBtn = document.querySelector("#filterBtn");

filterBtn.addEventListener('click', filtercompany);

function filtercompany() {
    let filterOption = document.querySelector("#filterInput").value.trim();
    if(filterOption === ""){
        drawcompanyUI(company);
    }else {
        let selected = company.filter(item => {
            return item.workTime.toLowerCase().indexOf(filterOption.toLowerCase()) !==-1;
        });
        drawcompanyUI(selected);
    }
}

//////////////////////////////////////

// Setup Variables

var overlay = document.getElementById("overlay");
let form = document.querySelector(".applyForm");
let loadingDom = document.getElementById("loading");
let nameInput = document.querySelector('#nameInput');
let emailInput = document.querySelector('#emailInput');
let dateInput = document.querySelector('#dateInput');
let applyForm = document.querySelector('.applyForm');
let formTitle = document.querySelector('.form-title');
let thanksMassage = document.querySelector('.thanks');
var companyId;



// To Get Company Id And To Display The Overlay


function apply(id) {
    companyId = id;
    console.log(companyId);
    overlay.style.display= "block";
    openingFormLoading();
};



// To Make Loading Before The Form Opening

function openingFormLoading(){
    loadingDom.style.display = 'block';
    setTimeout(function(){
        loadingDom.style.display = 'none';
        form.style.display = 'block';
    }, 3000); 
    let title = company.find(item => item.id == companyId);
formTitle.innerHTML = `The Work Application For ${title.title}`;
}

applyForm.addEventListener('submit', submitTheApplication);

// To Get The Employee Data And Make The Request

function submitTheApplication(e){
    e.preventDefault();
    if (nameInput.value==""||emailInput.value==""||dateInput.value=="") {
        alert("Please Enter Right Data..");
    }else{
        let emp = {
            name: nameInput.value,
            email: emailInput.value,
            date: dateInput.value,
        }
        console.log(emp);
        form.style.display = 'none';
        closeingFormLoading();
        nameInput.value= ""
        emailInput.value= ""
        dateInput.value= ""
    }
}

// To Make Loading After The Form Closeing

function closeingFormLoading(){
    loadingDom.style.display = 'block';
    setTimeout(function(){
        loadingDom.style.display = 'none';
        thanks();
    }, 3000); 
}

// To Display Thanks Massage


function thanks(){
    thanksMassage.style.display = 'block';
    setTimeout(function(){
        thanksMassage.style.display = 'none';
        overlay.style.display = 'none';
    }, 2000); 
    company = company.filter(element => {
        if(element.id ==companyId) element.empNum++;
        return element;
    });
    console.log(company);
    drawcompanyUI(company);
}






// To Close The Overlay


var close = document.getElementsByClassName("close")[0];
close.onclick=() =>{
    overlay.style.display= "none";
}
document.onkeydown = function(key){
    if(key.keyCode =="27"){
        overlay.style.display= "none";
    }
}
