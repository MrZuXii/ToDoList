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
let test = 0;
let godzina = 0;
let Tasks = 0;
const toolipse = document.querySelectorAll('[data-toggle="tooltip"]');
const tootip = function () {
    const tootip = document.querySelector('.tootip');
    let element = this.getBoundingClientRect()
    tootip.innerHTML = this.getAttribute("tooltip") + `<span>${this.getAttribute("key")}</span>`
    tootip.style.display = "block";
    tootip.style.cssText = `top: ${element.y + 40}px; left: ${element.x - (tootip.offsetWidth- element.width) / 2}px; display:block;`;

}
for (let i = 0; i < toolipse.length; i++) {
    toolipse[i].addEventListener("mouseover", tootip);
    toolipse[i].addEventListener("mouseout", function () {
        let element = this.getBoundingClientRect()
        document.querySelector('.tootip').style.cssText = "display: none";
    })
}

const TaskReport = (txt) => {
    ReportTask.classList.add('active');
    ReportTask.textContent = txt
    setTimeout(() => ReportTask.classList.remove('active'), 1000)
}

const removeTask = (e) => {
    e.target.parentNode.remove();
    TaskReport("usunięto zadanie")
    NoTask(-1);
}
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
const BtnAddTask = (event) => {
    event.preventDefault()
    if (textArea.value == '') {
        alert("Wpisz coś")
        return;
    }
    // HeaderContent.innerHTML = InputDate.value;
    const li = document.createElement('li');
    li.classList.add("task");
    const btnCrt = document.createElement('button')
    document.querySelector('ul').appendChild(li);
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
    let InputData = document.querySelector('input#start').value;
    godzina = new Date(document.querySelector('input#start').value);
    if (test === 0) {

        HeaderContent.innerHTML = `${days[godzina.getDay()]} <span style="color:#ddd;font-size: 13px;">${parseInt(InputData.slice(8))} styczenia</span>`;
        test = 1;
    }
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