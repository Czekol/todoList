const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const alertInfo = document.querySelector('.alert-info');
const taskArea = document.querySelector('.task-area');
const popup = document.querySelector('.popup');
const popupInput = document.querySelector('.popup-input');
const popupInfo = document.querySelector('.popup-info');
const acceptPopupBtn = document.querySelector('.accept');
const cancelPopupBtn = document.querySelector('.cancel');

let id = 0
let editedTodo

const createNewTask = () => {
	const newLi = document.createElement('li');
	const liText = document.createElement('span');
	newLi.setAttribute('id',id)
	newLi.innerHTML = `
    <div class="tools">
	<button class="complete"><i class="fas fa-check"></i></button>
	<button class="edit">EDIT</button>
	<button class="delete"><i class="fas fa-times"></i></button>
</div>`;
	liText.textContent = todoInput.value;
	taskArea.append(newLi);
	newLi.prepend(liText);

	id++
};

const addTodo = () => {
	if (todoInput.value.trim() !== '') {
		createNewTask();
		todoInput.value = '';
		alertInfo.textContent = '';
	} else {
		alertInfo.textContent = 'Type task content!';
	}
};

const checkClick = e => {
	if (e.target.classList.contains('complete')) {
		completeTodo(e);
	} else if (e.target.classList.contains('edit')) {
		editTodo(e);
	} else if (e.target.classList.contains('delete')) {
		deleteTodo(e);
	}
};

const completeTodo = e => {
	e.target.closest('li').classList.toggle('completed');
	e.target.classList.toggle('completed');
};

const editTodo = e => {
	let currentTodo = e.target.closest('li').id;
    editedTodo = document.getElementById(currentTodo);

	console.log(editedTodo);
	popup.style.display = 'flex';
	popupInput.value = editedTodo.firstChild.textContent;

	acceptPopupBtn.addEventListener('click', () => {
		if (popupInput.value !== '') {
			editedTodo.firstChild.textContent = popupInput.value;
			popup.style.display = 'none';
			popupInfo.textContent = '';

		} else {
			popupInfo.textContent = 'Your have to type something!';
		}
	});

	cancelPopupBtn.addEventListener('click', () => {
		popup.style.display = 'none';
		popupInfo.textContent = '';
	});
};

const deleteTodo = e => {
	e.target.closest('li').remove();

	if (taskArea.textContent.trim() === '') {
		alertInfo.textContent = 'No task on the list!';
	}
};

const enterAddTodo = e => {
	if (e.key === 'Enter') {
		addTodo();
	}
};

addBtn.addEventListener('click', addTodo);
taskArea.addEventListener('click', checkClick);
todoInput.addEventListener('keyup', enterAddTodo);
