//--- Zmienne ---//

const form = document.querySelector('form');
const addtask = document.querySelector('.overflow');
const button = document.querySelector('.btn-plus');
const paneladd = document.querySelector('.paneladd');
const btn = document.querySelector('.addTask');
const textArea = document.querySelector('textarea');
const input = document.querySelector('input');
const HeaderContent = document.querySelector('.header-content');
const ReportTask = document.querySelector(".report-task");

const noDate = new Date();
const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
const months = ['Styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']
let test = 0;
let = 0;
let Tasks = 0;
let DivDateInput = [];

//--- Zmienne ---//

const toolipse = document.querySelectorAll('[data-toggle="tooltip"]');
const tootip = function () {
    const tootip = document.querySelector('.tootip');
    tootip.classList.add("active");
    let element = this.getBoundingClientRect()
    tootip.innerHTML = this.getAttribute("tooltip") + `<span>${this.getAttribute("key")}</span>`
    tootip.style.display = "block";
    tootip.style.cssText = `top: ${element.y + 40}px; left: ${element.x - (tootip.offsetWidth- element.width) / 2}px; display:block;`;

}
for (let i = 0; i < toolipse.length; i++) {
    toolipse[i].addEventListener("mouseover", tootip);
    toolipse[i].addEventListener("mouseout", function () {
        let element = this.getBoundingClientRect()
        const tootip = document.querySelector('.tootip');
        tootip.classList.remove("active");
        document.querySelector('.tootip').style.cssText = "display: none";
    })
}
//--- Wyświetlanie Komunikatów ---//
const TaskReport = (txt) => {
    ReportTask.classList.add('active');
    ReportTask.textContent = txt
    setTimeout(() => ReportTask.classList.remove('active'), 1000)
}

const removeTask = (e) => {
    TaskParent = e.target.parentNode;
    TaskReport("usunięto zadanie")
    NoTask(-1);
    let licznik = TaskParent.parentNode.getAttribute("tasks");
    const DataSelector = document.querySelector(`[data="${TaskParent.parentNode.getAttribute("data")}"]`)
    DataSelector.setAttribute("tasks", --licznik);
    if (licznik <= 0) {
        DataSelector.remove()
        DivDateInput.pop(DivDateInput.indexOf(DataSelector.getAttribute("data")))
    }
    e.target.parentNode.remove();
}
//--- Wyświetlanie Komunikatów ---//

//--- Brak Zadań jeśli tak to wyświetl Brak zadań jeśli nie to wyświetl "Ikonke" ---//
const NoTask = (a) => {
    const NoTask = document.querySelector(".NoTask");
    Tasks = Tasks + a;
    if (Tasks <= 0) {
        NoTask.style.display = "block"
        HeaderContent.style.display = "none"
    } else {
        NoTask.style.display = "none"
        HeaderContent.style.display = "block"
    }
}
//--- Brak Zadań jeśli tak to wyświetl Brak zadań jeśli nie to wyświetl "Ikonke" ---//


const BtnAddTask = (event) => {
    event.preventDefault()
    if (textArea.value == '') {
        alert("Wpisz coś")
        return;
    }
    if (DivDateInput.indexOf(document.querySelector('input#start').value) != -1) {
        console.log("Xd");
    } else {
        const DivDate = document.createElement("div")
        DivDateInput.push(document.querySelector('input#start').value);
        DivDate.setAttribute('data', DivDateInput[DivDateInput.length - 1]);
        DivDate.setAttribute('tasks', 0);
        document.querySelector('.content-panel').appendChild(DivDate);

        const HeaderDate = document.createElement('header')
        HeaderDate.classList.add("header-content");

        let InputData = new Date(document.querySelector('input#start').value);
        let day = InputData.getDate();
        let DayOfWeek = InputData.getDay();
        let month = InputData.getMonth() + 1;
        let year = InputData.getFullYear();
        HeaderDate.innerHTML = `${days[DayOfWeek]} <span style="color:#ddd;font-size: 13px;">${day} ${months[month]}</span>`;
        document.querySelector(`[data="${DivDateInput[DivDateInput.length - 1]}"]`).appendChild(HeaderDate);
    }





    const li = document.createElement('li');
    li.classList.add("task");
    for (const el of DivDateInput) { //el to nazwa zmiennej wymyślona przez nas
        if (el === document.querySelector('input#start').value) {
            document.querySelector(`[data="${el}"]`).appendChild(li);
            let licznik = document.querySelector(`[data="${el}"]`).getAttribute("tasks");
            document.querySelector(`[data="${el}"]`).setAttribute("tasks", ++licznik);
        }

    }
    const btnCrt = document.createElement('button')

    btnCrt.classList.add('circe')

    li.innerHTML = `<button class = "circe" title="Zaznacz Zadanie Wykonane"><i class="fas fa-check"></i> </button> <p>${textArea.value}</p><i class="fas fa-trash-alt" title="Usuń Zadanie"></i>`;
    li.querySelector('button').addEventListener('click', (e) => {
        TaskReport("ukończono zadanie")
        if (li.style.textDecoration === "line-through")
            li.style.textDecoration = "none";
        else
            li.style.textDecoration = "line-through";
        console.log("dziala");
    })
    li.querySelector('.fa-trash-alt').addEventListener('click', removeTask);

    addtask.classList.remove('active');
    paneladd.classList.remove('active');
    textArea.value = '';
    TaskReport("dodano nowe zadanie")

    NoTask(1);
}


const BtnActive = (event) => {
    setTimeout(function () {
        document.querySelector('textarea').focus();
    }, 0);

    addtask.classList.add('active');
    paneladd.classList.add('active');
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
})
button.addEventListener('click', BtnActive)

btn.addEventListener('submit', BtnAddTask)

textArea.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        BtnAddTask(e);
    }
});

// Wyszukiwarka
const SearchTasks = (e) => {
    const value = input.value;
    const elements = document.querySelectorAll('.task')
    for (const el of elements) {
        const text = el.innerText.toLocaleLowerCase();
        if (text.includes(value.toLocaleLowerCase())) {
            el.style.setProperty("display", "");
        } else {
            el.style.setProperty("display", "none");
        }
    }
}
input.addEventListener("input", SearchTasks)


// Aktualna Data w Inpucie Data
addtask.addEventListener('click', () => {
    addtask.classList.remove('active');
    paneladd.classList.remove('active');

})
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
document.querySelector('input#start').value = new Date().toDateInputValue();
const Test = (e) => {
    switch (e.target.tagName) {
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
            return;
    }
    switch (e.keyCode) {
        case 74:
            BtnActive();
        case 191:
            input.focus();
            e.preventDefault();
    }
}
window.addEventListener("keydown", Test)