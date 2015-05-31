

function getMetalPrices(callback){
  // var url = "http://integration.nfusionsolutions.biz/client/jmbullion/module/largehistoricalchart2/nflargehist?metal=gold";
  var target = "http://www.frankieliu.com/ucsd/cse134b/prices.php";

  $.ajax({
    url: target,
    dataType: "json",
    success: function(result){
      callback(result)
    },
    error: function(result){
      console.log("ERROR: can't retrieve price information from server.");
    }
  });
}

function modifyPriceTable(table_id, metal){
  $(table_id +" tr:first-child td:first-child").html("$"+metal.bid);
  $(table_id +" tr:first-child td:nth-child(2)").html("$"+metal.ask);
  $(table_id +" tr:first-child td:nth-child(3)").html("$"+metal.change);

  var tag = $(table_id + " tr:first-child td:nth-child(3)");
  if(metal.change > 0) tag.attr("class","pos-change");
  else tag.attr("class","neg-change");
}

function homePageCallback(result){
  //fill in data
  modifyPriceTable("#gold_price",result[0]);
  modifyPriceTable("#silver_price",result[1]);
  modifyPriceTable("#platinum_price",result[2]);
}

var inventory_index;
function inventoryCallback(result){
  if(inventory_index == "Gold"){
    modifyPriceTable("#price_table",result[0]);
  }
  else if(inventory_index == "Silver"){
    modifyPriceTable("#price_table",result[1]);
  }
  else{
    modifyPriceTable("#price_table",result[2]);
  }
}

function retrieveGetParameters(){
  var str = String(window.location);
  var i = str.indexOf("?");
  if(i == -1) return 0;
  var paras = str.substring(i+1);

  var result = new Object();
  while(paras.length > 0){
    // alert("paras = " + paras);
    i = paras.indexOf('=');
    if (i == -1) break;
    var key = paras.substring(0,i);
    paras = paras.substring(i+1);
    i = paras.indexOf('&');
    var value = "";
    if(i != -1){
      value = paras.substring(0,i);
      paras = paras.substring(i+1);
    }else if(paras.length > 0){
      value = paras;
      paras = "";
    }
    result[key] = value;
  }
  return result;
}

