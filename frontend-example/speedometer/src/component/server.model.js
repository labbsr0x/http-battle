import { RhelenaPresentationModel } from 'rhelena'
import manuh from 'manuh'
import { log } from 'util'
export default class ServerModel extends RhelenaPresentationModel {
    constructor(name, host) {
        super();
        this.name = name
        this.host = host
        this.speed = 0
        this.active = false
        this.faults = 0
        this.interval = 200
        this.delay = this.interval

        this.fetch()
    }

    healthy() {
      if(!this.active) { //signal wakeup
        manuh.publish('servers/wakeup', { host: this.host, name: this.name })
      }
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
