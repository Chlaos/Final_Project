var todos = JSON.parse(localStorage.getItem('todos')) || [];
var todoForm = document.getElementById('todoForm');
var todoList = document.getElementById('todoList');
var todoInput = document.getElementById('todoInput');

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var todoText = todoInput.value;
    todos.push({ text: todoText, complete: false });

    todoInput.value = '';
    updateTodoList();
});

function updateTodoList() {
    todoList.innerHTML = '';

    todos.forEach(function(todo, index) {
        var todoItem = document.createElement('li');

        if(todo.complete) {
            todoItem.classList.add('completed');
        }

        todoItem.textContent = todo.text;

        var checkButton = document.createElement('button');
        checkButton.textContent = 'Check';
        checkButton.classList.add('checkButton');
        checkButton.addEventListener('click', function() {
            todos[index].complete = !todos[index].complete;
            updateTodoList();
        });
        todoItem.appendChild(checkButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', function() {
            todos.splice(index, 1);
            updateTodoList();
        });
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

updateTodoList();
