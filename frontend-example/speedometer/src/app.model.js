import { RhelenaPresentationModel } from 'rhelena';
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
    }

    prepareServers(){
      this.servers.map( server => {
        fetch(`${server.host}/prepare`)
      })
    }
}
