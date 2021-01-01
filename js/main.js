const form = document.querySelector('form');
const addtask = document.querySelector('.overflow');
const button = document.querySelector('.btn-plus');
const app = document.querySelector('.content-panel');
const paneladd = document.querySelector('.paneladd');
const btn = document.querySelector('.addTask');
const textArea = document.querySelector('textarea');
const input = document.querySelector('input');
const HeaderContent = document.querySelector('.header-content');
// const InputDate = document.getElementById('start');


const noDate = new Date();
if (noDate.getDay() == 5)
    HeaderContent.innerHTML = `Piątek <span style="color:#ddd;font-size: 13px;">${noDate.getDate()} styczenia</span>`;

const removeTask = (e) => {
    e.target.parentNode.remove();
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