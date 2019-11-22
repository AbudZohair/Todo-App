// Selecting the add input
const addTodoInput  = document.querySelector('.add');
// Selecting the ul of totos
const list = document.querySelector('.todos');
// Selecting the search input
const search = document.querySelector('.search input');




///////////// UI Events Area ;) /////////////////


// adding todo to the list 
addTodoInput.addEventListener('submit', e =>{
    e.preventDefault();
    let todo = addTodoInput.add.value.trim();
    if(todo.length){
        create(todo);
        addTodoInput.reset();
        storeTodoToLocalStorage(todo);
    }
});


// Removing the to do from UI
list.addEventListener('click', e =>{
    if(e.target.classList.contains('delete')){

        if(confirm("did you finished this task?!")){
            e.target.parentElement.remove();
                  // Remove todo From Local Storage 
    removeTodoFromLocalStorage(e.target.parentElement);
        }

  
    }

});



//Search and Filter  on KeyUp
search.addEventListener('keyup', ()=>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

// Prevent the Default on Submit
document.querySelector('.search').addEventListener('submit', (e)=>{
    e.preventDefault();
})

// Get Todos From Local Storage to UI
document.addEventListener('DOMContentLoaded', getTodos);


//////////////////////  Functions Area :D  /////////////////////////////////

// Create Todo Item
function create (todo){
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center todo">
    <span>
        ${todo}
    </span>
    <i class="fas fa-trash-alt delete"></i>
</li>
    `
list.innerHTML += html;
}

// Fitering To do Search
function filterTodos (term) {


    // Make an Array of tasks

    Array.from(list.children)
        // filter tasks list  to hide the list item that doesn't include the (Searched Term)
        .filter( item=>   !item.textContent.toLowerCase().includes(term))
        // add the filter class that hide this item 
        .forEach(item => item.classList.add('filter'));
        
        Array.from(list.children)
        // filter tasks list  to show the list item that includes the (Searched Term)
        .filter( item=>   item.textContent.toLowerCase().includes(term))

        // remove the filter class that hide this item 
        .forEach(item =>  item.classList.remove('filter'));
};


// Strore todos in Local Storage 
function storeTodoToLocalStorage (todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}


// Remove Todo from the Local Storage 
function removeTodoFromLocalStorage (todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let filtered = todos.filter((todoItem)=>{
        return todoItem !== todo.textContent.trim(); 
    });

    localStorage.setItem('todos', JSON.stringify(filtered));

}


// Get Todos From Local Storage and Pushing them to UI
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo=>{
        create(todo);
    });

}
