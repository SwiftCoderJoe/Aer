module.exports = {
  removeFirstMention: function (str) {
    var n = str.search("<"); //Search for @ (syntax <@SwiftCoderJoe#0000>)
    firstElement = str.slice(0,n); //Remove first part of the String, this part is finished
    secondElementUnfinished = str.slice(n, str.length); //remove second part of string, this part needs more handling
    for (var i = 0; i < secondElementUnfinished.length; i++) { //Iterate through the string
      if (secondElementUnfinished.charAt(i) === " ") { //Look for a space
        var h = i+1 //Show space location
      }
    }
    secondElement = secondElementUnfinished.slice(h,secondElementUnfinished.length); //Extract area from space
    return firstElement + secondElement
  }
}