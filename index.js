const userContainer = document.getElementById('taskList');
const successMessage = document.getElementById('successMessage');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('deleteBtn');
const userIdInput = document.getElementById('userIdInput');

const getTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`);
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const displayTodo = async (userId) => {
  const todo = await getTodoById(userId);
  if (todo) {
    const li = document.createElement('li');
    const userName = document.createElement('input');
    const checkbox = document.createElement('input');
    const deleteBtn = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    userName.value = todo.todo;

    userName.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.classList.add('completed');
      } else {
        userName.classList.remove('completed');
      }
    });

    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteTodoById(userId);
      li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(userName);
    li.appendChild(deleteBtn);
    li.setAttribute('key', userId);
    li.classList.add('task');
    userContainer.appendChild(li);
  } else {
    console.log(`Todo with user ID ${userId} not found.`);
  }
};

const deleteTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTasks = () => {
  userContainer.innerHTML = '';
};

addBtn.addEventListener('click', () => {
  const userId = parseInt(userIdInput.value);
  if (!isNaN(userId)) {
    displayTodo(userId);
    successMessage.textContent = 'Todo added successfully.';
  } else {
    successMessage.textContent = 'Please enter a valid User ID.';
  }
});

deleteBtn.addEventListener('click', deleteTasks);
