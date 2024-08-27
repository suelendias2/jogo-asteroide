//Empuxo Nave Parte 10
//suelen dias pereira
//Criando a classe Nave
//Criando a função giro()
//Adicinando imagem nave
//Adicionando força de empuxo
//Adicionando a função edges()
//Adicionando a classe Inimigo
//Implementando a classe Inimigo e Laser
//Implementando colisão
//Colisão com Inimigo e Placar
//Adicionando nave2
//Adicionando laserN2
//Implementando dano


let nave;
let nave2;
let naveIMG;
let nave2IMG;
let inimigoIMG;
let inimigo;
let inimigos = [];
let laserN1 = [];
let laserN2 = [];
let meusPontos = 0;
let pontosOponente = 0;

function preload(){
  naveIMG = loadImage('img/nave.png');
  nave2IMG = loadImage('img/nave2.png');
  inimigoIMG = loadImage('img/inimigo.png')
}

function setup() {
  createCanvas(400, 400);  
  nave = new Nave(naveIMG);
  nave2 = new Nave(nave2IMG);
  
  for(let i = 0; i < 10; i++){
  inimigos[i] = new Inimigo(inimigoIMG,random(0,width), random(-800,0));  
  }
  
}

function draw() {
  background(0);  
  meusPontos = laserColisao(laserN1,meusPontos);
  pontosOponente = laserColisao(laserN2, pontosOponente);
  
  meusPontos = naveColisao(nave,meusPontos);
  pontosOponente = naveColisao(nave2,pontosOponente);
  
  placar(meusPontos, 50,50);
  placar(pontosOponente, 330,50);
  
  mostraInimigos();
  mostraNave(nave);
  mostraNave(nave2);  
  mostraLaser(laserN1);
  mostraLaser(laserN2);
  
  pontosOponente = verificaDano(nave2, laserN1, pontosOponente);
   meusPontos = verificaDano(nave, laserN2, meusPontos);  
}

//---------Função dos Inimigos----------------
function mostraInimigos(){
    for(let inimigo of inimigos){
    inimigo.render();
  }
}

//---------Função das Naves---------------
function mostraNave(nav){
  nav.render();
  nav.giro();
  nav.update();
  nav.edges();
  
}
//---------Função Laser-------------------
function mostraLaser(laserN){
  for(let laser of laserN){
    laser.render();
    laser.update();
  }
}

//------------Funções Teclado-------------
function controleNave(){
  if(keyCode == LEFT_ARROW){
    nave.setRotation(-0.1);
  }
  if(keyCode == RIGHT_ARROW){
    nave.setRotation(0.1);
  }
  if(keyCode == UP_ARROW){
    nave.acelerando(true);
  }
  if(key == ' '){
    laserN1.push(new Laser(nave.pos, nave.heading));    
  }
}

function controleNave2(){
  if(keyCode == 65){
    nave2.setRotation(-0.1);
  }
  if(keyCode == 68){
    nave2.setRotation(0.1);
  }
  if(keyCode == 87){
    nave2.acelerando(true);
  }
  if(keyCode == 83){
    laserN2.push(new Laser(nave2.pos, nave2.heading));    
  }
}

function keyPressed(){
  controleNave();
  controleNave2();
}

function keyReleased(){
  if(keyCode == UP_ARROW){
    nave.acelerando(false);
  }
  if(keyCode == 87){
    nave2.acelerando(false);
  }
  nave.setRotation(0);
  nave2.setRotation(0);
}

//-----------Colisão--------------

function laserColisao(lasers, pontos){  
  for(let laser of lasers){
    for(let inimigo of inimigos){
      if(dist(inimigo.x, inimigo.y, laser.pos.x, laser.pos.y)<40){
        inimigos.splice(inimigos.indexOf(inimigo),1);
        lasers.splice(lasers.indexOf(laser),1);
         pontos +=1;        
          let novoInimigo = new Inimigo(inimigoIMG, random(0, width), random(-800,0));
          inimigos.push(novoInimigo);
      }
    }
  }
  return pontos;
}

function naveColisao(nav, pontos){
  for(let inimigo of inimigos){
    if(dist(inimigo.x, inimigo.y, nav.pos.x, nav.pos.y) < 50){
      inimigos.splice(inimigos.indexOf(inimigo),1);
        if(pontos > 0){
          pontos -= 1;
            let novoInimigo = new Inimigo(inimigoIMG, random(0, width), random(-100,0));
            inimigos.push(novoInimigo);
        }
              if(pontos == 0){          
              textAlign(CENTER);
              fill(255,0,0);
              textSize(40);
              text('GAME OVER', width/2, height/2);
              noLoop();    
              }         
        }
  }
  return pontos;
}

//--------------Placar------------
function placar(pontos,x,y){
  push();
  textSize(40);
  fill(255,0,0);
  text(pontos,x,y);
  pop();
}

//----------Função danoInimigo-------
function verificaDano(nav, lasers, pontos){
  for(let laser of lasers){
    if(dist(nav.pos.x, nav.pos.y,laser.pos.x, laser.pos.y) < 40){
      if(pontos > 0){
        lasers.splice(lasers.indexOf(laser),1);
       pontos -=1; 
      }       
    }
  }
  return pontos
}