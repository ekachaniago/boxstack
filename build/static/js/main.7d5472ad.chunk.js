(this.webpackJsonptower=this.webpackJsonptower||[]).push([[0],{47:function(e,t,i){},49:function(e,t,i){},50:function(e,t,i){"use strict";i.r(t);var n,o,s,a,r,l,c,u=i(20),h=i.n(u),g=i(40),d=i.n(g),p=(i(47),i(14)),f=i(19),b=i(33),m=i(34),v=i(36),x=i(35),S=i(11),w=function(e){Object(v.a)(i,e);var t=Object(x.a)(i);function i(e,n){var o;return Object(b.a)(this,i),(o=t.call(this)).arah=1,o.speed=.002,o.letak=new S.i(0,0,4),o.mSize={panjang:1920,tinggi:1080},o.spritemanager=new S.f("spritemanager",n,100,{width:o.mSize.panjang,height:o.mSize.tinggi},e),o.mAwan=new S.e("bg1",o.spritemanager),o}return Object(m.a)(i,[{key:"setArah",value:function(e){this.arah=1===Math.abs(e)?e:1}},{key:"getArah",value:function(){return this.arah}},{key:"setPosition",value:function(e){this.letak=e}},{key:"getPosX",value:function(){return this.letak}},{key:"update",value:function(){this.letak=new S.i(this.letak.x+this.speed*this.arah,this.letak.y,this.letak.z),this.mAwan.position=this.letak,this.mAwan.width=10,this.mAwan.height=5}}]),i}(S.c),P=i(41),z=i(42),y=i(22),k=["antialias","engineOptions","adaptToDeviceRatio","sceneOptions","onRender","onSceneReady"],C=function(e){var t=Object(u.useRef)(null),i=e.antialias,n=e.engineOptions,o=e.adaptToDeviceRatio,s=e.sceneOptions,a=e.onRender,r=(e.onSceneReady,Object(z.a)(e,k));return Object(u.useEffect)((function(){if(t.current){var r=new S.b(t.current,i,n,o),l=new S.d(r,s);l.isReady()?e.onSceneReady(l):l.onReadyObservable.addOnce((function(t){return e.onSceneReady(t)})),r.runRenderLoop((function(){"function"===typeof a&&a(l),l.render()}));var c=function(){l.getEngine().resize()};return window&&window.addEventListener("resize",c),function(){l.getEngine().dispose(),window&&window.removeEventListener("resize",c)}}}),[t]),Object(y.jsx)("canvas",Object(P.a)({ref:t},r))},O=1,j=function(e){Object(v.a)(i,e);var t=Object(x.a)(i);function i(e){var n;return Object(b.a)(this,i),(n=t.call(this)).nama="box",n.mPosition=new S.i(0,0,0),n.mPivot=new S.i(0,0,0),n.mRotation=new S.i(0,0,0),n.mSize={lebar:2,tinggi:.2,panjang:2},n.scale=new S.i(1,1,1),n.speed=new S.h(0,0),n.mColour=new S.a(1,1,1,1),n}return Object(m.a)(i,[{key:"setName",value:function(e){this.nama=e}},{key:"setSize",value:function(e,t,i){this.mSize.lebar=e,this.mSize.tinggi=t,this.mSize.panjang=i}},{key:"getSize",value:function(){return this.mSize}},{key:"setPosition",value:function(e,t,i){this.mPosition=new S.i(e,t,i)}},{key:"getPosition",value:function(){return this.mPosition}},{key:"setPivot",value:function(e,t,i){this.mPivot=new S.i(e,t,i)}},{key:"setRotation",value:function(e,t,i){this.mRotation=new S.i(Math.PI*(e/180),Math.PI*(t/180),Math.PI*(i/180))}},{key:"getRotation",value:function(){return this.mRotation}},{key:"setColour",value:function(e,t,i,n){this.material=new S.g("material",this.scene),this.material.diffuseColor=new S.a(e,t,i,n),this.mColour=new S.a(e,t,i,n)}},{key:"getColour",value:function(){return this.mColour}},{key:"nextColour",value:function(){var e,t,i=this.mColour.r,n=this.mColour.g,o=this.mColour.b,s=this.mColour.a,a=Math.max(i,n,o),r=Math.min(i,n,o),l=(a+r)/2;if(a===r)e=t=0;else{var c=a-r;switch(t=l>.5?c/(2-a-r):c/(a+r),a){case i:e=(n-o)/c+(n<o?6:0);break;case n:e=(o-i)/c+2;break;case o:e=(i-n)/c+4}e/=6}if(e=e+.02>3.6?0:e+.02,t=t+.01>1?0:t+.01,l=l+.01>1?0:l+.01,console.log("hsl: "+e+","+t+","+l),0===t)i=n=o=l;else{var u=function(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+6*(t-e)*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e},h=l<.5?l*(1+t):l+t-l*t,g=2*l-h;i=u(g,h,e+1/3),n=u(g,h,e),o=u(g,h,e-1/3)}this.mColour=new S.a(i,n,o,s),this.material.diffuseColor=new S.a(i,n,o,s)}},{key:"setScale",value:function(e,t,i){this.scale=new S.i(e,t,i)}},{key:"getScale",value:function(){return this.scale}},{key:"create",value:function(e){this.scene=e,this.box=S.c.CreateBox(this.nama,{width:this.mSize.lebar,height:this.mSize.tinggi,depth:this.mSize.panjang},e)}},{key:"delete",value:function(){this.box.dispose()}},{key:"setSpeed",value:function(e,t){this.speed=new S.h(e,t)}},{key:"getSpeed",value:function(){return this.speed}},{key:"setFirstPos",value:function(e){this.firstpos=e,e===O?(this.speed.x=-1*Math.abs(this.speed.x),this.speed.y=-1*Math.abs(this.speed.y)):(this.speed.x=1*Math.abs(this.speed.x),this.speed.y=-1*Math.abs(this.speed.y))}},{key:"changeDirection",value:function(){this.speed=new S.h(-1*this.speed.x,-1*this.speed.y)}},{key:"update",value:function(){this.box.position=this.mPosition,this.box.material=this.material,this.box.rotation=this.mRotation,this.box.scaling=this.scale,(this.mPosition.x<this.mPivot.x-2||this.mPosition.x>this.mPivot.x+2||this.mPosition.z<this.mPivot.z-2||this.mPosition.z>this.mPivot.z+2)&&this.changeDirection()}}]),i}(S.c),M=j,T={speed:2,firstpos:1,bGameOver:!1,initSizeX:2,initSizeY:.2,initSizeZ:2,score:0,soundBgOn:!1},R=(i(49),0),A=1,E=[],B=0,I=1,G=2,L=9,_=B,F=B,N=0,V=new p.Vector3(0,0,0),D=!1,X=!0,U=0,Y=null,Z=null,H=null,J=null,q=null,K=null,Q=[],W=function(e){var t=new p.FreeCamera("camera1",new p.Vector3(0,5,-10),e);t.setTarget(p.Vector3.Zero());var i=e.getEngine().getRenderingCanvas();t.attachControl(i,!0),new p.HemisphericLight("light",new p.Vector3(0,1,0),e).intensity=.8;var n=Math.random(),u=Math.random(),h=Math.random();r=A,(o=new M(e)).setSize(T.initSizeX,T.initSizeY,T.initSizeZ),o.setPosition(0,0,0),o.setPivot(0,0,0),o.setRotation(0,45,0),o.setColour(n,u,h,1),o.setSpeed(T.speed,T.speed),o.setFirstPos(r),o.create(e),o.update();var g=p.MeshBuilder.CreateBox("skybox",{size:1e3},e);g.infiniteDistance=!0;var d=new p.StandardMaterial("skyboxMat",e);d.backFaceCulling=!1;d.reflectionTexture=p.CubeTexture.CreateFromImages(["./assets/skybox_px.jpg","./assets/skybox_py.jpg","./assets/skybox_pz.jpg","./assets/skybox_nx.jpg","./assets/skybox_ny.jpg","./assets/skybox_nz.jpg"],e),d.reflectionTexture.coordinatesMode=p.Texture.SKYBOX_MODE,d.diffuseColor=new p.Color3(0,0,0),d.specularColor=new p.Color3(0,0,0),g.material=d,a=new p.SpriteManager("spritemanager","./assets/bg1.png",100,{width:1920,height:1080},e),(s=new p.Sprite("bg1",a)).position=new p.Vector3(0,0,6),s.width=20,s.height=20;var b=new w(e,"./assets/awan.png");Q.push(b),(c=new Audio("./assets/cemara.mp3")).pause(),l=new Audio("./assets/audio.wav"),Y=f.AdvancedDynamicTexture.CreateFullscreenUI("UI",!0,e),(q=new f.TextBlock).text="Score",q.color="#ffffff",q.fontSize=24,q.width="200px",q.height="40px",q.top="10px",q.left="0px",q.onPointerDownObservable.add((function(){U+=100,q.text=U.toString()})),q.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,Y.addControl(q),(K=new f.TextBlock).text="Game Over",K.color="#ee6363",K.fontSize=36,K.width="200px",K.height="40px",K.top="-100px",K.left="0px",K.onPointerDownObservable.add((function(){U+=100,K.text=U.toString()})),K.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,(Z=f.Button.CreateSimpleButton("but1","Click Here To Start")).width=.5,Z.height=.4,Z.color="#00bfff",Z.fontSize=28,Z.thickness=0,Z.onPointerUpObservable.add((function(){F=I,Y.removeControl(Z)})),Y.addControl(Z),(H=f.Button.CreateSimpleButton("but1","Click Here To Play Again")).width=.5,H.height=.4,H.color="#00bfff",H.fontSize=28,H.thickness=0,H.onPointerUpObservable.add((function(){F=I,Y.removeControl(H),Y.removeControl(K),T.bGameOver=!1,T.speed=2;var t=Math.random(),i=Math.random(),n=Math.random();r=A,o.delete(),(o=new M(e)).setSize(T.initSizeX,T.initSizeY,T.initSizeZ),o.setPosition(0,0,0),o.setPivot(0,0,0),o.setRotation(0,45,0),o.setColour(t,i,n,1),o.setSpeed(T.speed,T.speed),o.setFirstPos(r),o.create(e),o.update(),E.length>0&&(E.forEach((function(e){e.delete()})),E=[])})),(J=f.Button.CreateSimpleButton("but1","Turn Sound On/Off")).width="150px",J.height="50px",J.color="#ffffff99",J.fontSize=16,J.thickness=1,J.background="#005fc0",J.onPointerUpObservable.add((function(){T.soundBgOn=!T.soundBgOn,T.soundBgOn?J.text="Turn Sound Off":J.text="Turn Sound On"})),J.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_BOTTOM,Y.addControl(J)},$=function(e){T.soundBgOn?c.paused&&c.duration>0&&c.play():c.pause();var t=e.getEngine().getDeltaTime();switch(Q.length>0&&Q.forEach((function(e){e.update()})),_){case B:default:V=new p.Vector3(o.getPosition().x,o.getPosition().y,o.getPosition().z);break;case I:V=D?new p.Vector3(o.getPosition().x,o.getPosition().y,o.getPosition().z):new p.Vector3(o.getPosition().x+o.getSpeed().x/100,o.getPosition().y,o.getPosition().z+o.getSpeed().y/100);break;case G:case L:V=new p.Vector3(o.getPosition().x,o.getPosition().y,o.getPosition().z)}if(E.length>0&&E.forEach((function(e){e.update()})),void 0!==o&&(o.setPosition(V.x,V.y,V.z),o.update()),(N+=t)>1e3)switch(N=0,F){case B:break;case G:F=I,console.log("NextGameState = GAMESTATES.PLAY")}if(D&&!X&&(F=G,console.log("NextGameState = GAMESTATES.BOXTRANSITION"),X=!0),F!==_)switch(_){case B:case I:_=F;break;case G:var i,s=o;E.length>0&&(s=E[E.length-1],console.log("last box from mybox."));var a=o.getPosition(),l=s.getPosition();console.log("posisi benda flybox: "+a.x+","+a.y+","+a.z),console.log("posisi benda lastbox: "+l.x+","+l.y+","+l.z),i=Math.sqrt((l.x-a.x)*(l.x-a.x)+(l.z-a.z)*(l.z-a.z)),console.log("jarak: "+i),console.log("lastbox size: "+s.getSize().lebar+","+s.getSize().tinggi+","+s.getSize().panjang),r===R?Math.abs(i)-s.getSize().lebar>0&&(T.bGameOver=!0,console.log("Game Over x")):Math.abs(i)-s.getSize().panjang>0&&(T.bGameOver=!0,console.log("Game Over z")),r=r===A?R:A,console.log("firstpos: "+r);var u=r===A?s.getSize().lebar-Math.abs(i):o.getSize().lebar,h=o.getSize().tinggi,g=r===A?o.getSize().panjang:s.getSize().panjang-Math.abs(i),d=o.getPosition().x*Math.sin(Math.PI/4),f=o.getPosition().y,b=o.getPosition().z*Math.sin(-Math.PI/4);T.score+=Math.round(u*g*T.speed*10),T.bGameOver||((n=new M(e)).setSize(u,h,g),n.setPosition(d,f,b),n.setRotation(0,45,0),n.setColour(o.getColour().r,o.getColour().g,o.getColour().b,o.getColour().a),n.setSpeed(0,0),n.setScale(1,1,1),n.create(e),n.update(),E.push(n));for(var m=0;m<E.length;m++)E[m].setPosition(E[m].getPosition().x,E[m].getPosition().y-.2,E[m].getPosition().z),E[m].update();var v=o.getColour();o.delete(),(o=new M(e)).setSize(u,h,g),console.log("new size: "+u+","+h+","+g),o.setPosition(d,0,b),o.setPivot(s.getPosition().x,s.getPosition().y,s.getPosition().z),o.setRotation(0,45,0),o.setColour(v.r,v.g,v.b,v.a),o.nextColour(),o.setSpeed(T.speed,T.speed),o.setFirstPos(r),o.setScale(1,1,1),o.create(e),o.update(),console.log("flybox size: "+o.getSize().lebar+","+o.getSize().tinggi+","+o.getSize().panjang),console.log("flybox position: "+o.getPosition().x+","+o.getPosition().y+","+o.getPosition().z),_=F,E.length>0&&E.forEach((function(e){var t=e.getColour();e.setColour(t.r,t.g,t.b,t.a-.1)})),D=!1;break;case L:_=F}q.text="Score: "+T.score.toString(),T.bGameOver&&(o.delete(),Y.addControl(H),Y.addControl(K),_=F=L)},ee=function(e){switch(_){case B:case G:case L:default:break;case I:T.speed+=.3,o.setSpeed(0,0),console.log("flybox position click: "+o.getPosition().x+","+o.getPosition().y+","+o.getPosition().z),D=!0,X=!1,l.play()}},te=function(){return Object(y.jsx)("div",{id:"scenecontainer",children:Object(y.jsx)(C,{antialias:!0,onSceneReady:W,onRender:$,onClick:ee,id:"my-canvas"})})},ie=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,51)).then((function(t){var i=t.getCLS,n=t.getFID,o=t.getFCP,s=t.getLCP,a=t.getTTFB;i(e),n(e),o(e),s(e),a(e)}))};d.a.render(Object(y.jsx)(h.a.StrictMode,{children:Object(y.jsx)(te,{})}),document.getElementById("root")),ie()}},[[50,1,2]]]);
//# sourceMappingURL=main.7d5472ad.chunk.js.map