import {MeshBuilder, SpriteManager, Sprite, Vector3} from "@babylonjs/core";


class Awan extends MeshBuilder
{
    constructor(scene, url)
    {
        super();
        this.arah = 1;
        this.speed = 0.002;
        this.letak = new Vector3(0, 0, 4);
        this.mSize = {"panjang": 1920, "tinggi": 1080};
        this.spritemanager = new SpriteManager("spritemanager", url, 100, {width: this.mSize.panjang, height: this.mSize.tinggi}, scene);
        this.mAwan = new Sprite("bg1", this.spritemanager);
    }

    setArah(val)
    {
        this.arah = Math.abs(val) === 1 ? val : 1;
    }

    getArah()
    {
        return this.arah;
    }

    setPosition(val)
    {
        this.letak = val;
    }

    getPosX()
    {
        return this.letak;
    }

    update()
    {
        this.letak = new Vector3(this.letak.x + this.speed * this.arah, this.letak.y, this.letak.z);
        this.mAwan.position = this.letak;
        this.mAwan.width = 10;
        this.mAwan.height = 5;

    }
}

export default Awan;