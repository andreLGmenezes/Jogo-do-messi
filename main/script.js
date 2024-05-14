var tela;
var ctx;
var cm;
var BO;
var corpo;
var fundo;
var campo;
var tamanho=3;
var bx;
var by;
var esquerda = false;
var direita = true;
var cima = false;
var baixo = false;
var valendo = true;    
var tp = 10;
var ale = 40; 
var velocidade=120;
var Vida =  false;
var Bateu = false;
var qntenergetico = 0;
var qntvida = 5;
var energetico;
var ex = [];
var ey = [];  
var x = [];
var y = [];
onkeydown = digito; 
start(); 

const audioFundo = new Audio("champions.mp3");
audioFundo.play();
audioFundo.loop = true;
audioFundo.playbackRate = 1;
const audioGol = new Audio("rede.mp3");
const audioMorte = new Audio("messi morre.WAV");
const audioEnd = new Audio("aposentou.mp3");
function start() {
    tela = document.getElementById("tela");
    ctx = tela.getContext("2d");
	campo = new Image();
	campo.src="campo.png";
	ctx.drawImage(campo,0,0,tela.width, tela.height);
    carregarImagens();
    droparbola();
	droparenergetico();
    setTimeout("jogorolando()", velocidade);
}    
function carregarImagens() {
    campo = new Image();
    campo.src="campo.png";
	cm = new Image();
    cm.src = "messi.png";    
    corpo = new Image();
    corpo.src = "ouro.png"; 
    BO = new Image();
    BO.src = "ouro.png"; 
	fundo = new Image();
    fundo.src = "bola de ouro.png";
	energetico = new Image();
    energetico.src = "vida.png";
}
function droparenergetico(){

    for(var i = 0; i < qntenergetico;i++){
        
        ex[i] = 10 + i * tp;
        ey[i] = 410;
    }
}
    for (var i = 0; i < tamanho; i++) {
        x[i] = 50 - i * tp;
        y[i] = 50;
    }
function droparbola() {
    var r = Math.floor(Math.random() * ale);
    bx = r * tp;

    r = Math.floor(Math.random() * ale);
    by = r * tp;
}    
function jogorolando() {
    if (valendo) {
		audioFundo.play();
        messicomeu();
        bateu();
        mover();
        aparecerimagem();
		chances();
        setTimeout("jogorolando()", velocidade);
    }
}
function chances(){


    if(qntvida == 0){
        valendo = false;
        fimDeJogo();
    }else{
        valendo = true;
    }

    if(Vida){
        qntvida++;
        console.log(qntvida);
        Vida = false;
        droparenergetico();
    }else if(Bateu){
        qntvida--;
        qntenergetico = 0;
        console.log(qntvida);
        Bateu = false;
    }

    
}
function messicomeu() {
    if ((x[0] == bx) && (y[0] == by)) {
        tamanho++;
		console.log(qntenergetico);
        if(qntvida < 5){
            qntenergetico++;
        }
        if(qntenergetico == 3){ 
            Vida = true; 
            qntenergetico = 0;
        }
		velocidade-=5;
		if(velocidade<40){
			velocidade=40;
		}
		audioGol.play();
        droparbola();
    }
}    
function bateu() {
    for (var z = tamanho; z > 0; z--) {
        if ((z > 3) && (x[0] == x[z]) && (y[0] == y[z])) {
			audioMorte.play();
            Bateu=true;
        }
    }
    if (y[0] >= tela.width) {
         y[0] = 0;
    }
    if (y[0] < 0) {
       y[0] = 400
    }
    if (x[0] >= tela.height) {
      x[0] = 0;
    }
    if (x[0] < 0) {
      x[0] = 400;
    }
}
function mover() {
    for (var z = tamanho; z > 0; z--) {
        x[z] = x[z-1];
        y[z] = y[z-1];
    }
    if (esquerda) {
        x[0] -= tp;
    }
    if (direita) {
        x[0] += tp;
    }
    if (cima) {
        y[0] -= tp;
    }
    if (baixo) {
        y[0] += tp;
    }
}    
function aparecerimagem() {
		ctx.clearRect(0, 0, tela.width, tela.height);
		ctx.fillRect(0, 0, tela.width, tela.height);
		ctx.drawImage(campo,0,0,tela.width, tela.height);
		
    if (valendo) {
        ctx.drawImage(BO, bx, by);
		ctx.drawImage(energetico, 10, 410);
		for(var v = 0; v < qntenergetico;v++){
        if(v == 0){
        ctx.drawImage(energetico,ex[v],ey[v]);
        }else{
        ctx.drawImage(energetico,ex[v],ey[v]);
        }
        }
		
        for (var z = 0; z < tamanho; z++) {
            if (z == 0) {
                ctx.drawImage(cm, x[z], y[z]);
            } else {
                ctx.drawImage(corpo, x[z], y[z]);
            }
        }    
    } else {
		audioMorte.play();
        fimDeJogo();
    }        
}
function fimDeJogo() {
	audioFundo.pause();
	ctx.drawImage(fundo,0,0,tela.width, tela.height);
    ctx.fillStyle = "red";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 18px serif";
    ctx.fillText("Messi se aposentou com "+tamanho+" bolas de ouro", tela.width/2.5, tela.height/2.5);
	audioEnd.play();
}
function digito(e) {
    var tecla = e.keyCode;
    if ((tecla == 37) && (!direita)) {
        esquerda = true;
        cima = false;
        baixo = false;
    }
    if ((tecla == 39) && (!esquerda)) {
        direita = true;
        cima = false;
        baixo = false;
    }
    if ((tecla == 38) && (!baixo)) {
        cima = true;
        direita = false;
        esquerda = false;
    }
    if ((tecla == 40) && (!cima)) {
        baixo = true;
        direita = false;
        esquerda = false;
    }        
}