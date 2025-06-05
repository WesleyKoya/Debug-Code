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
                title: "Escopo do log.",
                question: "Considerando o código na imagem, em JavaScript, com base no código, qual será o resultado da execução da função exemplo()?",
                image: "perguntas/pergunta1.PNG",
                options: [
                    { text: "Olá, Mundo!", correct: false },
                    { text: "undefined", correct: false },
                    { text: "É lançado um erro de referência (ReferenceError).", correct: true },
                    { text: "Imprime uma string vazia.", correct: false },
                    { text: "null", correct: false }
                ],
                explanation: "A variável mensagem foi declarada com let dentro de um bloco if, portanto, seu escopo é restrito a esse bloco. Ao tentar acessá-la fora dele, o JavaScript gera um erro ReferenceError, pois mensagem não existe no escopo da função inteira." 
            },
            {
                id: 2,
                title: "Propriedade CSS Incorreta",
                question: "No trecho de CSS acima, qual propriedade está incorreta para definir a cor do texto do link de navegação?",
                image: "https://raw.githubusercontent.com/WesleyKoya/Debug-Code/refs/heads/main/perguntas/pergunta2.png",
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
                title: "Erro de Sintaxe no laço 'for'.",
                question: "Considerando a sintaxe utilizada, o que será impresso no console?",
                image: "perguntas/pergunta5.png",
                options: [
                    { text: "10", correct: false },
                    { text: "0", correct: false },
                    { text: "4", correct: false },
                    { text: "ReferenceError: i is not defined", correct: true },
                    { text: "undefined", correct: false }
                ],
                explanation: "O ponto e vírgula após o for encerra o laço sem um bloco associado. O bloco { resultado += i; } está fora do for, e a variável i, declarada com let, só existe dentro do escopo do laço. Portanto, ao tentar usá-la fora, o código lança ReferenceError: i is not defined."
            },
            {
                id: 6,
                title: "Coerção de tipos em Estruturas Condicionais.",
                question: "Com base no comportamento do JavaScript em relação à coerção de tipos, qual será a saída no console?",
                image: "perguntas/pergunta6.png",
                options: [
                    { text: "Verdadeiro, pois string '0' é considerada valor truthy", correct: true },
                    { text: "Falso, pois é uma string vazia", correct: false },
                    { text: "Falso, pois o valor é zero", correct: false },
                    { text: "O código gera erro ao avaliar o if", correct: false },
                    { text: "Falso, pois strings não são convertidos em booleanos automaticamente", correct: false }
                ],
                explanation: "No JavaScript, uma string não vazia (mesmo com o valor igual a 0) é tratada como truthy, ou seja, é considerada verdadeira em uma estrutura condicional. Portanto, a condição do if é satisfeita e Verdadeiro será impresso no console."
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
                title: "Incrementação em JavaScript",
                question: "De acordo com a incrementação exposta no código, qual valor o console irá imprimir e a sua justificativa?",
                image: "perguntas/pergunta8.png",
                options: [
                    { text: "3, pois primeiro o valor é atribuido a y e só depois que ele é incrementado", correct: true },
                    { text: "4, pois ele já é associado a y incrementado", correct: false },
                    { text: "0, não é possível passar x para y", correct: false },
                    { text: "undefined, não foi possivel fazer a incrementação", correct: false },
                    { text: "1, pois a variável y inicia com 0 e é incrementada em seguida.", correct: false }
                ],
                explanation: "x++ primeiro atribui o valor a y e só depois incrementa. Então y = 3."
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
                title: "Soma em loop.",
                question: "Análise o código exposto, e responda: Qual o valor que será impresso pelo console?",
                image: "perguntas/pergunta10.png",
                options: [
                    { text: "3", correct: false },
                    { text: "6", correct: true },
                    { text: "5", correct: false },
                    { text: "0", correct: false },
                    { text: "1", correct: false }
                ],
                explanation: "A variável soma inicia em 0, e a i em 1, então, dada a condição, i <= 3, a soma acumulada de 1 + 2 + 3 = 6, que no final é o valor da variável soma."
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
                title: "Funções e Hoisting de Variáveis",
                question: "Analisando o código da imagem, o que irá acontecer ao executar esse código?",
                image: "perguntas/pergunta13.png",
                options: [
                    { text: "O console exibirá: 'Função atribuída a variável'", correct: false },
                    { text: "O valor undefined será impresso.", correct: false },
                    { text: "Será lançado um erro: 'teste' is not a function.", correct: true },
                    { text: "O código será executado normalmente, mas nada será impresso.", correct: false },
                    { text: "Um erro de sintaxe será gerado durante a execução.", correct: false }
                ],
                explanation: "A variável teste é içada (hoisting), mas sua atribuição como função só ocorre após a chamada. No momento em que teste() é executada, teste é undefined, o que leva ao erro teste is not a function."
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
                title: "Recursão com Pós-Decremento",
                question: "Analisando o código, que tem como objetivo de somar todos os números de n até 0 recursivamente, o que ocorrerá ao executar essa função com o valor 5?",
                image: "perguntas/pergunta15.png",
                options: [
                    { text: "O console imprimirá 15, somando corretamente os valores", correct: false },
                    { text: "O código entra em recursão infinita e gera um RangeError", correct: true },
                    { text: "O console imprime 0, ignorando os valores", correct: false },
                    { text: "O código imprime undefined.", correct: false },
                    { text: "O código imprime 5.", correct: false }
                ],
                explanation: " A chamada somaDecrescente(n--) utiliza o valor atual de n antes de decrementá-lo, ou seja, sempre envia o mesmo valor para a recursão. Isso causa uma chamada infinita da função até esgotar a pilha, resultando em RangeError: Maximum call stack size exceeded."
            },
             {
                id: 16,
                title: "Comparação com NaN.",
                question: "O desenvolvedor escreveu o seguinte código para verificar se uma variável contém NaN. Porém, o resultado impresso é 'Não é NaN', o que não era esperado. Como esse código pode ser corrigido corretamente?",
                image: "perguntas/pergunta16.png",
                options: [
                    { text: "Substituir a === NaN por a == NaN", correct: false },
                    { text: "Usar typeof a === 'number'", correct: false },
                    { text: "Substituir NaN por null na verificação", correct: false },
                    { text: "Usar parseInt(a) antes da comparação", correct: false },
                    { text: "Usar isNaN(a) ou Number.isNaN(a) no lugar da comparação", correct: true }
                ],
                explanation: "NaN === NaN sempre retorna false porque, por definição, NaN não é igual a si mesmo. A maneira correta de verificar se um valor é NaN é usar a função Number.isNaN(a) (mais segura) ou isNaN(a) (mais permissiva). Assim, o teste funcionará corretamente."
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
                title: "Escopo com var e setTimeout",
                question: "O programador deseja que o seguinte código imprima no console os números 0, 1 e 2, com um pequeno atraso entre cada impressão",
                image: "perguntas/pergunta19.png",
                options: [
                    { text: "Substituir var por let na declaração do for.", correct: true },
                    { text: "Colocar console.log(i) fora do setTimeout", correct: false },
                    { text: "Usar i = 0 fora do for, e reiniciar o laço dentro do setTimeout", correct: false },
                    { text: "Aumentar o tempo de espera para mais de 300ms", correct: false },
                    { text: "Adicionar return dentro do setTimeout para encerrar a função", correct: false }
                ],
                explanation: "O problema ocorre porque var tem escopo de função, não de bloco, fazendo com que o valor de i seja compartilhado em todas as execuções do setTimeout. Usar let cria um novo escopo de bloco para cada iteração do loop, garantindo que cada função dentro do setTimeout capture o valor correto de i."
            },
             {
                id: 20,
                title: "Redeclaração de Variáveis",
                question: "O seguinte trecho de código resulta em um erro de execução. Sabendo que a intenção do programador era apenas atualizar o valor da variável x, como o código pode ser corrigido corretamente?",
                image: "perguntas/pergunta20.png",
                options: [
                    { text: "Substituir let x = 10 por x = 10", correct: true },
                    { text: "Usar let nas duas declarações", correct: false },
                    { text: "Usar var nas duas declarações", correct: false },
                    { text: "Usar const x = 10 no lugar de let", correct: false },
                    { text: "Declarar x fora do bloco e remover a linha var x = 5", correct: false }
                ],
                explanation: "O erro ocorre porque x está sendo redeclared com let após já ter sido declarada com var, o que não é permitido no mesmo escopo. Para apenas atualizar o valor, basta usar x = 10, sem redeclaração" 
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
