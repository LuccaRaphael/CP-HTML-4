// Declara a variável tarefas no escopo global
const tarefas = [];

// Função para excluir uma tarefa da lista e atualizar a tabela
function excluirTarefa(index) {
    // Remove a tarefa da lista pelo índice especificado
    tarefas.splice(index, 1);
    // Atualiza a tabela para mostrar as tarefas restantes
    atualizarTabela();
}

// Função para atualizar a tabela com as tarefas da lista
function atualizarTabela() {
    // Pega o elemento da tabela
    const tabela = document.getElementById("tabela");
    // Define o conteúdo da tabela para incluir o cabeçalho da tabela
    tabela.innerHTML = "<tr><th>Descrição</th><th>Autor</th><th>Departamento</th><th>Importância</th><th>Valor</th><th>Duração</th><th></th></tr>";

    // Ordena a lista de tarefas por ordem decrescente de importância
    tarefas.sort(function(a, b) {
        return b.importancia - a.importancia;
    });

    // Adiciona cada tarefa à tabela
    for (let i = 0; i < tarefas.length; i++) {
        // Cria uma nova linha para a tabela
        const newRow = document.createElement("tr");
        // Adiciona os dados da tarefa à linha
        newRow.innerHTML = `<td>${tarefas[i].descricao}</td>
                            <td>${tarefas[i].autor}</td>
                            <td>${tarefas[i].departamento}</td>
                            <td>${tarefas[i].importancia}</td>
                            <td>${tarefas[i].valor}</td>
                            <td>${tarefas[i].duracao}</td>
                            <td><button onclick='excluirTarefa(${i})'>Excluir</button></td>`;
        // Adiciona a linha à tabela
        tabela.appendChild(newRow);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Quando o formulário for enviado, adiciona a tarefa à lista
    document.getElementById("form").addEventListener("submit", function(event){
        // Impede que a página seja recarregada
        event.preventDefault();
        
        // Pega os valores dos campos do formulário
        const descricao = document.getElementById("descricao").value;
        const importancia = document.getElementById("importancia").value;

        // Verifica se a descrição e a importância foram preenchidas
        if (descricao.trim() === "" || isNaN(importancia)) {
            alert("Por favor, preencha a descrição e a importância corretamente.");
            return; // Sai da função se não estiverem preenchidos corretamente
        }

        const autor = document.getElementById("autor").value;
        const departamento = document.getElementById("departamento").value;
        const valor = document.getElementById("valor").value;
        const duracao = document.getElementById("duracao").value;

        // Cria um objeto com os dados da tarefa
        const tarefa = {
            descricao: descricao,
            autor: autor,
            departamento: departamento,
            importancia: importancia,
            valor: valor,
            duracao: duracao
        };
        
        // Adiciona a tarefa à lista
        tarefas.push(tarefa);
        // Atualiza a tabela para mostrar a nova tarefa
        atualizarTabela();
        
        // Limpa o formulário
        document.getElementById("descricao").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("departamento").value = "";
        document.getElementById("importancia").value = "";
        document.getElementById("valor").value = "";
        document.getElementById("duracao").value = "";
    });

    // Quando a caixa de seleção "Vai Pagar Parte?" for alterada, mostra ou oculta os campos de valor e duração
    document.getElementById("pagarParte").addEventListener("change", function() {
        const valorDuracaoDiv = document.getElementById("valorDuracao");
        valorDuracaoDiv.style.display = this.checked ? "block" : "none";
    });
});
