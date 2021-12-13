// import * as BABYLON from 'babylonjs';
// import { NullComponent } from '../babylon/babylon.types'
// import { useScene } from '../babylon/hooks/scene'

// import { MeshBuilder, FreeCamera, Vector3, 
//   HemisphericLight, Sprite, SpriteManager, CubeTexture, StandardMaterial,
//   Texture, Color3 } from "@babylonjs/core";

import { MeshBuilder, FreeCamera, Vector3, 
  HemisphericLight, Sprite, SpriteManager, CubeTexture, StandardMaterial,
  Texture, Color3, Sound } from "babylonjs";
import { AdvancedDynamicTexture, Control, TextBlock, Button, Container, MultiLine } from 'babylonjs-gui';
import Awan from './Game/awan';


import SceneComponent from "./Game/SceneComponent";
import Mbox from "./Game/mbox";
import GameVariable from "./Game/GameParametres";
import './App.css';
import React from "react";

let box;
let flybox;
let dropbox;

let bg1;
let spritemanager;

let FIRSTPOS =  {"LEFT" : 0, "RIGHT" : 1};

var myboxes = [];
const GAMESTATES = {
          "HOME" : 0, 
          "PLAY" : 1, 
          "BOXTRANSITION" : 2,
          "END" : 9};

var GameState = GAMESTATES.HOME;
var NextGameState = GAMESTATES.HOME;

var currentTime = 0;
var firstpos;
var nextPosition = new Vector3(0, 0, 0);
var bClick = false;
var hClick = true;

var t1;
var timeStamp = 0;

var UIPanel = null;
var btnStart = null;
var btnGameOver = null;
var btnSoundBg = null;
var txtScore = null;
var txtGameOver = null;

let clickSound;
let bgSound;
var myAwan = [];
var xAwan = null;


const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.8;

  // Our built-in 'box' shape.
  // box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  // box = MeshBuilder.CreateBox("box", { width: 2, height: 0.1, depth: 2 }, scene);

  // Move the box upward 1/2 its height
  // box.position.y = 1;

  var w_r = Math.random();
  var w_g = Math.random();
  var w_b = Math.random();
  firstpos = FIRSTPOS.RIGHT;

  flybox = new Mbox(scene);
  flybox.setSize(GameVariable.initSizeX, GameVariable.initSizeY, GameVariable.initSizeZ);
  flybox.setPosition(0,0,0);
  flybox.setPivot(0,0,0);
  flybox.setRotation(0,45,0);
  // flybox.setColour(0.15,0.86,0.87,1);
  flybox.setColour(w_r, w_g, w_b, 1);
  flybox.setSpeed(GameVariable.speed, GameVariable.speed);
  flybox.setFirstPos(firstpos);
  flybox.create(scene);
  flybox.update();

  // myboxes.push(flybox);


  // Our built-in 'ground' shape.
  // let g = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
  // g.position = new Vector3(0, -3, 0);

  const skybox = MeshBuilder.CreateBox("skybox", { size: 1000 }, scene);
  skybox.infiniteDistance = true;
  const skyboxMaterial = new StandardMaterial("skyboxMat", scene);
  skyboxMaterial.backFaceCulling = false;
  const files = [
      "./assets/skybox_px.jpg",
      "./assets/skybox_py.jpg",
      "./assets/skybox_pz.jpg",
      "./assets/skybox_nx.jpg",
      "./assets/skybox_ny.jpg",
      "./assets/skybox_nz.jpg",
  ];
  skyboxMaterial.reflectionTexture = CubeTexture.CreateFromImages(files, scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  // const skybox = MeshBuilder.CreateBox("skyBox", {size:150}, scene);
  // skybox.infiniteDistance = true;
  // const skyboxMaterial = new StandardMaterial("skyBox", scene);
  // skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new CubeTexture("textures/skybox", scene);
  // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  // skyboxMaterial.specularColor = new Color3(0, 0, 0);
  // skybox.material = skyboxMaterial;
  
  spritemanager = new SpriteManager("spritemanager", "./assets/bg1.png", 100, {width: 1920, height: 1080}, scene);
  
  bg1 = new Sprite("bg1", spritemanager);
  bg1.position = new Vector3(0, 0, 6);
  bg1.width = 20;
  bg1.height = 20;

  let mAwan = new Awan(scene, "./assets/awan.png");
  myAwan.push(mAwan);

  // clickSound = Sound("clickSound", "./assets/audio.wav", scene, null, { loop: false, autoplay: false });
  // clickSound = Sound("clickSound", "cemara.mp3", scene);

  bgSound = new Audio("./assets/cemara.mp3");
  bgSound.pause();
  clickSound = new Audio("./assets/audio.wav");


  UIPanel = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);


  txtScore = new TextBlock();
  txtScore.text = "Score";
  txtScore.color = "#ffffff";
  txtScore.fontSize = 24;
  txtScore.width = "200px";
  txtScore.height = "40px";
  txtScore.top = "10px";
  txtScore.left = "0px";
  txtScore.onPointerDownObservable.add(function() {
    timeStamp += 100;
    txtScore.text = timeStamp.toString();
  });
  
  txtScore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  UIPanel.addControl(txtScore);   
  
  txtGameOver = new TextBlock();
  txtGameOver.text = "Game Over";
  txtGameOver.color = "#ee6363";
  txtGameOver.fontSize = 36;
  txtGameOver.width = "200px";
  txtGameOver.height = "40px";
  txtGameOver.top = "-100px";
  txtGameOver.left = "0px";
  txtGameOver.onPointerDownObservable.add(function() {
    timeStamp += 100;
    txtGameOver.text = timeStamp.toString();
  });
  
  txtGameOver.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  // UIPanel.addControl(txtGameOver); 
  

  btnStart = Button.CreateSimpleButton("but1", "Click Here To Start");
  btnStart.width = 0.5;
  btnStart.height = 0.4;
  btnStart.color = "#00bfff";
  btnStart.fontSize = 28;
  btnStart.thickness = 0;
  // btnStart.background = "green";
  btnStart.onPointerUpObservable.add(function() {
      NextGameState = GAMESTATES.PLAY;
      UIPanel.removeControl(btnStart);
  });

  UIPanel.addControl(btnStart);

  btnGameOver = Button.CreateSimpleButton("but1", "Click Here To Play Again");
  btnGameOver.width = 0.5;
  btnGameOver.height = 0.4;
  btnGameOver.color = "#00bfff";
  btnGameOver.fontSize = 28;
  btnGameOver.thickness = 0;
  // btnStart.background = "green";
  btnGameOver.onPointerUpObservable.add(function() {
    NextGameState = GAMESTATES.PLAY;
    UIPanel.removeControl(btnGameOver);
    UIPanel.removeControl(txtGameOver);

    GameVariable.bGameOver = false;
    GameVariable.speed = 2;

    var w_r = Math.random();
    var w_g = Math.random();
    var w_b = Math.random();
    firstpos = FIRSTPOS.RIGHT;

    flybox.delete();
    flybox = new Mbox(scene);
    flybox.setSize(GameVariable.initSizeX, GameVariable.initSizeY, GameVariable.initSizeZ);
    flybox.setPosition(0,0,0);
    flybox.setPivot(0,0,0);
    flybox.setRotation(0,45,0);
    // flybox.setColour(0.15,0.86,0.87,1);
    flybox.setColour(w_r, w_g, w_b, 1);
    flybox.setSpeed(GameVariable.speed, GameVariable.speed);
    flybox.setFirstPos(firstpos);
    flybox.create(scene);
    flybox.update();

    if (myboxes.length > 0)
    {
      myboxes.forEach(box => {
        box.delete();
      });
      myboxes = [];
    }

    
  });

  btnSoundBg = Button.CreateSimpleButton("but1", "Turn Sound On/Off");
  btnSoundBg.width = "150px";
  btnSoundBg.height = "50px";
  btnSoundBg.color = "#ffffff99";
  btnSoundBg.fontSize = 16;
  btnSoundBg.thickness = 1;
  btnSoundBg.background = "#005fc0";
  btnSoundBg.onPointerUpObservable.add(function() {
      GameVariable.soundBgOn = !GameVariable.soundBgOn;
      if (GameVariable.soundBgOn)
        btnSoundBg.text = "Turn Sound Off";
      else 
        btnSoundBg.text = "Turn Sound On";
  });
  btnSoundBg.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

  UIPanel.addControl(btnSoundBg);

  // UIPanel.addControl(btnGameOver);

};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  
  if (GameVariable.soundBgOn) {
    if (bgSound.paused && bgSound.duration > 0) bgSound.play();
  }
  else
  {
    bgSound.pause();
  }

  var deltaTimeInMillis = scene.getEngine().getDeltaTime();

  if (myAwan.length > 0)
  {
    myAwan.forEach(awan => {
      awan.update();
    });
  }
  
  switch (GameState)
  {
    case GAMESTATES.HOME:
    default:
      nextPosition = new Vector3(flybox.getPosition().x, flybox.getPosition().y, flybox.getPosition().z);
    break;
    case GAMESTATES.PLAY:
      if (bClick)
      {
        nextPosition = new Vector3(flybox.getPosition().x, flybox.getPosition().y, flybox.getPosition().z);
      }
      else
      {
        nextPosition = new Vector3(flybox.getPosition().x +flybox.getSpeed().x/100, flybox.getPosition().y, flybox.getPosition().z+flybox.getSpeed().y/100);
      }
      
    break;
    case GAMESTATES.BOXTRANSITION:
      nextPosition = new Vector3(flybox.getPosition().x, flybox.getPosition().y, flybox.getPosition().z);
    break;
    case GAMESTATES.END:
      nextPosition = new Vector3(flybox.getPosition().x, flybox.getPosition().y, flybox.getPosition().z);
    break;
  }

  if (myboxes.length >  0)
  {
    myboxes.forEach(mbox => {
      mbox.update();
    });
  }

  if (flybox !== undefined)
  {
    flybox.setPosition(nextPosition.x, nextPosition.y, nextPosition.z);
    flybox.update();
  }

  currentTime += deltaTimeInMillis;
  if (currentTime > 1000)
  {
    currentTime = 0;

    switch(NextGameState)
    {
      case GAMESTATES.HOME:
        // NextGameState = GAMESTATES.PLAY;
        // console.log("NextGameState = GAMESTATES.PLAY");
      break;
      case GAMESTATES.BOXTRANSITION:
        NextGameState = GAMESTATES.PLAY;
        console.log("NextGameState = GAMESTATES.PLAY");
      break;
      case GAMESTATES.PLAY:
        // NextGameState = GAMESTATES.END;
        // console.log("NextGameState = GAMESTATES.END");
      break;
      case GAMESTATES.END:
      default:
        // NextGameState = GAMESTATES.HOME;
        // console.log("NextGameState = GAMESTATES.HOME");
      break;
    }

  }

  if (bClick && !hClick)
  {
    NextGameState = GAMESTATES.BOXTRANSITION;
    console.log("NextGameState = GAMESTATES.BOXTRANSITION");
    hClick = true;
  }

  if (NextGameState !== GameState)
  {
    switch(GameState)
    {
        case GAMESTATES.HOME:
          
          GameState = NextGameState;
        break;

        case GAMESTATES.PLAY:
          GameState = NextGameState;
        break;

        case GAMESTATES.BOXTRANSITION:

          // periksa jarak
          let jarak;
          let lastbox = flybox;
          if (myboxes.length > 0)
          {
            lastbox = myboxes[myboxes.length -1];
            console.log("last box from mybox.");
          }

          const p1 = flybox.getPosition();
          const p2 = lastbox.getPosition();
          // jarak = new Vector3(Math.sqrt(p1.x*p1.x + p2.x*p2.x), p1.y - p2.y, Math.sqrt(p1.z*p1.z + p2.z*p2.z));
          // jarak = new Vector3(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y), Math.abs(p1.z - p2.z));
          console.log("posisi benda flybox: " + p1.x + "," + p1.y + "," + p1.z);
          console.log("posisi benda lastbox: " + p2.x + "," + p2.y + "," + p2.z);
          jarak = Math.sqrt((p2.x - p1.x)*(p2.x - p1.x) + (p2.z - p1.z)*(p2.z - p1.z));
          // console.log("jarak :" + jarak.x + "," + jarak.y + "," + jarak.z);
          console.log("jarak: " + jarak);
          console.log("lastbox size: " + lastbox.getSize().lebar + "," + lastbox.getSize().tinggi + "," + lastbox.getSize().panjang);

          // periksa masih di atas box sebelumnya atau tidak
          if (firstpos === FIRSTPOS.LEFT)
          {
            if (Math.abs(jarak) - lastbox.getSize().lebar > 0)
            {
              GameVariable.bGameOver = true;
              console.log("Game Over x");
            }
          }
          else
          {
            if (Math.abs(jarak) - lastbox.getSize().panjang > 0)
            {
              GameVariable.bGameOver = true;
              console.log("Game Over z");
            }
          }

          //setel ulang
          if(firstpos === FIRSTPOS.RIGHT)
            firstpos = FIRSTPOS.LEFT;
          else firstpos = FIRSTPOS.RIGHT;
          console.log("firstpos: " + firstpos);

          //ukuran
          const s_x = firstpos === FIRSTPOS.RIGHT ? lastbox.getSize().lebar - Math.abs(jarak) : flybox.getSize().lebar;
          const s_y = flybox.getSize().tinggi;
          const s_z = firstpos === FIRSTPOS.RIGHT ?  flybox.getSize().panjang : lastbox.getSize().panjang - Math.abs(jarak);

          // letak
          // var p_x = firstpos === FIRSTPOS.RIGHT ? flybox.getPosition().x * Math.cos(Math.PI/4) : flybox.getPosition().x;
          // var p_y = lastbox.getPosition().y;
          // var p_z = firstpos === FIRSTPOS.LEFT ? lastbox.getPosition().z : lastbox.getPosition().z * Math.sin(Math.PI/4) ;

          var p_x = flybox.getPosition().x * Math.sin(Math.PI/4);
          var p_y = flybox.getPosition().y;
          var p_z = flybox.getPosition().z * Math.sin(-Math.PI/4);

          GameVariable.score += Math.round(s_x * s_z * GameVariable.speed * 10);
          
          if (!GameVariable.bGameOver) 
          {
            box = new Mbox(scene);
            // let sz = flybox.getSize();
            box.setSize(s_x, s_y, s_z);
            box.setPosition(p_x,p_y,p_z);
            box.setRotation(0,45,0);
            box.setColour(flybox.getColour().r, flybox.getColour().g, flybox.getColour().b, flybox.getColour().a);
            box.setSpeed(0, 0);
            box.setScale(1,1,1);
            box.create(scene);
            box.update();
            myboxes.push(box);
          }
          

          for (var i = 0; i < myboxes.length; i++)
          {
            myboxes[i].setPosition(myboxes[i].getPosition().x, myboxes[i].getPosition().y - 0.2, myboxes[i].getPosition().z);
            myboxes[i].update();
          }

          let oldcolour = flybox.getColour();

          flybox.delete();
          flybox = new Mbox(scene);
          // flybox.create(scene);
          
          

          
          // flybox.setScale(s_x/lastbox.getSize().lebar, s_y/lastbox.getSize().tinggi, s_z/lastbox.getSize().panjang);

          flybox.setSize(s_x, s_y, s_z);

          console.log("new size: " + s_x + "," + s_y + "," + s_z);
          // console.log("new scale: " + s_x/lastbox.getSize().lebar + "," + s_y/lastbox.getSize().tinggi + "," + s_z/lastbox.getSize().panjang);
          
          
          
          flybox.setPosition(p_x, 0, p_z);
          flybox.setPivot(lastbox.getPosition().x, lastbox.getPosition().y, lastbox.getPosition().z);
          // flybox.setPivot(p_x, 0, p_z);
          flybox.setRotation(0,45,0);
          flybox.setColour(oldcolour.r, oldcolour.g, oldcolour.b, oldcolour.a);
          flybox.nextColour();
          flybox.setSpeed(GameVariable.speed, GameVariable.speed);
          flybox.setFirstPos(firstpos);
          // iScale = 0.96 * iScale;
          flybox.setScale(1, 1, 1);
          flybox.create(scene);
          flybox.update();
          console.log("flybox size: " + flybox.getSize().lebar + "," + flybox.getSize().tinggi + "," + flybox.getSize().panjang);
          console.log("flybox position: " + flybox.getPosition().x + ","+flybox.getPosition().y+","+flybox.getPosition().z);
          GameState = NextGameState;

          // update box alpha
          if (myboxes.length > 0)
          {
            myboxes.forEach(box => {
              let cl = box.getColour();
              box.setColour(cl.r, cl.g, cl.b, cl.a - 0.1);
            });
          }
          
          bClick = false;
        break;

        case GAMESTATES.END:

          GameState = NextGameState;
        break;

        default:
        break;
    }
    
  }

  txtScore.text = "Score: " + GameVariable.score.toString();

  if (GameVariable.bGameOver)
  {
    flybox.delete();
    UIPanel.addControl(btnGameOver);
    UIPanel.addControl(txtGameOver);
    NextGameState = GAMESTATES.END;
    GameState = NextGameState;

  }

  
};

const onClick = (scene) =>
{
  
  switch(GameState)
  {
    case GAMESTATES.HOME:
      // UIPanel.removeControl(btnStart);

    break;
    case GAMESTATES.BOXTRANSITION:
    case GAMESTATES.END:
    default:
    break;

    case GAMESTATES.PLAY:
      GameVariable.speed +=0.3;
      flybox.setSpeed(0, 0);
      console.log("flybox position click: " + flybox.getPosition().x + ","+flybox.getPosition().y+","+flybox.getPosition().z);
      bClick = true;
      hClick = false;
      clickSound.play();
      
    break;

  
  }
  
}

export default () => (
  <div id="scenecontainer">
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} onClick={onClick} id="my-canvas" />
  </div>
);
