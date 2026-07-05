
// Usa: Evento de clique, mudança de estilo dinâmica e alteração de conteúdo.

const btnNightMode = document.getElementById('toggle-night');
const bodyElement = document.getElementById('body-page');

btnNightMode.addEventListener('click', function() {
    
    // Alterna a classe 'night-mode' no body
    bodyElement.classList.toggle('night-mode');
    
    // Altera o texto do botão dependendo do modo ativo
    if (bodyElement.classList.contains('night-mode')) {
        btnNightMode.textContent = 'Amanhecer';
    } else {
        btnNightMode.textContent = 'Anoitecer';
    }
});



// Usa: Evento de clique, alteração de conteúdo (textContent) e remoção de elemento.

const btnSpoiler = document.getElementById('spoiler-btn');
const textSpoiler = document.getElementById('spoiler-text');

btnSpoiler.addEventListener('click', function() {
    // 1. Altera o conteúdo do parágrafo vazio
    textSpoiler.textContent = "Os monstros não correm! Eles andam lentamente, sempre sorrindo, e conhecem o nome das vítimas.";
    
    // 2. Muda o estilo via JS
    textSpoiler.style.color = "#e74c3c";
    textSpoiler.style.fontWeight = "bold";
    textSpoiler.style.fontSize = "18px";
    
    // 3. Remove o botão da tela para não ser clicado de novo
    btnSpoiler.remove();
});