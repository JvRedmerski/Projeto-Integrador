const input = document.getElementById("clienteInput");
const datalist = document.getElementById("clientes");

input.addEventListener("input", function () {
    const termo = input.value;

    if (termo.length < 2) {
        datalist.innerHTML = ""; // evita chamadas desnecessárias
        return;
    }

    fetch(`/api/clientes?termo=${encodeURIComponent(termo)}`)
        .then(res => res.json())
        .then(data => {
            datalist.innerHTML = "";
            data.forEach(nome => {
                const option = document.createElement("option");
                option.value = nome;
                datalist.appendChild(option);
            });
        });
});