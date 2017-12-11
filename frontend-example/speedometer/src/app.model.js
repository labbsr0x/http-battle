import manuh from 'manuh'
import { RhelenaPresentationModel } from 'rhelena'
export default class AppModel extends RhelenaPresentationModel {
    constructor() {
        super();
        this.servers = [{
            name: 'Native NET',
            host: "http://localhost:9005"
        },
        {
            name: 'HTTP',
            host: "http://localhost:9006"
        },
        {
            name: 'Fastify',
            host: "http://localhost:9007"
        },
        {
            name: 'Go Gorilla',
            host: "http://localhost:9000"
        }]
        this.prepareTimeout = null
        manuh.subscribe('servers/wakeup', msg => {
            this.prepareServers();
        })
    }

    prepareServers(){
      clearTimeout(this.prepareTimeout)
      this.prepareTimeout = setTimeout(function(){
        this.servers.map( async (server) => {
          fetch(`${server.host}/prepare`)
        })
      }.bind(this), 1000)
    }
}
