import { RhelenaPresentationModel } from 'rhelena';
import { log } from 'util';
export default class ServerModel extends RhelenaPresentationModel {
    constructor(name, host, onWakeup) {
        super();
        this.name = name
        this.host = host
        this.onWakeup = onWakeup
        this.speed = 0
        this.active = false
        this.faults = 0
        this.interval = 200
        this.delay = this.interval

        this.fetch()
    }

    healthy() {
      if(!this.active)
        this.onWakeup()
      this.active = true
      this.faults = 0
      this.delay = this.interval
    }

    fallback() {
      this.active = false
      this.speed = 0
      this.delay = Math.min(++this.faults * 2 * this.interval, 5000)
    }

    fetch () {
      setTimeout(async function(){
        try{
          const resp = await fetch(`${this.host}/shoot`)
          this.speed = await resp.text()
          this.healthy()
        }catch(err){
          this.fallback()
        }
        this.fetch()
      }.bind(this), this.delay)
    }
}
