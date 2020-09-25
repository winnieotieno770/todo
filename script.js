//array that will hold the to do items
let todoItems = [];




function renderTodo(todo) {
  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        // remove the item from the DOM
        item.remove();
        return
      }
    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
      </button>
    `;
    if (item) {
        list.replaceChild(node, item);
      } else {
        list.append(node);
      }

}

// function will create a new array object that will be pushed to todoitems
function addToDo(text){
 const todo = {
     text,
     checked:false,                        
     id:Date.now()
 };

 todoItems.push(todo)
 console.log(todoItems)
 renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
  }
  function deleteTodo(key) {
    // find the corresponding todo object in the todoItems array
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Create a new object with properties of the current todo item
    // and a `deleted` property which is set to true
    const todo = {
      deleted: true,
      ...todoItems[index]
    };
    // remove the todo item from the array by filtering it out
    todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
  }
  


//select the form element
const form = document.querySelector('.js-form');

// add a form eventlistener
form.addEventListener('submit', event =>{
    //prevent page refresh on form submission
    event.preventDefault();

    //select the text  input
    const input = document.querySelector('.js-to-do-input')
    // get the value of input and remove whitespace
    const text = input.value.trim();
    if (text !== ''){
        addToDo(text);
        input.value = '';
        input.focus()
    }

});

// Select the entire list
const list = document.querySelector('.js-todo-list');
// Add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

    // add this `if` block
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
           
      }
});


document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItemsRef');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});
  


