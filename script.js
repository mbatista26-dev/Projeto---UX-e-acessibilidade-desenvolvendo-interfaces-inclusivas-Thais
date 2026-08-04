// CONTROLE DO MODAL DE EMERGÊNCIA
const btnAjuda = document.querySelector(".botao-ajuda");
const btnFechar = document.querySelector(".botao-fechar");
const modal = document.querySelector(".modal-fundo");

btnAjuda.addEventListener("click", () => {
    modal.style.display = "block";
});

btnFechar.addEventListener("click", () => {
    modal.style.display = "none";
});

// FECHAR MODAL AO CLICAR FORA DELE
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// CONTROLE DO TAMANHO DA FONTE
let tamanhoFonteAtual = 100; // Usa porcentagem para melhor acessibilidade
const passo = 10;

const btnAumentaFonte = document.getElementById("btnAumentaTexto");
const btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

btnAumentaFonte.addEventListener("click", () => {
    if (tamanhoFonteAtual < 150) {
        tamanhoFonteAtual += passo;
        document.body.style.fontSize = `${tamanhoFonteAtual}%`;
    }
});

btnDiminuiFonte.addEventListener("click", () => {
    if (tamanhoFonteAtual > 80) {
        tamanhoFonteAtual -= passo;
        document.body.style.fontSize = `${tamanhoFonteAtual}%`;
    }
});

// SÍNTESE DE VOZ (LEITURA DE TELA)
let lendo = false;
const btnLeitura = document.querySelector(".botao-leitura");

btnLeitura.addEventListener("click", lerEmVozAlta);

function lerEmVozAlta() {
    if (lendo) {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
            btnLeitura.textContent = "⏸️ Pausar Leitura";
        } else {
            speechSynthesis.pause();
            btnLeitura.textContent = "▶️ Continuar Leitura";
        }
        return;
    }

    const conteudo = document.querySelector("main");
    const texto = conteudo.innerText;

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = 0.95; // Velocidade levemente reduzida para maior clareza

    fala.onend = finalizarLeitura;
    fala.onerror = finalizarLeitura;

    lendo = true;
    btnLeitura.textContent = "⏸️ Pausar Leitura";

    speechSynthesis.cancel(); // Limpa falas anteriores da fila
    speechSynthesis.speak(fala);
}

function finalizarLeitura() {
    lendo = false;
    btnLeitura.textContent = "🔊 Ouvir Página";
}