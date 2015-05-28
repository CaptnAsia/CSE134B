
function extract(metals){
  var result = ["","","",0];
  var st1 = "bid&quot;:";
  var st2 = ",&quot;ask&quot;:";
  var st3 = ",&quot;high&quot;:";
  var st4 = "oneDayChange&quot;:";
  var st5 = ",&quot;oneDayPercentChange";

  var i = metals.indexOf(st1);
  var j = metals.indexOf(st2);
  var k = metals.indexOf(st3);
  var l = metals.indexOf(st4);
  var m = metals.indexOf(st5);

  result[0] = metals.substring(i+st1.length, j);
  result[1] = metals.substring(j+st2.length, k);
  result[2] = metals.substring(l+st4.length, m);
  result[3] = m;

  return result;
}

function getPricePackets(callback){
  var url = "http://integration.nfusionsolutions.biz/client/jmbullion/module/largehistoricalchart2/nflargehist?metal=gold";

  var xmlhttp;
  if (window.XMLHttpRequest) {
      xmlhttp= new XMLHttpRequest();
  } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var result = xmlhttp.responseText;
      var start = result.indexOf("<ul class=\"metals\">");
      var end = result.indexOf("<div class=\"metal-details\">");
      var metals = result.substring(start,end);

      var gold = extract(metals);
      metals = metals.substring(gold[3]+20);
      var silver = extract(metals);
      metals = metals.substring(silver[3]+20);
      var plat = extract(metals);

      callback(gold,silver,plat);
    }
  }

  xmlhttp.open("GET",url);
  xmlhttp.send();
}

function homePageCallback(gold,silver,plat){
  //fill in data
  $("#gold_price tr:first-child td:first-child").html("$"+gold[0]);
  $("#gold_price tr:first-child td:nth-child(2)").html("$"+gold[1]);
  $("#gold_price tr:first-child td:nth-child(3)").html("$"+gold[2]);
  $("#silver_price tr:first-child td:first-child").html("$"+silver[0]);
  $("#silver_price tr:first-child td:nth-child(2)").html("$"+silver[1]);
  $("#silver_price tr:first-child td:nth-child(3)").html("$"+silver[2]);
  $("#platinum_price tr:first-child td:first-child").html("$"+plat[0]);
  $("#platinum_price tr:first-child td:nth-child(2)").html("$"+plat[1]);
  $("#platinum_price tr:first-child td:nth-child(3)").html("$"+plat[2]);
  //adjust color
  var tag = $("#gold_price tr:first-child td:nth-child(3)");
  if(gold[2] > 0) tag.attr("class","pos-change");
  else tag.attr("class","neg-change");
  tag = $("#silver_price tr:first-child td:nth-child(3)");
  if(silver[2] > 0) tag.attr("class","pos-change");
  else tag.attr("class","neg-change");
  tag = $("#platinum_price tr:first-child td:nth-child(3)");
  if(plat[2] > 0) tag.attr("class","pos-change");
  else tag.attr("class","neg-change");
}


