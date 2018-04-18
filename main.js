var countriesArray = [
   {"AR": "Argentina"},
   {"AW": "Aruba"},
   {"BO": "Bolivia"},
   {"CH": "Switzerland"},
   {"CU": "Cuba"},
   {"DO": "Dominica Republic"},
   {"GB-NIR": "Northern Ireland"},
   {"HR": "Croatia"},
   {"IN": "India"},
   {"JP": "Japan"},
   {"MG": "Madagascar"},
   {"MX": "Mexico"},
   {"NO": "Norway"},
   {"PL": "Poland"},
   {"RE": "Réunion"},
   {"SE": "Sweden"},
   {"SK": "Slovakia"},
   {"US": "United States"},
   {"ZW": "Zimbabwe"},
   {"AO": "Angola"},
   {"AX": "Âland Islands"},
   {"BR": "Brazil"},
   {"CN": "China"},
   {"CZ": "Czech Republic"},
   {"EC": "Ecuador"},
   {"FR": "France"},
   {"GB-SCT": "Scotland"},
   {"GT": "Guatemala"},
   {"HU": "Hungary"},
   {"IL": "Israel"},
   {"KZ": "Kazakhstan"},
   {"MQ": "Martinique"},
   {"MZ": "Mozambique"},
   {"PE": "Peru"},
   {"PR": "Puerto Rico"},
   {"RO": "Romania"},
   {"SG": "Singapore"},
   {"TN": "Tunisia"},
   {"UY": "Uruguay"},
   {"AT": "Austria"},
   {"BA": "Bosnia and Herzegovina"},
   {"BS": "The Bahamas"},
   {"CO": "Colombia"},
   {"DE": "Germany"},
   {"ES": "Spain"},
   {"GB": "United Kingdom"},
   {"GB-WLS": "Wales"},
   {"HK": "Hong Kong"},
   {"ID": "Indonesia"},
   {"IS": "Iceland"},
   {"LS": "Lesotho"},
   {"MT": "Malta"},
   {"NG": "Nigeria"},
   {"PK": "Pakistan"},
   {"PT": "Portugal"},
   {"RU": "Russia"},
   {"SI": "Slovenia"},
   {"TR": "Turkey"},
   {"VE": "Venezuela"},
   {"AU": "Australia"},
   {"BE": "Belgium"},
   {"BG": "Bulgaria"},
   {"CA": "Canada"},
   {"CR": "Costa Rica"},
   {"DK": "Denmark"},
   {"FI": "Finland"},
   {"GB-ENG": "England"},
   {"GR": "Greece"},
   {"HN": "Honduras"},
   {"IE": "Ireland"},
   {"IT": "Italy"},
   {"LU": "Luxemburg"},
   {"MU": "Mauritius"},
   {"NL": "Netherlands"},
   {"PH": "Philippines"},
   {"PY": "Paraguay"},
   {"SC": "Seychelles"},
   {"ST": "Sao Tome and Principe"},
   {"UA": "Ukraine"},
   {"ZA": "South Africa"},
]
var monthsArray = [
   { "1": "January"},
   { "2": "February"},
   { "3": "March"},
   { "4": "April"},
   { 5: "May"},
   { 6: "June"},
   { 7: "July"},
   { 8: "August"},
   { 9: "September"},
   { 10: "October"},
   { 11: "November"},
   { 12: "December"},
]
var yearsArray = [
   2000,
   2001,
   2002,
   2003,
   2004,
   2005,
   2006,
   2007,
   2008,
   2009,
   2010,
   2011,
   2012,
   2013,
   2014,
   2015,
   2016,
   2017
]

$(document).ready(function(){
   //Fill the option menu
   fillSelects(countriesArray, monthsArray, yearsArray);
   $('#searchBtn').click(function(){
      //take the selected option
      var selectedCountry = $('.nation option:selected').text();
      var selectedMonth = $('.month option:selected').text();
      var selectedYear = $('.year option:selected').text();
      //search for the iso code of the country
      var isoCodeCountry = findKeyOfNation(selectedCountry, countriesArray);
      var isoCodeMonth = findKeyOfMonth(selectedMonth, monthsArray);
      console.log(isoCodeCountry);
      console.log(isoCodeMonth);
      //make an ajax request to obtain the list of the holidays
      $.ajax({
         url: 'https://holidayapi.com/v1/holidays',
         method: 'GET',
         data: {
            key: "d78dd42e-cba8-48c7-8d81-b427ef44442e",
            country: isoCodeCountry,
            year: selectedYear,
            month: isoCodeMonth
         },
         success: function(data){
            //print the holiday List
            console.log(data);
            printHolidayData(data.holidays);
         },
         error: function(){
            alert('ERROR');
         }
      });
   });
});

//Function that fill the option values
function fillSelects(arrCountries, arrMonths, arrYears){
   var optNation = $('.nation');
   var optMonths = $('.month');
   var optYears = $('.year');
   //create an array with all the keys of the objects
   var objKeys = [];
   //fill the array with the objects keys
   for (var i = 0; i < arrCountries.length; i++) {
      objKeys.push(Object.keys(arrCountries[i]).toString());
   }
   //fill the select of countries
   for (var i = 0; i < arrCountries.length; i++) {
      optNation.append('<option value="cntry' + (i + 1) +'">' + arrCountries[i][objKeys[i]] + '</option>');
   }
   // fill the select of months
   for (var i = 0; i < arrMonths.length; i++) {
      optMonths.append('<option value="month' + (i + 1) + '">' + arrMonths[i][i + 1] + '</option>');

   }
   //fill the select of years
   for (var i = 0; i < arrYears.length; i++) {
      optYears.append('<option value="year' + (i + 1) + '">' + arrYears[i] + '</option>');

   }
}
//function to find the iso code of optNation
function findKeyOfNation(actualNation, arrCountries){
   for (var i = 0; i < arrCountries.length; i++) {
      var objKeys = [];
      //fill the array with the objects keys
      for (var i = 0; i < arrCountries.length; i++) {
         objKeys.push(Object.keys(arrCountries[i]).toString());
      }
      //declaring a var to save the key of the object
      var keyOfCountry = "";
      //Check if I find the country. If so exit from the loop
      var isFound = false;
      var cont = 0;
      do{
         if((arrCountries[cont][objKeys[cont]]) == actualNation){
            keyOfCountry = objKeys[cont];
            isFound = true;
         }
         else{
            cont++;
         }
      }while((!isFound) && (cont < arrCountries.length))
      return keyOfCountry;
   }
}
//function to finde the iso code of optMonths
function findKeyOfMonth(actualMonth, arrMonths){
   for (var i = 0; i < arrMonths.length; i++) {
      var objKeys = [];
      //fill the array with the objects keys
      for (var i = 0; i < arrMonths.length; i++) {
         objKeys.push(Object.keys(arrMonths[i]).toString());
      }
      //declaring a var to save the key of the object
      var keyOfMonth = "";
      //Check if I find the country. If so exit from the loop
      var isFound = false;
      var cont = 0;
      do{
         if((arrMonths[cont][objKeys[cont]]) == actualMonth){
            keyOfMonth = objKeys[cont];
            isFound = true;
         }
         else{
            cont++;
         }
      }while((!isFound) && (cont < arrMonths.length))
      return keyOfMonth;
   }
}
//function that prints the holidays data
function printHolidayData(info){
   console.log(info);
   $('#list-Holidays').children().remove();
   for (var i = 0; i < info.length; i++) {
      $('#list-Holidays').append('<div class="list-item">' + info[i].date + '</div>');
   }



}
