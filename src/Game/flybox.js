import mbox from "./mbox";
import { Vector2 } from "@babylonjs/core";

class Flybox extends mbox
{
    constructor(scene)
    {
        super(scene);
        
    }

    
    setStartPosition(val)
    {
        this.startFrom = val;
    }
}

export default Flybox;