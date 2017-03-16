(function(){
var decimalbeats;
var beats;
var date = getOrdinalDate();
var timenode;
var datenode;

function isLeapYear(year) {
  return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
}
 
function getOrdinalDate() {
  var days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  var t = new Date();
 
  if (isLeapYear(t.getFullYear())) days[1]+=1;
  var jDate = 0;
  for (var i=0; i<t.getMonth(); i++) jDate+=days[i];
  jDate+=t.getDate();;
  if (jDate<100) jDate="0"+jDate;
  if (jDate<10) jDate="0"+jDate;
 
  return t.getFullYear() + "-" + jDate;
}

function updateClock() {
  setNewTime();
  var time = getInternetTime();
  var container = timenode.parentElement;
  container.removeChild(timenode);
  timenode.nodeValue = time;
  container.appendChild(timenode);
  document.title = getOrdinalDate() + " - " + time;
}

function getInternetTime(){
  if (decimalbeats <= 9) decimalbeats = "0" + decimalbeats;
  return "@" + (beats%1000) + "." + decimalbeats;
}

function setNewTime() {
  var d = new Date();
  var hours = d.getUTCHours()+1;
  var minutes = d.getUTCMinutes();
  var seconds = d.getUTCSeconds(); 
  var daysecs = 3600*hours + 60*minutes + seconds;
  var oldbeats = beats; // save the old beats in order to check for new day
  decimalbeats = daysecs / 0.86400;
  beats = Math.floor(decimalbeats / 100);
  if(beats != oldbeats && oldbeats == 999) datenode.nodeValue = getOrdinalDate(); // check for new day
  decimalbeats = Math.floor(decimalbeats - (100 * beats));
  if(decimalbeats > 99) decimalbeats = 99;
}

function createLink(link, text){
  var a = document.createElement('a');
  a.setAttribute('href', link); 
  var textnode = document.createTextNode(text);
  a.appendChild(textnode);
  return a;
}


window.onload = function(){
  var container = document.createElement('div');
  var what = document.createElement('div'); 
  what.setAttribute('id', 'what');
  what.appendChild(createLink('http://en.wikipedia.org/wiki/ISO_8601#Ordinal_dates', 'What is this?'));
  what.appendChild(document.createElement('br'));
  what.appendChild(createLink('http://en.wikipedia.org/wiki/Swatch_Internet_Time', 'What is that?'));
  container.appendChild(what);

  var title = document.createElement('div');
  title.setAttribute('id', 'title');
  title.appendChild(document.createTextNode('Current date and time:'));
  container.appendChild(title);

  var datediv = document.createElement('div');
  date = getOrdinalDate();  
  datediv.setAttribute('id', 'date');
  datenode = document.createTextNode('');
  datenode.nodeValue = date;
  datediv.appendChild(datenode);
  container.appendChild(datediv);

  setNewTime();

  var timediv = document.createElement('div');
  timediv.setAttribute('id', 'time');
  timenode = document.createTextNode('');
  timenode.nodeValue = getInternetTime();
  timediv.appendChild(timenode);
  container.appendChild(timediv);
  

  document.body.appendChild(container);

  updateClock();
  setInterval("updateClock()", 432);

  try {
    var pageTracker = _gat._getTracker("UA-6924019-1");
    pageTracker._initData();
    pageTracker._trackPageview();
  } catch(err) {}
}

})()
