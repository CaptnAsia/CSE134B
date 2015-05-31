

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

  var bidPrices = [0,0,0];
  bidPrices[0] = Number(result[0].bid);
  bidPrices[1] = Number(result[1].bid);
  bidPrices[2] = Number(result[2].bid);
  loadStackValue("All",bidPrices);
}

var inventory_index;
function inventoryCallback(result){
  var bidPrices;
  if(inventory_index == "Gold"){
    modifyPriceTable("#price_table",result[0]);
    bidPrices = result[0].bid;
  }
  else if(inventory_index == "Silver"){
    modifyPriceTable("#price_table",result[1]);
    bidPrices = result[1].bid;
  }
  else{
    modifyPriceTable("#price_table",result[2]);
    bidPrices = result[2].bid;
  }
  loadStackValue(inventory_index.toLowerCase(),bidPrices);
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

function loadStackValue(target_metal, bid_price){
  var Bullion = Parse.Object.extend("Bullion");
  var query = new Parse.Query(Bullion);
  query.containedIn('owner', [Parse.User.current()])
  query.find({
    success: function(results) {
      var totalValues = 0.0;
      for(var i = 0; i < results.length; i++){
        var bullion = results[i];
        var metal = bullion.get('metal').toLowerCase();
        var value = bullion.get('weight') * bullion.get('purity') * bullion.get('quantity');
        if(metal == "gold"){
          if(target_metal == "All"){
            value *= bid_price[0];
          }else if(target_metal == metal){
            value *= bid_price;
          }else{
            value = 0;
          }
        }else if(metal == "silver"){
          if(target_metal == "All"){
            value *= bid_price[1];
          }else if(target_metal == metal){
            value *= bid_price;
          }else{
            value = 0;
          }
        }else{
          if(target_metal == "All"){
            value *= bid_price[2];
          }else if(target_metal == metal){
            value *= bid_price;
          }else{
            value = 0;
          }
        }
        totalValues += value;
      }
      //update the value
      totalValues = totalValues.toFixed(2)
      priceValue = "$" + String(totalValues);
      priceValue = priceValue.replace(/\d(?=(\d{3})+\.)/g, '$&,');
      $(".total-dollars").html(priceValue);
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

// if (results.length === 0)
//       else {
//           totalBullionValue = 0;
//           for (var i = 0; i < results.length; i++) {
//               var bullion = results[i];
//               var metal = bullion.get('metal').toLowerCase();

//               myStackJson[metal].push({
//                   'id': bullion.id,
//                   'name': bullion.get('name'),
//                   'origin': bullion.get('origin'),
//                   'purchaseDate': bullion.get('purchaseDate'),
//                   'quantity': bullion.get('quantity'),
//                   'premium': bullion.get('premium'),
//                   'unitPrice': bullion.get('unitPrice'),
//                   'weight': bullion.get('weight'),
//                   'purity': bullion.get('purity')
//               });
//           }
//           //alert(JSON.stringify(myStackJson));

//           if (page === 'home.html' && pageLoaded) {
//               //loadTotalDaily();
//           }

//           // If the page has already loaded then call the loadMyStack function
//           if (page === 'inventory.html' && pageLoaded) {
//               var metal = getParameter('metal');
//               if (metal === '') {
//                   metal = 'gold';
//               }

//               loadPurityHeader(metal);
//               loadMyStack(metal);
//               // loadTotalValue(metal);
//               loadStackValue();

//               if (historicPrices) {
//                   loadMetalDaily(metal);
//               }
//           }
//       }
//         jsonFinished = true;
