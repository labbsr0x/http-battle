var request = require('request');

var headers = {
    'Host': `${process.env.HOST}`
};

var options = {
    url: `http://${process.env.HOST}/piwik.php?debug=1&action_name=Labbs Piwik Crash&idsite=1&rec=1&r=330972&h=14&m=57&s=49&url=http://localhost:2015/&_id=b1c78468630e6725&_idts=1511387136&_idvc=9&_idn=0&_refts=0&_viewts=1511801804&send_image=1&pdf=0&qt=0&realp=0&wma=0&dir=0&fla=1&java=0&gears=0&ag=0&cookie=1&res=1680x1050&gt_ms=0&pv_id=UgIwRV`,
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
