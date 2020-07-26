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
    if (!this.colisao(0, 1, this.posicaoAtual)) {
        this.apaga();
        this.y++;
        this.desenha();
    } else {
        //travar a peça e gerar uma nova
    }
}

// funçao que move a peca para direita
Peca.prototype.moverParaDireita = function () {
    if (!this.colisao(1, 0, this.posicaoAtual)) {
        this.apaga();
        this.x++;
        this.desenha();
    } else { }
}

// funçao que move a peca para esquerda
Peca.prototype.moverParaEsquerda = function () {
    if (!this.colisao(-1, 0, this.posicaoAtual)) {
        this.apaga();
        this.x--;
        this.desenha();
    } else { }
}

// funçao que realiza a rotacao da peca 
Peca.prototype.rodar = function () {
    let proximaPosicao = this.formato[(this.posicao + 1) % this.formato.length];
    let chutar = 0;

    if (this.colisao(0, 0, proximaPosicao)) {
        if (this.x > COLUNAS / 2) {
            chutar = -1;
        } else {
            chutar = 1;
        }
    }

    if (!this.colisao(chutar, 0, proximaPosicao)) {
        this.apaga();
        this.x += chutar;
        this.posicao = (this.posicao + 1) % this.formato.length;
        this.posicaoAtual = proximaPosicao;
        this.desenha()
    } else { }
}

// Funções de colisões 
Peca.prototype.colisao = function (x, y, peca) {
    for (l = 0; l < peca.length; l++) {
        for (c = 0; c < peca.length; c++) {
            // se for vazia pula 
            if (!peca[l][c]) {
                continue;
            }
            //a peca depois de movida
            let novoX = this.x + c + x;
            let novoY = this.y + l + y;

            if (novoX < 0 || novoX >= COLUNAS || novoY >= LINHAS) {
                return true;
            }
            if (novoY < 0) {
                continue;
            }
            if (campo[novoY][novoX] != COR_VAZIA) {
                return true;
            }
        }
    }
    return false;
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
