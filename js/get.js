

function getMetalPrices(callback){
  // var url = "http://integration.nfusionsolutions.biz/client/jmbullion/module/largehistoricalchart2/nflargehist?metal=gold";
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
    metal = result[0];
  }
  else if(inventory_index == "Silver"){
    modifyPriceTable("#price_table",result[1]);
    metal = result[1];
  }
  else{
    modifyPriceTable("#price_table",result[2]);
    metal = result[2];
  }
  loadStackValue(inventory_index.toLowerCase(),metal,false);
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

function loadStackValue(target_metal, metals, toggle){
  var Bullion = Parse.Object.extend("Bullion");
  var query = new Parse.Query(Bullion);
  query.containedIn('owner', [Parse.User.current()])
  query.find({
    success: function(results) {
      var totalValues = 0.0;
      var totalChanges = 0.0;
      var originalValues = 0.0;
      for(var i = 0; i < results.length; i++){
        var bullion = results[i];
        var metal = bullion.get('metal').toLowerCase();
        var weight = bullion.get('weight') * bullion.get('purity') * bullion.get('quantity');
        var origin = bullion.get('unitPrice') + bullion.get('premium');
        var value = 0;
        var change = 0;
        if(metal == target_metal){
          value = weight * metals.bid + bullion.get('premium');
          change = weight * metals.change;
        }else if(target_metal == "All"){
          var targetMetal = metals[2];
          if(metal == "gold") targetMetal = metals[0];
          else if(metal == "silver") targetMetal = metals[1];
          value = weight * targetMetal.bid + bullion.get('premium');
          change = weight * targetMetal.change;
        }else{
          origin = 0;
        }
        totalValues += value;
        totalChanges += change;
        originalValues += origin;
      }
      //update the percent change value
      var percentChange;
      var overalChange;
      if(totalValues == 0){
        percentChange = 0;
        overalChange = 0;
      }else{
        percentChange = totalChanges * 100 / totalValues;
        overalChange = (totalValues - originalValues) / originalValues;
      }
      percentChange = percentChange.toFixed(2);
      overalChange = overalChange.toFixed(2);
      var changeString = String(percentChange) + "%";
      var overalString = String(overalChange) + "%";
      if(percentChange > 0) changeString = "+" + changeString;
      if(overalChange > 0) overalString = "+" + overalString;

      //update the total value
      totalValues = totalValues.toFixed(2);
      totalValueString = "$" + String(totalValues);
      totalValueString = totalValueString.replace(/\d(?=(\d{3})+\.)/g, '$&,');
      $(".total-dollars").html(totalValueString);
      
      if(toggle){
        //For home page
        $(".total-change").html(changeString);
      }else{
        //For inventory page
        $("#daily-change-percent").html(changeString);
        $("#overall_change_percent").html(overalString);
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}