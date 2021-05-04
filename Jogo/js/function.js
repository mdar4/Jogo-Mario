var engine = {
    "cores": ['green', 'purple', 'red', 'yellow', 'black', 'orange','grey','blue','pink']
    ,"hexadecimais":{
        'green': '#02ef00',
        'purple': '#790093',
        'red':'#e90808',
        'yellow': '#e7d703',
        'black': '#141414',
        'orange':'#f16529',
        'grey': '#ebebeb',
        'blue': '#0000ff',
        'pink': '#f02a7e',
    },
    "moedas":0
}

const audioMoeda = new Audio('/jogo-mario/audio/moeda.mp3');
const audioErrou = new Audio('/jogo-mario/audio/errou.mp3');

function sortearCor(){
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = engine.cores[indexCorSorteada].toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor){
    var caixaDasCores = document.getElementById("cor-atual");
    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage= "url('/jogo-mario/img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById("pontuacao-atual");

    engine.moedas +=valor;

    if(valor <0){
        audioErrou.play();
    }else{
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}
aplicarCorNaCaixa(sortearCor());

//API de reconhecimento de voz//
var respostaCorreta= "";
var btoGravador = document.getElementById("responder");
var transcricaoAudio = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function(){
        btoGravador.innerText = "Estou ouvindo";
        btoGravador.style.backgroundColor = "white";
        btoGravador.style.color = "black";
    }

    gravador.onend = function(){
        btoGravador.innerText = "Responder";
        btoGravador.style.backgroundColor = "transparent";
        btoGravador.style.color = "white";
    }

    gravador.onresult = function(event){
        transcricaoAudio = event.results[0][0].transcript;
        respostaCorreta = document.getElementById("cor-na-caixa").innerText.toUpperCase();
        
        if(transcricaoAudio === repostaCorreta){
            atualizarPontuacao(1);
        }else{
            atualizarPontuacao(-1);
        }
        aplicarCorNaCaixa(sortearCor());
    }

}else{
    alert("Não possui suporte");
}

btoGravador.addEventListener('click',function(){
    gravador.start();
})