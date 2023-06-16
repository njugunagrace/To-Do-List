
const userContainer = document.getElementById('taskList');
const addTaskForm = document.getElementById('addTaskForm');
const successMessage = document.getElementById('successMessage');

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
    const gap = document.createElement('span');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    userName.value = todo.todo;
    userName.classList.add('form-control');
    checkbox.addEventListener('change', () => {
      userName.classList.toggle('completed', checkbox.checked);
    });
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', async () => {
      await deleteTodoById(userId);
      li.remove();
    });
    gap.style.marginRight = '10px';
    li.appendChild(checkbox);
    li.appendChild(userName);
    li.appendChild(deleteBtn);
    li.setAttribute('data-key', userId);
    li.classList.add('task');
    userContainer.prepend(li); // Add new todo at the top
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
  const tasks = document.getElementsByClassName('task');
  while (tasks.length > 0) {
    tasks[0].remove();
  }
};

addTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userId = parseInt(document.getElementById('userIdInput').value);
  const task = document.getElementById('taskInput').value;

  if (!isNaN(userId)) {
    await displayTodo(userId);
    successMessage.textContent = 'Todo added successfully.';
  } else {
    successMessage.textContent = 'Please enter a valid User ID.';
  }

  document.getElementById('userIdInput').value = '';
  document.getElementById('taskInput').value = '';
});

document.getElementById('deleteButton').addEventListener('click', deleteTasks);






//  const todoCont = document.getElementById('taskList');


//  const  getTodos=()=>{
//   return fetch('https://dummyjson.com/todos?limit=1')
//  .then(response=>response.json())
//   .then(response=>response)
//   .catch(error=>error)

// ;
// }
// const displayTodos= async()=>{
//   const todos=await getTodos();

//   todos.map(x=>{
//     let div = document.createElement('div');
//     let name = document.createElement('p');
//     let completed = document.createElement('p');
    

//     name.innerHTML = x.todo;
//     completed.innerHTML= x.completed;

//     div.appendChild(name);
//     div.appendChild(completed);

//     div.setAttribute('key',x.id);
//     div.setAttribute('class','todo');
//     todoCont.appendChild(div);


//   });
// }
// displayTodos();







// // Store tasks in an array
// let tasks = [];

// document.getElementById('addTaskForm').addEventListener('submit', async function(event){
//   event.preventDefault();

//   let todo = document.getElementById('todo').value;
//   let completed = document.getElementById('completed').value;

//   let data={
//     todo:todo,
//     completed:completed
//   };
//   console.log(data);


//   let result= await fetch('https://dummyjson.com/todos/user/5' , )
       
  
     

// })






// async function fetchTodos() {
//   try {
//     const response = await fetch('https://dummyjson.com/todos/user/5');
//     const data = await response.json();
//     tasks = data;
//     displayTasks();
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//   }
// }

// Function to add a new task
// function addTask(event) {
//   event.preventDefault();

//   // Get user input values
//   const userId = document.getElementById('userId').value;
//   const task = document.getElementById('task').value;

//   // Create a new task object
//   const newTask = { userId, task, completed: false };

//   // Add the new task at the beginning of the tasks array
//   tasks.unshift(newTask);

//   // Clear the form fields
//   document.getElementById('userId').value = '';
//   document.getElementById('task').value = '';

//   // Update the task list
//   displayTasks();
// }

// // Function to complete a task
// function completeTask(index) {
//   // Toggle the completed status of the task
//   tasks[index].completed = !tasks[index].completed;

//   // Update the task list
//   displayTasks();
// }

// // Function to delete a task
// function deleteTask(index) {
//   // Remove the task from the tasks array
//   tasks.splice(index, 1);

//   // Update the task list
//   displayTasks();
// }

// // Function to display the tasks
// function displayTasks() {
//   const taskList = document.getElementById('taskList');

//   // Clear the task list
//   taskList.innerHTML = '';

//   // Filter and display tasks based on user ID
//   const userId = document.getElementById('userId').value;
//   const filteredTasks = tasks.filter(task => task.userId == userId);

//   // Add each task as an item in the task list
//   filteredTasks.forEach((task, index) => {
//     const taskItem = document.createElement('div');
//     taskItem.classList.add('task-item');
//     if (task.completed) {
//       taskItem.classList.add('completed-task');
//     }

//     const taskContent = document.createElement('p');
//     taskContent.textContent = task.task;

//     const completeBtn = document.createElement('button');
//     completeBtn.textContent = 'Complete';
//     completeBtn.addEventListener('click', () => completeTask(index));

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-btn');
//     deleteBtn.addEventListener('click', () => deleteTask(index));

//     taskItem.appendChild(taskContent);
//     taskItem.appendChild(completeBtn);
//     taskItem.appendChild(deleteBtn);

//     taskList.appendChild(taskItem);
//   });
// }

// // Add event listener to the form submit event
// document.getElementById('addTaskForm').addEventListener('submit', addTask);

// // Fetch todos when the page loads
// fetchTodos();
