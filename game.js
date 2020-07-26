// Pegando o elemento Canvas
var canvas = document.getElementById("tetris");
// Pegando o Contexto do Canvas para manipulação
var ctx = canvas.getContext("2d");
// Constante do tamanho de um quadrado do jogo
const TQ = 20;
// propriedades do jogo,Numero de linhas, colunas, cor de fundo
const COLUNAS = 10;
const LINHAS = 20;
const COR_VAZIA = "gray";

//Variavel que controla o Campo guardando as posições de todas as peças
let campo = iniciaCampo();

const FORMATO_Z = [[
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
],
[
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
],
[
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
],
[
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0]
]
];

const FORMATO_S = [[
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
],
[
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
],
[
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
],
[
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
]
];

const FORMATO_J = [[
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
],
[
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
],
[
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
],
[
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
]
];

const FORMATO_L = [[
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
],
[
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
],
[
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
],
[
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
]
];

const FORMATO_T = [[
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
],
[
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
],
[
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
],
[
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
]
];

const FORMATO_I = [[
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
],
[
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
],
[
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
],
[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
]
];

const FORMATO_O = [[
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
],
[
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
],
[
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
],
[
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
]
];


//Constante que tem todos os formatos possiveis das peças do jogo
const PECAS = [
    [FORMATO_Z, "blue"],
    [FORMATO_S, "green"],
    [FORMATO_J, "red"],
    [FORMATO_L, "yellow"],
    [FORMATO_T, "purple"],
    [FORMATO_I, "pink"],
    [FORMATO_O, "orange"],
];


function Peca(formato, cor) {
    this.cor = cor;
    this.formato = formato;
    this.posicao = 0; // isto indica que a peca comeca na direcao padrao
    this.posicaoAtual = this.formato[this.posicao];
    this.x = 3;
    this.y = 2;
}

Peca.prototype.preencher = function (cor) {
    for (l = 0; l < this.posicaoAtual.length; l++) {
        for (c = 0; c < this.posicaoAtual.length; c++) {
            if (this.posicaoAtual[l][c]) {
                desenhaQuadrado(this.x + c, this.y + l, cor);
            }
        }
    }
}


// Funcao que desenha a peca na tela
Peca.prototype.desenha = function () {
    this.preencher(this.cor);
}

//funcao que apaga a peca na tela
Peca.prototype.apaga = function () {
    this.preencher(COR_VAZIA);
}


// funçao que move a peca para baixo
Peca.prototype.moverParaBaixo = function () {
    this.apaga();
    this.y++;
    this.desenha();
}

// funçao que move a peca para direita
Peca.prototype.moverParaDireita = function () {
    this.apaga();
    this.x++;
    this.desenha();
}

// funçao que move a peca para esquerda
Peca.prototype.moverParaEsquerda = function () {
    this.apaga();
    this.x--;
    this.desenha();
}

// funçao que realiza a rotacao da peca 
Peca.prototype.rodar = function () {
    this.apaga();
    this.posicao = (this.posicao + 1) % this.formato.length;
    this.posicaoAtual = this.formato[this.posicao];
    this.desenha();
}

// Controle da movimentacao da da peca 
document.addEventListener("keydown", CONTROLE);

function CONTROLE(event) {
    if (event.keyCode == 37) {
        p.moverParaEsquerda();
        tempoInicial = Date.now();
    } else if (event.keyCode == 38) {
        p.rodar();
        tempoInicial = Date.now();
    } else if (event.keyCode == 39) {
        p.moverParaDireita();
        tempoInicial = Date.now();
    } else if (event.keyCode == 40) {
        p.moverParaBaixo();
    }
}


let p = new Peca(PECAS[0][0], PECAS[0][1])

let tempoInicial = Date.now();
function cair() {
    let tempoAtual = Date.now();
    let delta = tempoAtual - tempoInicial;

    if (delta > 1000) {
        p.moverParaBaixo();
        tempoInicial = Date.now();
    }
    requestAnimationFrame(cair);
}

/* 
    Descrição:Função inicia o Campo Vazio e retorna uma matriz de cores
    Utilidade: Iniciar o Campo vazio, pode ser utilizado para limpar o campo
*/
function iniciaCampo() {
    campoVazio = [];

    for (var l = 0; l < LINHAS; l++) {
        campoVazio[l] = [];
        for (var c = 0; c < COLUNAS; c++)
            campoVazio[l][c] = COR_VAZIA;
    }
    return campoVazio;
}

/*
    Descrição: Percorre o Campo Desenhano nele a respectiva cor
    Utilidade: Atualizar o campo na tela
*/
function desenhaCampo() {
    for (var l = 0; l < LINHAS; l++) {
        for (var c = 0; c < COLUNAS; c++)
            desenhaQuadrado(c, l, campo[l][c]);
    }
}

/*
    Descrição: Desenha uma cor no quadrado espeficidado pelos parametros
    Utilidade: Auxilia atualizar o campo na tela e a criar as peças
*/
function desenhaQuadrado(x, y, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x * TQ, y * TQ, TQ, TQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * TQ, y * TQ, TQ, TQ);
}

desenhaCampo();
p.desenha();
cair();
