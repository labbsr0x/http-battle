var request = require('request');

var headers = {
    'Host': `${process.env.HOST}`
};

var options = {
    url: `http://${process.env.HOST}/`,
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }else{

      console.error("NO-OK " + error);
    }
}

const trigger = setInterval(() => {
  const countdown = (parseInt(process.env.TRIGGER_TIME) - new Date().getTime())/1000
  console.log(`Faltam ${Math.round(countdown)} segundos`);
  if (countdown < 0) {
    const startTime = new Date().getTime()
    const runInterval = setInterval(() => {
      // console.log(options);
      request(options, callback);
      if (process.env.RUN_INTERVAL
        && (new Date().getTime()-startTime) > parseInt(process.env.RUN_INTERVAL) ) {
          clearInterval(runInterval)
        }
    }, 1);

    clearInterval(trigger)
  }

}, 1000)
