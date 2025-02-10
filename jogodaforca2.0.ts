let palavraSecreta = "";
let tentativasRestantes = 6;
let letrasCertas: string[] = [];
let letrasTentadas: string[] = [];

const palavras = [
  "carro",
  "viagem",
  "escritor",
  "sonhar",
  "jaqueta",
  "floresta",
  "zero",
  "primeiro",
];
const forcaImgs = [
  "forca-6.png",
  "forca-5.png",
  "forca-4.png",
  "forca-3.png",
  "forca-2.png",
  "forca-1.png",
  "forca-0.png",
];

function escolherPalavra() {
  palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
  letrasCertas = Array(palavraSecreta.length).fill("_");
  letrasTentadas = [];
  tentativasRestantes = 6;
  atualizarEstado();
  const mensagemElem = document.getElementById("mensagem");
  if (mensagemElem) {
    mensagemElem.textContent = ""; // Limpa a mensagem
  }
}

function atualizarEstado() {
  const tentativasElem = document.getElementById("tentativas-restantes");
  if (tentativasElem) {
    tentativasElem.textContent = `Tentativas restantes: ${tentativasRestantes}`;
  }
  const letrasTentadasElem = document.getElementById("letras-tentadas");
  if (letrasTentadasElem) {
    letrasTentadasElem.textContent = `Letras tentadas: ${letrasTentadas.join(
      ", "
    )}`;
  }
  const palavraElem = document.getElementById("palavra");
  if (palavraElem) {
    palavraElem.textContent = letrasCertas.join(" ");
  }
  const forcaImgElem = document.getElementById("forca-img");
  if (forcaImgElem) {
    (forcaImgElem as HTMLImageElement).src = forcaImgs[tentativasRestantes];
  }
}

function verificarFimDeJogo() {
  if (!letrasCertas.includes("_")) {
    const mensagemElem = document.getElementById("mensagem");
    if (mensagemElem) {
      mensagemElem.textContent = "Parabéns! Você adivinhou a palavra!";
    }
    return true;
  }
  if (tentativasRestantes <= 0) {
    const mensagemElem = document.getElementById("mensagem");
    if (mensagemElem) {
      mensagemElem.textContent = `Você perdeu! A palavra era: ${palavraSecreta}.`;
    }
    return true;
  }
  return false;
}

function jogar() {
  const inputLetraElem = document.getElementById("input-letra");
  if (!inputLetraElem) {
    const mensagemElem = document.getElementById("mensagem");
    if (mensagemElem) {
      mensagemElem.textContent = "Erro: elemento de entrada não encontrado.";
    }
    return;
  }
  const inputLetra = (inputLetraElem as HTMLInputElement).value.toLowerCase();
  (inputLetraElem as HTMLInputElement).value = "";

  if (inputLetra.length !== 1 || !/[a-z]/i.test(inputLetra)) {
    const mensagemElem = document.getElementById("mensagem");
    if (mensagemElem) {
      mensagemElem.textContent = "Digite apenas uma letra.";
    }
    return;
  }

  if (letrasTentadas.includes(inputLetra)) {
    const mensagemElem = document.getElementById("mensagem");
    if (mensagemElem) {
      mensagemElem.textContent = "Você já tentou essa letra.";
    }
    return;
  }

  letrasTentadas.push(inputLetra);

  let letraCorreta = false;
  for (let i = 0; i < palavraSecreta.length; i++) {
    if (palavraSecreta[i] === inputLetra) {
      letrasCertas[i] = inputLetra;
      letraCorreta = true;
    }
  }

  if (!letraCorreta) {
    tentativasRestantes--;
    const mensagemElem = document.getElementById("mensagem");
    if (mensagemElem) {
      mensagemElem.textContent = "Letra incorreta!";
    }
  } else {
    const mensagemElem = document.getElementById("mensagem");
    if (mensagemElem) {
      mensagemElem.textContent = "Letra correta!";
    }
  }

  atualizarEstado();

  if (verificarFimDeJogo()) {
    setTimeout(escolherPalavra, 3000);
  }
}

escolherPalavra();
