import { $ } from './utils/utils.js';

export default function App() {
  this.todos = [];
  const resetInput = () => {
    $('#todo-input').value = '';
    $('#todo-input').focus();
    $('#thema-select').options[0].selected = true;
  };
  const checkInput = (todoInput) => {
    if (todoInput.replace(/\s/g, '') === '') {
      resetInput();
      alert('다시 todo를 입력해주세요.');
      return false;
    }
    return true;
  };
  const showCount = () => {
    const count = $('#todo-list').querySelectorAll('li').length;
    $('#todo-count').textContent = `진행: ${count}개 완료: 0개`;
  };
  const showTodoList = () => {
    const todosTemplate = this.todos
      .map((todo, index) => {
        return `
      <li data-todo-id="${index}" class="todo-item checked">
        <div class="checkbox"></div>
        <div class="${todo.isCompleted ? 'completed' : ''} todo">${todo.content}</div>
        <div class="todo-end">
          <span class="thema">${todo.thema}</span>
          <button class="delete-button">x</button>
        </div>
      </li>
      `;
      })
      .join('');
    $('#todo-list').innerHTML = todosTemplate;
    showCount();
  };
  const addTodo = () => {
    const todoInput = $('#todo-input').value;
    const thema = $('#thema-select').options[$('#thema-select').selectedIndex].text;
    if (!checkInput(todoInput)) {
      return;
    }
    this.todos.push({ thema, content: todoInput, isCompleted: '' });
    showTodoList();
    resetInput();
  };
  const removeTodo = (e) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const todoId = e.target.closest('li').dataset.todoId;
      this.todos.splice(todoId, 1);
      showTodoList();
    }
  };
  const editTodoContent = (e) => {
    const todoId = e.target.closest('li').dataset.todoId;
    const todo = e.target.textContent;
    const editedTodo = prompt('수정할 todo를 입력해주세요.', todo);
    console.log(editedTodo);
    if (editedTodo.replace(/\s/g, '') === '') {
      return alert('다시 todo를 수정해주세요.');
    }
    this.todos[todoId].content = editedTodo;
    showTodoList();
  };
  const editTodoThema = (e) => {
    const todoId = e.target.closest('li').dataset.todoId;
    const thema = e.target.textContent;
    const editedThema = prompt('수정할 todo를 입력해주세요.', thema);
    if (!['공부', '개인 성장', '인맥 관리'].includes(editedThema)) {
      return alert('공부, 개인 성장, 인맥 관리 중 하나를 선택하세요.');
    }
    this.todos[todoId].thema = editedThema;
    showTodoList();
  };

  $('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
  });
  $('#todo-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
      return removeTodo(e);
    }
    if (e.target.classList.contains('todo')) {
      return editTodoContent(e);
    }
    if (e.target.classList.contains('thema')) {
      return editTodoThema(e);
    }
  });
}

new App();
