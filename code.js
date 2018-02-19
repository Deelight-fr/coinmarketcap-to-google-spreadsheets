function updateCoinmarketcapRates() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CMC rates"); 

    // always append new coins to the end of the list, to avoid ordering changes
    var mycoins = ['BTC', 'ETH', 'XLM'];

    // delete old rows
    var rows = sheet.getDataRange();
    var numRows = rows.getNumRows();
    sheet.deleteRows(2,numRows-1);
    
    var response = UrlFetchApp.fetch("https://api.coinmarketcap.com/v1/ticker/?limit=0&convert=EUR")
    var json = JSON.parse(response.getContentText());
    for (var i = 0; i < json.length; i++) {
        var idx = mycoins.indexOf(json[i].symbol);
        if (idx != -1) {
            sheet.getRange(idx+2,1).setValue(json[i].symbol);
            sheet.getRange(idx+2,2).setValue(json[i].price_usd);
            sheet.getRange(idx+2,3).setValue(json[i].price_eur);
            sheet.getRange(idx+2,4).setValue(json[i].price_btc);
        }
    }
}

function onOpen() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var entries = [{
        name : "Update CMC",
        functionName : "updateCoinmarketcapRates"
    }];
    sheet.addMenu("Scripts", entries);
};
