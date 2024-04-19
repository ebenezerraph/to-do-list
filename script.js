const form = document.getElementById('add-task-form');
const taskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');

function createNewTask(taskText, completed = false) {
  const newTask = document.createElement('li');
  newTask.className = 'task-item';
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  const checkmark = document.createElement('div');
  const check = document.createElement('i');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', toggleTaskCompletion);
  checkmark.className = 'checkmark';
  check.className = 'fa fa-check';
  checkmark.appendChild(check);
  label.appendChild(checkbox);
  label.appendChild(checkmark);
  const span = document.createElement('span');
  const task = document.createElement('div');
  task.textContent = taskText;
  if (completed) {
    task.style.textDecoration = 'line-through';
    task.style.color = 'black';
  }
  span.appendChild(task);
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerHTML = '&times;';
  deleteButton.addEventListener('click', deleteTask);
  newTask.appendChild(label);
  newTask.appendChild(span);
  newTask.appendChild(deleteButton);
  return newTask;
}

function toggleTaskCompletion(event) {
  const taskItem = event.target.closest('.task-item');
  const taskText = taskItem.querySelector('span > div');
  taskText.style.textDecoration = event.target.checked ? 'line-through' : 'none';
  taskText.style.color = event.target.checked ? 'black' : '#0069cc';
  saveToDoList();
}

function deleteTask(event) {
  const taskItem = event.target.closest('.task-item');
  taskItem.remove();
  saveToDoList();
}

function saveToDoList() {
  const tasks = Array.from(taskList.children).map(task => ({
      text: task.querySelector('span > div').textContent,
      completed: task.querySelector('input').checked
    }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

function loadToDoList() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const newTask = createNewTask(task.text, task.completed);
    taskList.appendChild(newTask);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (taskInput.value.trim()) {
    const newTask = createNewTask(taskInput.value);
    taskList.appendChild(newTask);
    taskInput.value = '';
    saveToDoList();
  }
});

window.addEventListener('load', loadToDoList);