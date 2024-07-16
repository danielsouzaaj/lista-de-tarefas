const form = document.querySelector(".form");
const taskList = document.querySelector(".task-list");
const inputText = document.querySelector("#text-form");

const tasks = JSON.parse(localStorage.getItem("listaTarefas")) || [];

taskList.addEventListener("click", action);
form.addEventListener("submit", addingTask);

renderTasks();

function addingTask(event) {
  event.preventDefault();

  tasks.push({ done: false, content: inputText.value });
  salvarDados();
  renderTasks();
  inputText.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskList = document.querySelector(".task-list");
    const liElement = document.createElement("li");
    const pElement = document.createElement("p");
    const checkBtn = document.createElement("button");
    const checkImg = document.createElement("img");
    const removeBtn = document.createElement("button");
    const removeImg = document.createElement("img");

    if (task.done) {
      liElement.setAttribute("class", "task checked");
      checkImg.setAttribute("src", "./images/check.svg");
    } else {
      liElement.setAttribute("class", "task");
      checkImg.setAttribute("src", "./images/unchecked.svg");
    }

    pElement.setAttribute("class", "task-content");
    pElement.innerText = task.content;

    checkBtn.setAttribute("class", "task-btn check");
    checkImg.setAttribute("alt", "Marcar tarefa como concluida");
    checkBtn.appendChild(checkImg);

    removeBtn.setAttribute("class", "task-btn remove");
    removeImg.setAttribute("src", "./images/remove.svg");
    removeImg.setAttribute("alt", "Remover Tarefa");
    removeBtn.appendChild(removeImg);

    liElement.appendChild(checkBtn);
    liElement.appendChild(pElement);
    liElement.appendChild(removeBtn);

    taskList.appendChild(liElement);
  });
}

function action(event) {
  const button = event.target;
  const taskText = button.parentElement.children[1].textContent;

  if (button.classList.contains("remove")) {
    removeTask(taskText);
    renderTasks();
  }

  if (button.classList.contains("check")) {
    cheked(button.firstChild, button.parentElement);

    for (let task of tasks) {
      if (task.content === taskText) {
        task.done = !task.done;
      }
    }

    salvarDados();
  }
}

function cheked(img, task) {
  const imgSource = img.getAttribute("src");

  if (imgSource === "./images/unchecked.svg") {
    img.setAttribute("src", "./images/check.svg");
    img.setAttribute("alt", "Tarefa concluida");
    task.classList.toggle("checked");
  } else {
    img.setAttribute("src", "./images/unchecked.svg");
    img.setAttribute("alt", "Marcar tarefa como concluida");
    task.classList.toggle("checked");
  }
}

function removeTask(taskText) {
  for (let task of tasks) {
    if (task.content === taskText) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  }
  salvarDados();
}

function salvarDados() {
  localStorage.setItem("listaTarefas", JSON.stringify(tasks));
}
