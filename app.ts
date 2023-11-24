interface Task {
  nom: string;
  terminer: boolean
}
//let tasks: Task[] = [];
let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
const taskIdInput = document.getElementById("taskId") as HTMLInputElement; //recupération du Input hidden
const taskInput = document.getElementById("taskInput") as HTMLInputElement;

function renderTasks() {
  const taskList = document.getElementById("taskList");
  if (taskList) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
            <div class="card-content">
                <div class="inputs">
                    <input type="checkbox" onclick="completeTask(${index})" id="ch_${index}" class="termineTache" >
                    <p class="nomTache" id="nomTask">${task.nom}</p>
                </div>
                <div class="card-buttons">
                    <button class="edit-button" onclick="remplirFormulaire(${index})">Éditer</button>
                    <button class="delete-button" onclick="deleteTask(${index})">Supprimer</button>
                </div>
            </div>
        `;
      taskList.appendChild(card);
    });
  }
  //completeTask();
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function remplirFormulaire(index: any) {
  taskIdInput.value = index; //remplir la valeur de Input hidden
  taskInput.value = tasks[index].nom;
}

function ajouterModifierTask() {
  const taskIndex = parseInt(taskIdInput.value); // Convertir la valeur en entier
  // Récupérer les valeurs du formulaire
  const taskText = taskInput.value.trim();
  if (taskInput.value !== "") {
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      // Si un index valide est fourni, modifier la tâche existante
      tasks[taskIndex].nom = taskText;
      taskIdInput.value = ""; // Vider le Input hidden
    } else {
      const newTask: Task = {
        nom: taskText,
        terminer: false
      };
      tasks.push(newTask);
      taskInput.value = "";
    }
    saveTasks();
    renderTasks();
  }
}

// Fonction pour supprimer une tâche
function deleteTask(index: number) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function completeTask(index: any) {
    const checkbox = document.getElementById("ch_"+index) as HTMLInputElement;
    checkbox.addEventListener('change',(e:any)=>{
        if (checkbox.checked) {
            e.target.nextElementSibling.classList.add("tacheTerniner");
            const parent = e.target.parentNode;
            parent.nextElementSibling.children[0].classList.add("desactiverBtn");
            tasks[index].terminer = true;
        }else{
            e.target.nextElementSibling.classList.remove("tacheTerniner");
            const parent = e.target.parentNode;
            parent.nextElementSibling.children[0].classList.remove("desactiverBtn");
            tasks[index].terminer = false;
        }
    },true);
    saveTasks();
}

// Initial rendering
renderTasks();
