import { RhelenaPresentationModel } from 'rhelena';
import { log } from 'util';
export default class ServerModel extends RhelenaPresentationModel {
    constructor(name, host) {
        super();
        this.name = name
        this.host = host
        this.speed = 0;

        setInterval(async () => {
            const resp = await fetch(`${host}/shoot`)
            this.speed = await resp.json()
            console.log(this.speed);
            
        }, 200)
    }
}