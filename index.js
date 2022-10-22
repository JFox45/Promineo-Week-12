//const url = 'https://63506baa3e9fa1244e463614.mockapi.io/Tasks';

let form = document.getElementById('form');
let textInput = document.getElementById('text-input');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('date-input');
let extraInput = document.getElementById('extra-input');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');

let data = [];

//These two calls allows me to open and close the form via the submit button and does not close the window if nothing valid is inputed.
form.addEventListener('submit', (j) => {
    j.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === '') {
        console.log('failure');
        msg.innerHTML = 'Tasks are blank';
    } else {
        console.log('success');
        msg.innerHTML = '';
        acceptData();
        add.setAttribute('data-dismiss', 'modal');
        add.click();

        (() => {
            add.setAttribute('data-dismiss', '');
        })()
    }
};

//this takes the data inputed and stores the values to each variable in the order they are entered in. Text will be for the title, date will always be date and extra is the extra words. Then pushed to the local storage.
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        extra: extraInput.value,
    });

    localStorage.setItem('data', JSON.stringify(data));


    console.log(data);
    createTasks();
    //makeTasks(data);
};

//Creates a new div with everything needed to create a new box for the task entered. Map input goes through every part of the data and the y is the number of which part we are in.
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += 
        `<div id=${y}>
        <span>${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.extra}</p>
    
        <span class="options">
            <span onClick="updateTask(this)" data-toggle="modal" data-target="#form" id="edit-sign">&#9998;</span>
            <span onClick="deleteTask(this);createTasks()" id="delete-sign">&#10007;</span>
        </span>
        
    </div>`);
    });
    

resetForm();
};

//Pretty straight forward but splicing out an inputed object is easiest since I can splice the full parent of seleceted object and delete 1 at a time with 1 button.
let deleteTask = (del) => {
    del.parentElement.parentElement.remove();
    data.splice(del.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    //delTask(data);
};

//I take the input values and store the new ones over top of these and delete the original in the process so the new can take it's place.
let updateTask = (update) => {
    let selectedTask = update.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    extraInput.value = selectedTask.children[2].innerHTML;

    //deleteTask(editTask(update));
    deleteTask(update);
};

//Just sets the form back to empty for entering text.
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    extraInput.value = "";
};

//IIFE function here that gets the stored items in the local storage and it automatically called. The JSON.parse is to make the data come out in the form that it's supposed to look.
(() => {

    data = JSON.parse(localStorage.getItem('data')) || [];
    //data = JSON.parse(($.get(this.url + `/${data}`))) || [];
    //makeTasks(data);
    createTasks();
    console.log(data);
})();

//attempted using the API but I'm still quite confused on the topic and need more time to research and learn. I could get the local storage to work fine though which was a plus! Took me a while to get it to update on an empty storage without errors. That's why the "|| [];" is above.
/*const delTask = (data) => {
    return $.ajax({
        url: this.url = `/${data}`,
        type: 'DELETE'
    });
}

const editTask = (data) => {
    return $.ajax({
        url: this.url + `/${data}`,
        dataType: 'json',
        data: JSON.stringify(house),
        contentType: 'application/json',
        type: 'PUT'
    });
}

const makeTasks = (data) => {
    return $.post(this.url, data);
}*/
