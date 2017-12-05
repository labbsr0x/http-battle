const logFine = require('debug')('fine')
const logInfo = require('debug')('info')
var request = require('request');

var headers = {
    'Host': `${process.env.HOST}`
};

var options = {
    url: `http://${process.env.HOST}/shoot`,
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        logFine(body);
    }else{

      console.error("NO-OK " + error);
    }
}

logFine("Server preparing... ")
var optionsPrepare = {
  url: `http://${process.env.HOST}/prepare`,
  headers: headers
};
request(optionsPrepare, (error, response, body) => {
  logFine("Server reset: " + body)
});

const  timespan = 15;
let scheduledTime = 0;
if (process.env.TRIGGER_TIME) {
  scheduledTime = parseInt(process.env.TRIGGER_TIME);
}else{
  let currDate = new Date()
  logInfo('currDate: ' + currDate)
  let currTime = currDate.getTime()
  
  let currTimeSpaned = currTime + timespan*1000
  let currDateSpaned = new Date(currTimeSpaned)
  logFine('currTimeSpaned:' + currDateSpaned)
  
  let scheduledTimeZeroSeconds = currTimeSpaned - new Date(currTimeSpaned).getSeconds()*1000
  logFine('scheduledTimeZeroSeconds:' + new Date(scheduledTimeZeroSeconds))

  scheduledTime = scheduledTimeZeroSeconds + Math.ceil(currDate.getSeconds()/timespan)*timespan*1000
  if (currDate.getSeconds() > currDateSpaned.getSeconds()) {
    scheduledTime = scheduledTimeZeroSeconds + Math.ceil(currDateSpaned.getSeconds()/timespan)*timespan*1000
  }
  
}
logInfo(`currentTime: ${new Date()} | ${new Date().getTime()}`)
logInfo(`scheduledTime: ${new Date(scheduledTime)} | ${scheduledTime}`)
const trigger = setInterval(() => {
  const countdown = (scheduledTime - new Date().getTime())/1000
  logFine(`Faltam ${Math.round(countdown)} segundos`);
  if (countdown < 0) {
    const startTime = new Date().getTime()
    const runInterval = setInterval(() => {
      // logFine(options);
      request(options, callback);
      if (process.env.RUN_INTERVAL
        && (new Date().getTime()-startTime) > parseInt(process.env.RUN_INTERVAL) ) {
          clearInterval(runInterval)
        }
    }, 1);

    clearInterval(trigger)
  }

}, 1000)
