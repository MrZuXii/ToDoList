const form = document.querySelector('form');
const addtask = document.querySelector('.overflow');
const button = document.querySelector('.btn-plus');
const app = document.querySelector('.content-panel');
const paneladd = document.querySelector('.paneladd');
const btn = document.querySelector('.addTask');
const textArea = document.querySelector('textarea');
const input = document.querySelector('input');
const HeaderContent = document.querySelector('.header-content');
const ReportTask = document.querySelector(".report-task");

const noDate = new Date();
let test = 0;


const removeTask = (e) => {
    e.target.parentNode.remove();
    ReportTask.textContent = "usunięto zadanie";
    ReportTask.classList.add('active');
    setTimeout(() => {
        ReportTask.classList.remove('active')
    }, 1000)

}
const BtnAddTask = (event) => {
    event.preventDefault()
    if (textArea.value == '') {
        alert("Wpisz coś")
        return;
    }
    // HeaderContent.innerHTML = InputDate.value;
    const div = document.createElement('div');
    div.classList.add("task");
    const btnCrt = document.createElement('button')
    app.appendChild(div);
    btnCrt.classList.add('circe')

    div.innerHTML = '<button class = "circe" > </button> ' + textArea.value;
    div.querySelector('button').addEventListener('click', removeTask);

    addtask.classList.remove('active');
    paneladd.classList.remove('active');
    textArea.value = '';
    ReportTask.textContent = "dodano nowe zadanie";
    ReportTask.classList.add('active');
    setTimeout(() => ReportTask.classList.remove('active'), 1000)
    if (test === 0) {
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
        HeaderContent.innerHTML = `${days[noDate.getDay()]} <span style="color:#ddd;font-size: 13px;">${noDate.getDate()} styczenia</span>`;
        test = 1;
    }
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
        console.log("dziala")
    }
});

input.addEventListener("input", (e) => {

    const value = input.value;
    const elements = document.querySelectorAll('.task')
    for (const el of elements) {
        const text = el.innerText;
        if (text.includes(value)) {
            el.style.setProperty("display", "");
        } else {
            el.style.setProperty("display", "none");
        }
    }

})
addtask.addEventListener('click', () => {
    addtask.classList.remove('active');
    paneladd.classList.remove('active');

})



// if (('input').focus())
// btn.addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//         BtnAddTask(e);
//     }
// });
// window.addEventListener('keypress', function (e) {
//     if (e.key === 'n') {
//         BtnActive()
//     }
// });
// input.addEventListener("keydown", (e) => {
// if (e.keyCode === 13) {
//         }
// });