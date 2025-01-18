const botaoAdicionar = document.getElementById("adicionarTarefa");
const entradaTarefa = document.getElementById("entradaTarefa");
const listaTarefas = document.getElementById("listaTarefas");

let tarefaEditando = null; // Armazena o item <li> que está sendo editado

carregarTarefas();

function adicionarTarefa() {
  const tarefa = entradaTarefa.value.trim();
  

  if (tarefa) {
    if (tarefaEditando) {
      // Atualiza a tarefa que está sendo editada
      tarefaEditando.firstChild.textContent = tarefa;
      tarefaEditando.classList.remove("editando");
      tarefaEditando = null;
      botaoAdicionar.textContent = "Adicionar"; // Volta ao normal
    } else {
      // Adiciona uma nova tarefa
      criarElementoTarefa(tarefa);
    }

    entradaTarefa.value = ""; // Limpa a entrada
    salvarTarefas(); // Atualiza o LocalStorage
  } else {
    alert("Por favor, insira uma tarefa");
  }
}
entradaTarefa.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
      adicionarTarefa(); // Chama a função de adicionar tarefa
  }
});
botaoAdicionar.addEventListener("click", adicionarTarefa);
    

function criarElementoTarefa(tarefa) {
  const itemLista = document.createElement("li");
  itemLista.textContent = tarefa;

  // Criar botão de editar
  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.className = "editarTarefa";

  // Criar botão de apagar
  const botaoApagar = document.createElement("button");
  botaoApagar.textContent = "Apagar";
  botaoApagar.className = "apagarTarefa";

  // Criar contêiner para botões
  const divBotoes = document.createElement("div");
  divBotoes.appendChild(botaoEditar);
  divBotoes.appendChild(botaoApagar);

  // Adicionar elementos à lista
  itemLista.appendChild(divBotoes);
  listaTarefas.appendChild(itemLista);

  // Evento para apagar tarefa
  botaoApagar.addEventListener("click", function () {
    if (tarefaEditando === itemLista) {
      alert("Conclua a edição antes de apagar esta tarefa.");
    } else {
      listaTarefas.removeChild(itemLista);
      salvarTarefas();
    }
  });

  // Evento para editar tarefa
  botaoEditar.addEventListener("click", function () {
    if (tarefaEditando) {
      alert("Conclua a edição atual antes de editar outra tarefa.");
    } else {
      entradaTarefa.value = itemLista.firstChild.textContent;
      tarefaEditando = itemLista;
      tarefaEditando.classList.add("editando");
      botaoAdicionar.textContent = "Editar";
    }
  });
}

function salvarTarefas() {
  let tarefas = [];

  listaTarefas.querySelectorAll("li").forEach(function (item) {
    const textoTarefa = item.firstChild.textContent.trim();
    tarefas.push(textoTarefa);
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(criarElementoTarefa);
}
