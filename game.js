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

//Constante que tem todos os formatos possiveis das peças do jogo
const FORMATOS_DE_PEÇAS = [FORMATO_Z, FORMATO_S]

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


function Peça(formato, cor) {
    this.cor = cor;
    this.formato = formato;
    this.posição = 0;
    this.posiçãoAtual = this.formato[this.posição];
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
