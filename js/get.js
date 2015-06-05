

function getMetalPrices(callback){
  var target = "http://www.frankieliu.com/ucsd/cse134b/prices.php";

  $.ajax({
    url: target,
    dataType: "json",
    success: function(result){
      callback(result);
    },
    error: function(result){
      console.log("ERROR: can't retrieve price information from server.");
    }
  });
}

function modifyPriceTable(table_id, metal){
  var bid = "$"+String(metal.bid).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  var ask = "$"+String(metal.ask).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  var change = "$"+String(metal.change).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  $(table_id +" tr:first-child td:first-child").html(bid);
  $(table_id +" tr:first-child td:nth-child(2)").html(ask);
  $(table_id +" tr:first-child td:nth-child(3)").html(change);

  var tag = $(table_id + " tr:first-child td:nth-child(3)");
  if(metal.change > 0) tag.attr("class","pos-change");
  else tag.attr("class","neg-change");
}

function homePageCallback(result){
  //fill in data
  modifyPriceTable("#gold_price",result[0]);
  modifyPriceTable("#silver_price",result[1]);
  modifyPriceTable("#platinum_price",result[2]);

  loadStackValue("All",result,true);
}

var inventory_index;
function inventoryCallback(result){
  var metal;
  if(inventory_index == "Gold"){
    modifyPriceTable("#price_table",result[0]);
  } else if(inventory_index == "Silver"){
    modifyPriceTable("#price_table",result[1]);
  } else{
    modifyPriceTable("#price_table",result[2]);
  }
  loadStackValue(inventory_index.toLowerCase(),result,false);
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


function loadStackValue(target_metal, metals, homepage){

  var size = myStackJson['gold'].length;
  console.log("myStackJson has " + size + " gold coins");

  //Guard, make sure myStackJson is ready
  if(!jsonFinished) loadMyStackJson();

  var totalValue = 0;
  var totalChange = 0;
  var originalValue = 0;

  var metal_stack;
  if(target_metal == 'All'){
    metal_stack = ['gold','silver','platinum'];  
  }else{
    metal_stack = [target_metal.toLowerCase()];
  }

  //make a map to translate metal names into indices
  var map = {'gold':0,'silver':1,'platinum':2}
  //Parse all 3 arrays
  for(var k = 0; k < metal_stack.length; k++){
    //get the array for each metal type
    var name = metal_stack[k];
    var array = myStackJson[name];
    //parse each coin of this metal type
    for(var i = 0; i < array.length; i++){
      var item = array[i];
      var weight = item.weight * item.purity * item.quantity;
      originalValue += item.unitPrice + item.premium;
      var value = weight * metals[map[name]].bid + item.premium;
      var change = weight * metals[map[name]].change;
      totalValue += value;
      totalChange += change;
    }
  }

  //calculate information
  var dailyChange = totalValue > 0 ? totalChange * 100 / totalValue : 0;
  var overallChange = totalValue > 0 ? totalValue / originalValue - 1 : 0;

  //Fix floating point precision
  totalValue = totalValue.toFixed(2);
  dailyChange = dailyChange.toFixed(2);
  overallChange = overallChange.toFixed(2);
  //Convert to strings
  totalValue = "$" + String(totalValue).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  dailyChange = (dailyChange > 0 ? "+" : "") + String(dailyChange) + "%";
  overallChange = (overallChange > 0 ? "+" : "") + String(overallChange) + "%";

  //update corresponding part of html
  $(".total-dollars").html(totalValue);
  if(homepage){
    $(".total-change").html(dailyChange);
    if(dailyChange[0] == '-') $(".total-change").attr("class","total-change neg-change");
  }else{
    $("#daily-change-percent").html(dailyChange);
    $("#overall_change_percent").html(overallChange);
    if(dailyChange[0] == '-') $("#daily-change-percent").attr("class","neg-change");
    if(overallChange[0] == '-') $("#overall_change_percent").attr("class","neg-change");
  }

}