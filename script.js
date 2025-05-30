document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        startButton: document.getElementById('startButton'),
        gameStart: document.getElementById('gameStart'),
        quizContainer: document.getElementById('quizContainer'),
        nextButton: document.getElementById('nextButton'),
        quizResult: document.getElementById('quizResult'),
        restartButton: document.getElementById('restartButton'),
        currentQuestion: document.getElementById('currentQuestion'),
        totalQuestions: document.getElementById('totalQuestions'),
        score: document.getElementById('score'),
        finalScore: document.getElementById('finalScore'),
        resultMessage: document.getElementById('resultMessage'),
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('optionsContainer'),
        codeSnippet: document.getElementById('codeSnippet'),
        gameContainer: document.getElementById('gameContainer'),
        explanationContainer: document.getElementById('explanationContainer'),
        explanationText: document.getElementById('explanationText')
    };

    if (!elements.startButton || !elements.quizContainer || !elements.optionsContainer) {
        console.error('Elementos essenciais do quiz não encontrados!');
        return;
    }

    const quizState = {
        currentQuestionIndex: 0,
        score: 0,
        totalQuestions: 0,
        questions: [],
        difficulty: '',
        maxScore: 0,
        questionPoints: []
    };

    function initQuiz() {
    
    }

    function createDifficultySelection() {
        const difficultyDiv = document.createElement('div');
        difficultyDiv.id = 'difficultySelection';
        difficultyDiv.className = 'difficulty-selection';
        difficultyDiv.innerHTML = `
            <h2>Escolha a Dificuldade</h2>
            <div class="difficulty-buttons">
                <button class="game-button" id="normalButton">
                    Normal
                    <i class="fas fa-star"></i>
                </button>
                <button class="game-button" id="advancedButton">
                    Avançado
                    <i class="fas fa-rocket"></i>
                </button>
            </div>
        `;
        elements.gameContainer.appendChild(difficultyDiv); 
        
        document.getElementById('normalButton').addEventListener('click', () => startGame('normal'));
        document.getElementById('advancedButton').addEventListener('click', () => startGame('advanced'));
    }

    function startGame(difficulty) {
        quizState.difficulty = difficulty;
        quizState.currentQuestionIndex = 0;
        quizState.score = 0;
        elements.score.textContent = quizState.score;
        
        if (difficulty === 'normal') {
            quizState.totalQuestions = 10;
            quizState.maxScore = 100;
            quizState.questionPoints = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        } else {
            quizState.totalQuestions = 20;
            quizState.maxScore = 100;
            quizState.questionPoints = [
                1, 1, 2, 3, 1, 3, 5, 5, 5, 6,
                6, 6, 7, 7, 7, 8, 10, 8, 1, 8
            ];
            quizState.maxScore = quizState.questionPoints.reduce((acc, curr) => acc + curr, 0);
        }
        
        elements.totalQuestions.textContent = quizState.totalQuestions;
        
        const difficultySelection = document.getElementById('difficultySelection');
        if (difficultySelection) {
            difficultySelection.classList.add('hidden');
            difficultySelection.addEventListener('transitionend', () => {
                difficultySelection.remove();
            }, { once: true });
        }

        elements.quizContainer.classList.remove('hidden');
        elements.quizContainer.classList.add('show');
        elements.gameStart.classList.add('hidden');
        
        loadQuestions();
        showQuestion();
    }

    function loadQuestions() {
        quizState.questions = [];
        
        const normalQuestions = [
            {
                id: 1,
                title: "Elemento Faltante",
                question: "No trecho de código HTML acima, qual tag está faltando para fechar corretamente o div com a classe logo-container?",
                image: "perguntas/pergunta1.png",
                options: [
                    { text: "&lt;/div&gt;", correct: true },
                    { text: "&lt;/header&gt;", correct: false },
                    { text: "&lt;/nav&gt;", correct: false },
                    { text: "&lt;/body&gt;", correct: false },
                    { text: "&lt;/html&gt;", correct: false }
                ],
                explanation: "A tag <div> foi aberta, mas não foi fechada. Para manter a estrutura HTML correta, é necessário adicionar a tag de fechamento </div> correspondente." 
            },
            {
                id: 2,
                title: "Propriedade CSS Incorreta",
                question: "No trecho de CSS acima, qual propriedade está incorreta para definir a cor do texto do link de navegação?",
                image: "perguntas/pergunta2.png",
                options: [
                    { text: "text-decoration", correct: false },
                    { text: "font-weight", correct: false },
                    { text: "colorLink", correct: true },
                    { text: "position", correct: false },
                    { text: "padding", correct: false }
                ],
                explanation: "A propriedade CSS correta para definir a cor do texto é color, não colorLink." 
            },
            {
                id: 3,
                title: "Meta Tag de Descrição",
                question: "Qual atributo define o conteúdo da descrição exibida em mecanismos de busca?",
                image: "perguntas/pergunta3.png",
                options: [
                    { text: "name", correct: false },
                    { text: "charset", correct: false },
                    { text: "property", correct: false },
                    { text: "content", correct: true },
                    { text: "rel", correct: false }
                ],
                explanation: "O atributo content armazena o texto descritivo que será exibido em resultados de busca. O name=description apenas identifica o tipo do metadado."
            },
            {
                id: 4,
                title: "Links de Navegação",
                question: "Qual link redireciona o usuário para a página do jogo?",
                image: "perguntas/pergunta4.png",
                options: [
                    { text: "#inicio", correct: false },
                    { text: "game.html", correct: true },
                    { text: "#sobre", correct: false },
                    { text: "index.html", correct: false },
                    { text: "#jogar", correct: false }
                ],
                explanation: "O atributo href=game.html aponta para um arquivo HTML externo, enquanto links com # são âncoras na mesma página."
            },
            {
                id: 5,
                title: "Erro de Sintaxe",
                question: "Qual erro impede o botão 'Acessar o jogo!' de funcionar corretamente?",
                image: "perguntas/pergunta5.png",
                options: [
                    { text: "Tag &lt;a&gt; aberta sem fechamento", correct: true },
                    { text: "Falta do atributo onclick no botão", correct: false },
                    { text: "Duplicação do link em href e data-href", correct: false },
                    { text: "Ausência do ícone Font Awesome", correct: false },
                    { text: "Uso incorreto de &lt;i&gt; dentro do botão", correct: false }
                ],
                explanation: "A tag <a> envolve o botão, mas não é fechada corretamente. O correto seria </a> após </button>. No código original, o fechamento está ausente, o que pode quebrar a estrutura."
            },
            {
                id: 6,
                title: "Seções da Página",
                question: "Qual seção NÃO é um link de navegação interna?",
                image: "perguntas/pergunta6.png",
                options: [
                    { text: "#inicio", correct: false },
                    { text: "game.html", correct: true },
                    { text: "#sobre", correct: false },
                    { text: "#devs", correct: false },
                    { text: "Todas são internas", correct: false }
                ],
                explanation: "#inicio, #sobre e #devs são âncoras que rolam para seções na mesma página. Já game.html carrega uma página externa."
            },
            {
                id: 7,
                title: "Acessibilidade e Semântica",
                question: "Qual recurso melhora a acessibilidade para usuários com deficiência visual?",
                image: "perguntas/pergunta7.png",
                options: [
                    { text: "Uso de &lt;i&gt; para ícones", correct: false },
                    { text: "Propriedade inexistente", correct: false },
                    { text: "Texto 'Início' após o ícone", correct: true },
                    { text: "Atributo href", correct: false },
                    { text: "Tag &lt;nav&gt;", correct: false }
                ],
                explanation: "Leitores de tela ignoram ícones Font Awesome (pois são vetores via CSS). O texto 'Início' descreve o link, tornando-o acessível. A tag <nav> define a área de navegação, mas não substitui textos descritivos." 
            },
            {
                id: 8,
                title: "Efeito de Gradiente no Header",
                question: "Em qual direção o gradiente do cabeçalho é aplicado?",
                image: "perguntas/pergunta8.png",
                options: [
                    { text: "Da esquerda para a direita", correct: true },
                    { text: "De cima para baixo", correct: false },
                    { text: "De baixo para cima", correct: false },
                    { text: "Diagonalmente", correct: false },
                    { text: "Radialmente", correct: false }
                ],
                explanation: " O valor to right na função linear-gradient especifica que o gradiente deve ser aplicado horizontalmente, da esquerda para a direita."
            },
            {
                id: 9,
                title: "Transformação no Efeito Hover",
                question: "Qual transformação é aplicada ao logo quando o mouse passa sobre ele?",
                image: "perguntas/pergunta9.png",
                options: [
                    { text: " Move-se 15px para direita e aumenta 10%", correct: false },
                    { text: "Inclina 15 graus e reduz tamanho em 10%", correct: false },
                    { text: "Rotaciona 15 graus e aumenta tamanho em 10%", correct: true },
                    { text: "Fica transparente e gira 90 graus", correct: false },
                    { text: "Desloca verticalmente e muda cor", correct: false }
                ],
                explanation: "As funções rotate(15deg) aplicam uma rotação de 15 graus e scale(1.1) aumenta o tamanho em 10%."
            },
            {
                id: 10,
                title: "Efeito em Botões Ativos",
                question: " O que acontece visualmente quando o botão é clicado (estado :active)?",
                image: "perguntas/pergunta10.png",
                options: [
                    { text: "O botão desce 2px e a sombra diminui", correct: true },
                    { text: "O botão sobe 2px e a sombra aumenta", correct: false },
                    { text: "O botão gira 5 graus e fica transparente", correct: false },
                    { text: "O botão muda de cor e aumenta de tamanho", correct: false },
                    { text: "O botão pisca e volta ao normal", correct: false }
                ],
                explanation: "translateY(2px) move o botão 2px para baixo, e a redução nos valores do box-shadow (de 0 6px 20px para 0 4px 15px) torna a sombra mais suave."
            }
        ];

        const advancedQuestions = [
            {
                id: 11,
                title: "Entendendo as Variáveis CSS",
                question: "O que a seção :root no código CSS acima faz?",
                image: "perguntas/pergunta11.png",
                options: [
                    { text: "Cria variáveis globais que podem ser reutilizadas em todo o CSS.", correct: true },
                    { text: "Define estilos específicos para o cabeçalho da página.", correct: false },
                    { text: "Altera a cor de fundo do corpo da página.", correct: false },
                    { text: "Define a fonte padrão para todo o documento.", correct: false },
                    { text: "É uma regra CSS inválida e não tem efeito.", correct: false }
                ],
                explanation: "A seção :root em CSS é um pseudo-seletor que se refere ao elemento raiz do documento (no caso de HTML, o elemento <html>). É comumente usado para declarar variáveis CSS personalizadas (propriedades personalizadas) com o prefixo --, que podem então ser acessadas e reutilizadas em todo o arquivo CSS usando a função var(), como visto em var(--text-color)."
            },
            {
                id: 12,
                title: "Ajustando o Posicionamento do Cabeçalho",
                question: "Se quisermos que o cabeçalho .header não permaneça fixo na parte superior da tela ao rolar a página, qual propriedade CSS deve ser alterada ou removida do código abaixo?",
                image: "perguntas/pergunta12.png",
                options: [
                    { text: "padding", correct: false },
                    { text: "display", correct: false },
                    { text: "position", correct: true },
                    { text: "box-shadow", correct: false },
                    { text: "z-index", correct: false }
                ],
                explanation: " A propriedade position: fixed; faz com que o elemento seja posicionado em relação à viewport, o que significa que ele permanece no mesmo lugar mesmo quando a página é rolada. Para que ele não seja fixo, essa propriedade deve ser removida ou alterada para static (o valor padrão) ou relative."
            },
             {
                id: 13,
                title: "Erro na Estilização do Botão",
                question: "O designer deseja que, ao passar o mouse sobre o botão .game-button, o brilho do box-shadow seja mais suave e menos intenso. Qual das seguintes alterações no código CSS abaixo não ajudaria a atingir esse objetivo?",
                image: "perguntas/pergunta13.png",
                options: [
                    { text: "Reduzir o valor 12px para 8px no box-shadow de :hover.", correct: false },
                    { text: "Diminuir o valor 25px para 15px no box-shadow de :hover.", correct: false },
                    { text: "Alterar o valor 0.6 para 0.3 na cor rgba do box-shadow de :hover.", correct: false },
                    { text: " Mudar transform: translateY(-5px); para transform: translateY(-2px); no :hover.", correct: true },
                    { text: "Ajustar o valor 0 6px 20px para 0 3px 10px no box-shadow da propriedade original do .game-button.", correct: false }
                ],
                explanation: "A opção altera apenas a translação vertical do botão ao passar o mouse, não tendo impacto na intensidade ou suavidade do box-shadow. As outras opções afetam diretamente as propriedades do box-shadow, que controlam o brilho e a intensidade da sombra."
            },
             {
                id: 14,
                title: "Comportamento do Link de Navegação",
                question: " Considere o código CSS para .nav-link e .nav-link::after. O que ocorre com o sublinhado do link de navegação quando o cursor do mouse passa sobre ele?",
                image: "perguntas/pergunta14.png",
                options: [
                    { text: "Um sublinhado branco surge de 0% de largura para 100% de largura, com uma transição suave.", correct: true },
                    { text: "Um sublinhado azul aparece de repente.", correct: false },
                    { text: "O sublinhado existente muda de cor para branco.", correct: false },
                    { text: "O link de navegação se move para baixo e o sublinhado desaparece.", correct: false },
                    { text: "Nenhuma alteração ocorre no sublinhado, apenas a cor do texto.", correct: false }
                ],
                explanation: "O pseudo-elemento ::after cria um elemento 'sublinhado' com height: 2px e background: white. Inicialmente, width: 0; o torna invisível. Quando o mouse passa sobre o link (.nav-link:hover::after), a largura (width) é definida para 100%. A propriedade transition: width 0.3s ease; no ::after garante que essa mudança de largura ocorra suavemente, criando um efeito de sublinhado que se expande."
            },
             {
                id: 15,
                title: "Resposta Responsiva do Cabeçalho",
                question: "Analisando as regras CSS para .header e o bloco @media (max-width: 768px), qual é a principal mudança no layout do cabeçalho quando a largura da tela é menor ou igual a 768 pixels?",
                image: "perguntas/pergunta15.png",
                options: [
                    { text: "Os itens dentro do cabeçalho se organizam em uma coluna, e o preenchimento horizontal é reduzido.", correct: true },
                    { text: "O cabeçalho se torna completamente invisível.", correct: false },
                    { text: "O cabeçalho mantém seu layout horizontal, mas as margens internas são reduzidas.", correct: false },
                    { text: "A cor de fundo do cabeçalho muda para um tom mais claro.", correct: false },
                    { text: "O cabeçalho perde sua posição fixa e rola com o conteúdo da página.", correct: false }
                ],
                explanation: " Dentro do @media (max-width: 768px), a propriedade flex-direction: column; é aplicada ao .header. Isso faz com que os itens flexíveis (como o logo e os links de navegação) se empilhem verticalmente, em vez de ficarem lado a lado. Além disso, o padding: 15px 20px; reduz o preenchimento horizontal de 40px para 20px. As outras alternativas não são verdadeiras com base no código fornecido."
            },
             {
                id: 16,
                title: "Entendendo o game-button",
                question: "Considerando as propriedades transition aplicadas ao .game-button e .game-button .button-icon, qual das seguintes afirmações sobre o comportamento de transição ao passar o mouse sobre o botão é a mais precisa e completa?",
                image: "perguntas/pergunta16.png",
                options: [
                    { text: "Apenas a cor de fundo do botão e o box-shadow terão uma transição suave de 0.3s.", correct: false },
                    { text: "O botão terá uma transição de transform e box-shadow, e o ícone interno terá uma transição de transform ao mesmo tempo.", correct: true },
                    { text: "Somente o ícone interno fará a transição de seu transform, enquanto o botão principal terá uma transição instantânea de transform e box-shadow.", correct: false },
                    { text: "A transição de 0.3s afeta todas as propriedades que mudam no :hover para o botão e o ícone, mas o transform do ícone é independente.", correct: false },
                    { text: "O transform do botão e do ícone são os únicos elementos que terão transição, ignorando outras propriedades alteradas.", correct: false }
                ],
                explanation: "O .game-button possui transition: all 0.3s ease;, o que significa que qualquer propriedade que mude em seu estado :hover (como transform e box-shadow) fará a transição. Paralelamente, .game-button .button-icon tem sua própria transition: transform 0.3s ease;, garantindo que o transform do ícone também faça a transição ao passar o mouse sobre o botão pai."
            },
             {
                id: 17,
                title: "Análise de Cores e Hierarquia Visual",
                question: "Pergunta: Dada a definição das variáveis CSS e seu uso, qual a implicação da escolha de var(--dark-bg) e var(--darker-bg) para o body e var(--primary-color) e var(--secondary-color) para a seção .inicio em termos de design e coesão visual?",
                image: "perguntas/pergunta17.png",
                options: [
                    { text: "O body usa tons mais claros e a seção .inicio usa tons mais escuros, criando um contraste para destaque.", correct: false },
                    { text: "Ambas as áreas usam gradientes com cores predominantemente azuis, garantindo coesão, mas com dark-bg e darker-bg sendo tons mais profundos que primary-color e secondary-color.", correct: true },
                    { text: "As cores do body são completamente independentes das cores usadas no .inicio, não havendo relação entre elas.", correct: false },
                    { text: "O dark-bg e primary-color são idênticos, o que anula o efeito do gradiente no header.", correct: false },
                    { text: "O uso de gradientes é inconsistente entre o body e o .inicio, prejudicando a estética geral.", correct: false }
                ],
                explanation: "var(--dark-bg) é #3a7bd5, que é igual a var(--secondary-color). var(--primary-color) é #1a2a6c. O body usa var(--dark-bg) e var(--darker-bg) (#0a161b), enquanto o .inicio usa var(--primary-color) e var(--secondary-color). Todas essas cores são tons de azul, com darker-bg sendo o mais escuro, criando uma paleta de cores coesa com variações de azul para os planos de fundo e seções principais." 
            },
             {
                id: 18,
                title: "Efeitos de Pseudoelementos e Usabilidade",
                question: "O seletor .nav-link::after cria um efeito de sublinhado animado ao passar o mouse. Se, por algum motivo, a propriedade overflow: hidden; fosse adicionada ao .nav-link, mas o position: relative; fosse acidentalmente removido do .nav-link, qual seria o impacto mais provável e problemático no comportamento visual e na usabilidade?",
                image: "perguntas/pergunta18.png",
                options: [
                    { text: "O sublinhado aparecerá, mas seu posicionamento pode ser inesperado, possivelmente alinhado à borda do body ou de um ancestral posicionado, e não ao nav-link.", correct: true },
                    { text: "O sublinhado aparecerá instantaneamente sem transição.", correct: false },
                    { text: "O sublinhado não será visível de forma alguma, pois estará fora do fluxo do nav-link.", correct: false },
                    { text: "O transform: translateY(-2px) no :hover do .nav-link deixaria de funcionar.", correct: false },
                    { text: "O ícone dentro do nav-link seria recortado pelo overflow: hidden;.", correct: false }
                ],
                explanation: "A remoção de position: relative rompe o vínculo de posicionamento do ::after com o .nav-link, fazendo com que o sublinhado animado perca sua referência espacial. Isso resulta em um posicionamento imprevisível e prejudica a usabilidade, pois o feedback visual não acompanhará o elemento interativo. O overflow: hidden não mitiga o problema, pois não afeta elementos fora do contexto do container."
            },
             {
                id: 19,
                title: "Entendendo a Estrutura de Navegação",
                question: "No cabeçalho (header) do HTML, qual é o propósito do elemento <a> com a classe nav-link que contém o ícone fas fa-home?",
                image: "perguntas/pergunta19.png",
                options: [
                    { text: " Ele exibe um ícone de casa e funciona como um link de navegação para a página inicial (index.html).", correct: true },
                    { text: "Ele cria um link para a seção 'Jogar' da página.", correct: false },
                    { text: "Ele define o logotipo principal do site", correct: false },
                    { text: "Ele é um contêiner para todos os links de navegação.", correct: false },
                    { text: "Ele apenas exibe texto sem funcionalidade de link.", correct: false }
                ],
                explanation: " O elemento <a> com href='index.html' e a classe nav-link é um link de navegação. A presença do ícone <i class='fas fa-home'></i> e do texto 'Início' indica claramente que ele serve como um atalho para a página inicial."
            },
             {
                id: 20,
                title: "Compreendendo a Estrutura Dinâmica do Quiz",
                question: "Qual é o objetivo principal dos elementos div com os IDs codeSnippet, questionText, e optionsContainer dentro do quiz-container, e como eles provavelmente funcionam em conjunto para apresentar um desafio de depuração ao usuário?",
                image: "perguntas/pergunta20.png",
                options: [
                    { text: "codeSnippet é onde o usuário digita seu código, questionText exibe a pontuação atual, e optionsContainer são as respostas digitadas.", correct: false },
                    { text: "codeSnippet exibe um trecho de código com um erro, questionText apresenta a descrição do problema, e optionsContainer mostra as possíveis correções para o usuário escolher.", correct: true },
                    { text: "codeSnippet é para carregar imagens, questionText para vídeos, e optionsContainer para áudios.", correct: false },
                    { text: "Todos esses elementos são usados para exibir o resultado final do quiz, sem interação do usuário.", correct: false },
                    { text: "Eles são apenas placeholders para o conteúdo do rodapé do site.", correct: false }
                ],
                explanation: "A estrutura do quiz-container indica que ele é o coração da interação com o quiz. codeSnippet dentro de question-code é ideal para exibir um trecho de código. questionText é o local lógico para a pergunta ou descrição do bug. Por fim, optionsContainer é o contêiner para as alternativas de resposta, permitindo ao usuário selecionar a correção. A presença de um explanation-container e um botão 'Próxima Pergunta' reforça a ideia de um fluxo de perguntas e respostas dinâmico, típico de um quiz de depuração." 
            },
        ];

        if (quizState.difficulty === 'normal') {
            quizState.questions = [...normalQuestions];
        } else {
            quizState.questions = [...normalQuestions, ...advancedQuestions];
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }

   elements.startButton.addEventListener('click', () => {
    elements.gameStart.classList.add('hidden');
    
    if (!document.getElementById('difficultySelection')) {
        createDifficultySelection();
    }
});
    
    elements.nextButton.addEventListener('click', nextQuestion);
    elements.restartButton.addEventListener('click', restartQuiz);

    function showQuestion() {
        resetQuestionState();
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        
        elements.currentQuestion.textContent = quizState.currentQuestionIndex + 1;
        
        elements.questionText.innerHTML = `
            <h2 class="question-title">${currentQuestion.title}</h2>
            <div class="question-content">${currentQuestion.question}</div>
        `;
        
        elements.codeSnippet.innerHTML = `
            <img src="${currentQuestion.image}" alt="Código da questão ${currentQuestion.id}" class="question-image">
        `;
        
        elements.optionsContainer.innerHTML = '';
        
        const shuffledOptions = shuffleArray([...currentQuestion.options]);
        
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'option-btn';
            optionElement.dataset.correct = option.correct;
            optionElement.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option.text}</span>
            `;
            
            optionElement.addEventListener('click', () => handleOptionClick(optionElement, option));
            elements.optionsContainer.appendChild(optionElement);
        });
    }

    function handleOptionClick(selectedElement, option) {
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
        
        if (option.correct) {
            selectedElement.classList.add('correct');
            
            const points = quizState.questionPoints[quizState.currentQuestionIndex];
            quizState.score += points;
            
            elements.score.textContent = quizState.score;
            elements.score.classList.add('score-updated');
            setTimeout(() => elements.score.classList.remove('score-updated'), 500);
        } else {
            selectedElement.classList.add('incorrect');
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                }
            });
        }
        
        if (currentQuestion.explanation) {
            elements.explanationText.textContent = currentQuestion.explanation;
            elements.explanationContainer.classList.remove('hidden');
        }

        if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
            elements.nextButton.classList.remove('hidden');
        } else {
            setTimeout(showResults, 1000);
        }
    }

    function nextQuestion() {
        quizState.currentQuestionIndex++;
        if (quizState.currentQuestionIndex < quizState.totalQuestions) {
            showQuestion();
        } else {
            showResults(); 
        }
    }

    function showResults() {
        elements.nextButton.classList.add('hidden');
        elements.quizContainer.classList.add('hidden');
        elements.quizContainer.classList.remove('show');

        setTimeout(() => {
            elements.quizResult.classList.remove('hidden');
            elements.quizResult.classList.add('show');
            elements.finalScore.textContent = quizState.score;
            
            let message = "";
            let resultClass = "";
            
            if (quizState.score === quizState.maxScore) {
                message = "🏆 VOCÊ É O DEBUG MASTER! 🏆 Perfeição absoluta! Nenhum bug escapou de você!";
                resultClass = "excellent";
                createConfetti();
            } else if (quizState.score >= (quizState.maxScore * 0.8)) {
                message = "🎉 Excelente! Quase perfeito! Debugging nível expert!";
                resultClass = "excellent";
            } else if (quizState.score >= (quizState.maxScore * 0.6)) {
                message = "👏 Muito bom! Ótimo domínio das técnicas de debugging!";
                resultClass = "good";
            } else if (quizState.score >= (quizState.maxScore * 0.4)) {
                message = "✨ Bom trabalho! Continue praticando para melhorar!";
                resultClass = "average";
            } else if (quizState.score >= (quizState.maxScore * 0.2)) {
                message = "💪 Está progredindo! Revise os conceitos e tente novamente!";
                resultClass = "average";
            } else {
                message = "🤔 Hora de estudar! Revise os fundamentos e tente novamente!";
                resultClass = "poor";
            }
            
            elements.resultMessage.textContent = message;
            elements.quizResult.classList.add(resultClass);
            
            elements.restartButton.innerHTML = `
                <i class="fas fa-redo"></i> Nova Tentativa
            `;
        }, 500);
    }

    function restartQuiz() {
        elements.quizResult.classList.add('hidden');
        elements.quizResult.classList.remove('show');
        elements.quizResult.className = 'quiz-result hidden';
        
        setTimeout(() => {
            document.getElementById('difficultySelection')?.remove();
            createDifficultySelection();
            const difficultySelection = document.getElementById('difficultySelection');
            if (difficultySelection) {
                difficultySelection.classList.remove('hidden');
            }
        }, 500);
    }

    function resetQuestionState() {
        elements.nextButton.classList.add('hidden');
        elements.explanationContainer.classList.add('hidden');
        elements.explanationText.textContent = '';
    }

    initQuiz();
});