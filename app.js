//let tasks: Task[] = [];
var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
var taskIdInput = document.getElementById("taskId"); //recupération du Input hidden
var taskInput = document.getElementById("taskInput");
function renderTasks() {
    var taskList = document.getElementById("taskList");
    if (taskList) {
        taskList.innerHTML = "";
        tasks.forEach(function (task, index) {
            var card = document.createElement("div");
            card.className = "card";
            card.innerHTML = "\n            <div class=\"card-content\">\n                <div class=\"inputs\">\n                    <input type=\"checkbox\" onclick=\"completeTask(".concat(index, ")\" id=\"ch_").concat(index, "\" class=\"termineTache\" >\n                    <p class=\"nomTache\" id=\"nomTask\">").concat(task.nom, "</p>\n                </div>\n                <div class=\"card-buttons\">\n                    <button class=\"edit-button\" onclick=\"remplirFormulaire(").concat(index, ")\">\u00C9diter</button>\n                    <button class=\"delete-button\" onclick=\"deleteTask(").concat(index, ")\">Supprimer</button>\n                </div>\n            </div>\n        ");
            taskList.appendChild(card);
        });
    }
    //completeTask();
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function remplirFormulaire(index) {
    taskIdInput.value = index; //remplir la valeur de Input hidden
    taskInput.value = tasks[index].nom;
}
function ajouterModifierTask() {
    var taskIndex = parseInt(taskIdInput.value); // Convertir la valeur en entier
    // Récupérer les valeurs du formulaire
    var taskText = taskInput.value.trim();
    if (taskInput.value !== "") {
        if (taskIndex >= 0 && taskIndex < tasks.length) {
            // Si un index valide est fourni, modifier la tâche existante
            tasks[taskIndex].nom = taskText;
            taskIdInput.value = ""; // Vider le Input hidden
        }
        else {
            var newTask = {
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
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
function completeTask(index) {
    var checkbox = document.getElementById("ch_" + index);
    checkbox.addEventListener('change', function (e) {
        if (checkbox.checked) {
            e.target.nextElementSibling.classList.add("tacheTerniner");
            var parent_1 = e.target.parentNode;
            parent_1.nextElementSibling.children[0].classList.add("desactiverBtn");
            tasks[index].terminer = true;
        }
        else {
            e.target.nextElementSibling.classList.remove("tacheTerniner");
            var parent_2 = e.target.parentNode;
            parent_2.nextElementSibling.children[0].classList.remove("desactiverBtn");
            tasks[index].terminer = false;
        }
    }, true);
    saveTasks();
}
// Initial rendering
renderTasks();
