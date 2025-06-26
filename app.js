const input = document.getElementById('input');
const addButton = document.getElementById('add-btn');
const themeButton = document.getElementById('theme-btn');
const taskList = document.getElementById('task-list');

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

  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="complete-checkbox" />
    <span>${text}</span>
    <button class="delete-btn">Delete</button>
  `;

  const checkbox = li.querySelector('.complete-checkbox');
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
  });

  li.querySelector('.delete-btn').addEventListener('click', () => li.remove());

  taskList.appendChild(li);
  input.value = '';
  input.focus();
}
