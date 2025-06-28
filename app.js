const input = document.getElementById('input');
const addButton = document.getElementById('add-btn');
const themeButton = document.getElementById('theme-btn');
const taskList = document.getElementById('task-list');

// achivemet tracker

let tasks = [];
let completedTasks = [];
const progressBar = document.querySelector('.progress-bar')
const span = document.querySelector('span');
const h3 = document.querySelector('h3');

let achivemet = 0;

function updateProgressBar(){
  achivemet = tasks.length === 0 ? 0 : (completedTasks.length / tasks.length) * 100;
  span.innerText = `${Math.round(achivemet)}%`;
  progressBar.style.setProperty('--progress', achivemet);
}

addButton.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeButton.querySelector('.theme-icon');
  icon.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  if (tasks.length != 0) {
    if(tasks.indexOf(text) >= 0){
      alert("Alredy added!");
      input.value = "";
      return;
    }
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="complete-checkbox" />
    <span>${text}</span>
    <button class="delete-btn">Delete</button>
  `;

  const checkbox = li.querySelector('.complete-checkbox');
  // checkbox.addEventListener('change', () => {
  //   li.classList.toggle('completed', checkbox.checked);
  //   completedTasks.push(li.innerText);
  //   achivemet = (completedTasks.length/tasks.length)*100;
  //   span.innerText = `${achivemet}%`;
  //   progressBar.style.setProperty('--progress', achivemet)
  // });

  checkbox.addEventListener('change', () => {
  li.classList.toggle('completed', checkbox.checked);

  const taskText = text;

  if (checkbox.checked) {
    if (!completedTasks.includes(taskText)) {
      completedTasks.push(taskText);
    }
  } else {
    completedTasks = completedTasks.filter(item => item !== taskText);
  }

  updateProgressBar();
  });


  li.querySelector('.delete-btn').addEventListener('click', (e) => {
    let dtask = text;

    tasks = tasks.filter(item => item != dtask);
    completedTasks = completedTasks.filter(item => item !== dtask);

    li.remove();
    updateProgressBar();
  });

  taskList.appendChild(li);
  input.value = '';
  input.focus();

  tasks.push(text);

}
