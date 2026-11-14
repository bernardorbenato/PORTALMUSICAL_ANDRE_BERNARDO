
/* Carrossel — André. As URLs permanecem válidas enquanto houver navegação. */
const fotos = ["img/blond - album.jpg", "img/asap - album.jpg", "img/orange - album.jpg", "img/IGOR - album.jpg"];
const legendas = ["Frank Ocean - Blond (2016)", "A$AP Rocky - LIVE.LOVE.A$AP (2011)", "Frank Ocean - channel ORANGE (2012)", "Tyler, The Creator - IGOR (2019)"];
let posicao = 0;
function atualizarCarrossel() {
    const imagem = document.getElementById("andre_carrossel_img");
    imagem.src = fotos[posicao];
    imagem.alt = legendas[posicao];
    document.getElementById("andre_carrossel_legenda").textContent = legendas[posicao];
    document.getElementById("andre_carrossel_contador").textContent = "Item " + (posicao + 1) + " de " + fotos.length;
}
document.getElementById("andre_btn_prox").onclick = function () {
    posicao = (posicao + 1) % fotos.length;
    atualizarCarrossel();
};
document.getElementById("andre_btn_ant").onclick = function () {
    posicao = (posicao - 1 + fotos.length) % fotos.length;
    atualizarCarrossel();
};
document.getElementById("andre_btn_add_carrossel").onclick = function () {
    const campo = document.getElementById("andre_nova_legenda_carrossel");
    const entrada = document.getElementById("andre_nova_imagem_carrossel");
    const arquivo = entrada.files[0];
    const legenda = campo.value.trim();
    if (!legenda || !arquivo) alert("Escolha uma imagem e escreva uma legenda.");
    else if (!arquivo.type.startsWith("image/")) alert("O arquivo deve ser uma imagem.");
    else {
        fotos.push(URL.createObjectURL(arquivo));
        legendas.push(legenda);
        posicao = fotos.length - 1;
        atualizarCarrossel();
        campo.value = "";
        entrada.value = "";
    }
};
atualizarCarrossel();

/* Fila — André: cada item mantém seus elementos e eventos. */
const lista = document.getElementById("andre_lista_fila");
let filtroSelecionado = "todas";
const filtros = ["todas", "pendente", "ouvida"];
const botoesFiltro = ["andre_filtro_todas", "andre_filtro_pendentes", "andre_filtro_ouvidas"];
function atualizarFila() {
    let visiveis = 0;
    for (const item of lista.children) {
        item.hidden = filtroSelecionado !== "todas" && item.dataset.status !== filtroSelecionado;
        if (!item.hidden) visiveis++;
    }
    document.getElementById("andre_contador_fila").textContent = "Total: " + lista.children.length + " faixas | Visíveis: " + visiveis;
    for (let i = 0; i < filtros.length; i++) {
        const botao = document.getElementById(botoesFiltro[i]);
        const selecionado = filtros[i] === filtroSelecionado;
        botao.classList.toggle("andre_ativo", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
    }
}
function ativarItem(item) {
    const texto = item.querySelector(".andre_texto_musica");
    const status = item.querySelector(".andre_btn_status");
    status.onclick = function () {
        const ouvida = item.dataset.status === "pendente";
        item.dataset.status = ouvida ? "ouvida" : "pendente";
        item.classList.toggle("andre_ouvida", ouvida);
        status.textContent = ouvida ? "Marcar Pendente" : "Marcar Ouvida";
        atualizarFila();
    };
    item.querySelector(".andre_btn_editar").onclick = function () {
        const nome = prompt("Novo nome da música:", texto.textContent);
        if (nome !== null) {
            if (!nome.trim()) alert("Digite um nome para a música.");
            else texto.textContent = nome.trim();
        }
        atualizarFila();
    };
    item.querySelector(".andre_btn_remover").onclick = function () {
        item.remove();
        atualizarFila();
    };
}
for (const item of lista.children) ativarItem(item);
document.getElementById("andre_btn_add_fila").onclick = function () {
    const campo = document.getElementById("andre_input_musica");
    const nome = campo.value.trim();
    if (!nome) {
        alert("Digite o nome da música!");
        return;
    }
    const item = document.createElement("li");
    item.className = "andre_item_fila";
    item.dataset.status = "pendente";
    const texto = document.createElement("span");
    texto.className = "andre_texto_musica";
    texto.textContent = nome;
    const acoes = document.createElement("div");
    acoes.className = "andre_acoes_item";
    const tipos = ["status", "editar", "remover"];
    const rotulos = ["Marcar Ouvida", "Editar", "✕"];
    for (let i = 0; i < tipos.length; i++) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "andre_btn_acao andre_btn_" + tipos[i];
        botao.textContent = rotulos[i];
        acoes.append(botao);
    }
    item.append(texto, acoes);
    lista.append(item);
    ativarItem(item);
    campo.value = "";
    atualizarFila();
};
document.getElementById("andre_btn_limpar_fila").onclick = () => {
    lista.replaceChildren();
    atualizarFila();
};
for (let i = 0; i < filtros.length; i++) {
    document.getElementById(botoesFiltro[i]).onclick = function () {
        filtroSelecionado = filtros[i];
        atualizarFila();
    };
}
atualizarFila();

/* Modal — Bernardo: a URL é liberada ao fechar ou substituir a prévia. */
const modal = document.getElementById("bernardo_modal_container");
let urlModal = null;
function fecharModal() {
    modal.hidden = true;
    document.getElementById("bernardo_modal_img_exibicao").removeAttribute("src");
    if (urlModal !== null) URL.revokeObjectURL(urlModal);
    urlModal = null;
}
document.getElementById("bernardo_btn_abrir_modal").onclick = function () {
    const titulo = document.getElementById("bernardo_demo_titulo").value.trim();
    const artista = document.getElementById("bernardo_demo_artista").value.trim();
    const descricao = document.getElementById("bernardo_demo_descricao").value.trim();
    const arquivo = document.getElementById("bernardo_demo_arquivo").files[0];
    if (!titulo || !artista || !descricao || !arquivo) alert("Preencha título, artista e descrição e escolha uma imagem.");
    else if (!arquivo.type.startsWith("image/")) alert("O arquivo da capa deve ser uma imagem.");
    else {
        fecharModal();
        document.getElementById("bernardo_modal_titulo_exibicao").textContent = titulo;
        document.getElementById("bernardo_modal_artista_exibicao").textContent = artista;
        document.getElementById("bernardo_modal_desc_exibicao").textContent = descricao;
        urlModal = URL.createObjectURL(arquivo);
        const imagem = document.getElementById("bernardo_modal_img_exibicao");
        imagem.src = urlModal;
        imagem.alt = "Capa de " + titulo + " — " + artista;
        modal.hidden = false;
    }
};
document.getElementById("bernardo_btn_fechar_modal").onclick = fecharModal;
modal.onclick = function (evento) {
    if (evento.target === modal) fecharModal();
};

/* VIP — Bernardo: componentes locais evitam deslocamentos de fuso da data. */
function calcularIdade(dataTexto) {
    const partes = dataTexto.split("-").map(Number);
    if (partes.length !== 3 || partes[0] < 1) return null;
    const data = new Date(0);
    data.setFullYear(partes[0], partes[1] - 1, partes[2]);
    data.setHours(0, 0, 0, 0);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (data.getFullYear() !== partes[0] || data.getMonth() !== partes[1] - 1 || data.getDate() !== partes[2] || data > hoje) return null;
    let idade = hoje.getFullYear() - partes[0];
    if (hoje.getMonth() < partes[1] - 1 || (hoje.getMonth() === partes[1] - 1 && hoje.getDate() < partes[2])) idade--;
    return idade;
}
document.getElementById("bernardo_form_cadastro").onsubmit = function (evento) {
    evento.preventDefault();
    const form = document.getElementById("bernardo_form_cadastro");
    const campos = form.elements;
    const nome = campos.nome.value.trim();
    const email = campos.email.value.trim();
    const senha = campos.senha.value;
    const confirma = campos.confirma_senha.value;
    const idadeTexto = campos.idade.value;
    const horasTexto = campos.horas_musica.value;
    const idadeNascimento = calcularIdade(campos.nascimento.value);
    let erro = "";
    if (nome.length < 3) erro = "Digite um nome com pelo menos 3 caracteres.";
    else if (!email || campos.email.validity.typeMismatch) erro = "Digite um e-mail válido.";
    else if (!senha.trim() || senha.length < 6) erro = "A senha deve ter pelo menos 6 caracteres e não pode conter apenas espaços.";
    else if (confirma !== senha) erro = "A confirmação deve ser igual à senha.";
    else if (idadeTexto === "" || !Number.isInteger(Number(idadeTexto)) || Number(idadeTexto) < 12 || Number(idadeTexto) > 120) erro = "Digite uma idade inteira entre 12 e 120.";
    else if (idadeNascimento === null) erro = "Informe uma data de nascimento válida e não futura.";
    else if (idadeNascimento !== Number(idadeTexto)) erro = "A data de nascimento deve corresponder à idade informada.";
    else if (!campos.genero_fav.value) erro = "Escolha um gênero favorito.";
    else if (!campos.artista_fav.value.trim()) erro = "Informe seu artista favorito.";
    else if (horasTexto === "" || !Number.isFinite(Number(horasTexto)) || Number(horasTexto) < 1 || Number(horasTexto) > 24) erro = "Informe de 1 a 24 horas diárias.";
    else if (!campos.plano.value) erro = "Selecione um plano.";
    else if (!campos.perfil_url.value.trim() || campos.perfil_url.validity.typeMismatch) erro = "Digite uma URL válida para o perfil musical.";
    else if (!campos.bio_ouvinte.value.trim()) erro = "Preencha a biografia musical.";
    else if (!campos.termos.checked) erro = "Aceite os termos para concluir a demonstração.";
    else {
        alert("Validação concluída, " + nome + "! Esta é uma demonstração: nenhuma conta foi criada e nenhum dado foi enviado ou armazenado.");
        form.reset();
        return;
    }
    alert(erro);
};
