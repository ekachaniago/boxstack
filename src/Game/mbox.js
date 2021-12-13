import { Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Color4, Vector2 } from "@babylonjs/core";
// import { Color3 } from "babylonjs/Maths/math.color";
let FIRSTPOS =  {"LEFT" : 0, "RIGHT" : 1};

class Mbox extends MeshBuilder
{
    constructor(scene)
    {
        super();
        // this.lebar = 2;
        // this.panjang = 2;
        // this.tinggi = 0.1;
        this.nama = "box";
        this.mPosition = new Vector3(0, 0, 0);
        this.mPivot = new Vector3(0, 0, 0);
        this.mRotation = new Vector3(0, 0, 0);
        this.mSize = {"lebar": 2.0, "tinggi": 0.2, "panjang": 2.0};
        this.scale = new Vector3(1,1,1);
        this.speed = new Vector2(0, 0);
        this.mColour = new Color4(1,1,1,1);
    }

    setName(name)
    {
        this.nama = name;
    }

    setSize(lebar, tinggi, panjang)
    {
        // this.mSize = (lebar, tinggi, panjang);
        this.mSize.lebar = lebar;
        this.mSize.tinggi = tinggi;
        this.mSize.panjang = panjang;
    }

    getSize()
    {
        return this.mSize;
    }

    setPosition(x, y, z)
    {
        this.mPosition = new Vector3(x, y, z);
    }

    getPosition()
    {
        return this.mPosition;
    }

    setPivot(x, y, z)
    {
        this.mPivot = new Vector3(x, y, z);
    }

    setRotation(x, y, z)
    {
        this.mRotation = new Vector3(Math.PI * (x/180), Math.PI * (y/180), Math.PI * (z/180));
        // this.mRotation = new Vector3(x, y, z);
    }

    getRotation()
    {
        return this.mRotation;
    }

    setColour(r, g, b, a)
    {
        this.material = new StandardMaterial('material', this.scene);
        this.material.diffuseColor = new Color4(r, g, b, a);
        this.mColour = new Color4(r,g,b,a);
        
    }

    getColour()
    {
        return this.mColour;
    }

    nextColour()
    {
        var r = this.mColour.r;
        var g = this.mColour.g;
        var b = this.mColour.b;
        var a = this.mColour.a;

        // console.log("--rgb: " + r +","+g+","+b);
        // console.log("--rgb: " +Math.round(r * 255) + ","+Math.round(g * 255)+","+Math.round(b * 255));
        
        // r /= 255; g /= 255; b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max === min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        // h = Math.floor(h * 360);
        // s = Math.floor(s * 100);
        // l = Math.floor(l * 100);

        h = h + 0.02 > 3.60 ? 0 : h + 0.02;
        s = s + 0.01 > 1 ? 0 : s + 0.01;
        l = l + 0.01 > 1 ? 0 : l + 0.01;
        console.log("hsl: " + h + ","+s+","+l);
        if(s === 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
    
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        // console.log("++rgb: " + r +","+g+","+b);
        // console.log("++rgb: " +Math.round(r * 255) + ","+Math.round(g * 255)+","+Math.round(b * 255));

        this.mColour = new Color4(r, g, b, a);
        // this.mColour = new Color4(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);

        // this.material = new StandardMaterial('material', this.scene);
        this.material.diffuseColor = new Color4(r, g, b, a);
    }

    setScale(x, y, z)
    {
        this.scale = new Vector3(x, y, z);
    }

    getScale()
    {
        return this.scale;
    }

    create(scene)
    {
        this.scene = scene
        this.box = MeshBuilder.CreateBox(this.nama, {width: this.mSize.lebar, height: this.mSize.tinggi, depth: this.mSize.panjang}, scene);
    }

    delete()
    {
        this.box.dispose();
    }

    setSpeed(x, y)
    {
        this.speed = new Vector2(x, y);
    }

    getSpeed()
    {
        return this.speed;
    }

    setFirstPos(firstpos)
    {
        this.firstpos = firstpos;
        if (firstpos === FIRSTPOS.RIGHT)
        {
            this.speed.x = Math.abs(this.speed.x) * -1;
            this.speed.y = Math.abs(this.speed.y) * -1;
        }
        else
        {
            this.speed.x = Math.abs(this.speed.x) * 1;
            this.speed.y = Math.abs(this.speed.y) * -1;
        }
    }

    changeDirection()
    {
        this.speed = new Vector2(this.speed.x * -1, this.speed.y * -1);
    }


    update()
    {
    this.box.position = this.mPosition;
    this.box.material = this.material;
    this.box.rotation = this.mRotation;
    this.box.scaling = this.scale;
    if (
        this.mPosition.x < this.mPivot.x-2 ||
        this.mPosition.x > this.mPivot.x+2 ||
        this.mPosition.z < this.mPivot.z-2 ||
        this.mPosition.z > this.mPivot.z+2
    )
    {
        this.changeDirection();
    }
  }


}

export default Mbox;