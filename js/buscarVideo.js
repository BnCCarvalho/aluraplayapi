import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscaVideo(evento) {
  evento.preventDefault();

  const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
  const busca = await conectaApi.buscaVideo(dadosDePesquisa);

  const lista = document.querySelector("[data-lista]");

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  busca.forEach((elemento) =>
    lista.appendChild(
      constroiCard(
        elemento.titulo,
        elemento.descricao,
        elemento.url,
        elemento.imagem
      )
    )
  );

  if (busca.lenght == 0) {
    lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com esse termo.</h2>`;
  }
}

const botaoDePesquisa = document.querySelector("[data-bota-pesquisa]");

botaoDePesquisa.addEventListener("click", (evento) => buscaVideo(evento));
