 // Builds up an array with global variable names, like
  // 'alert', 'document', and 'scrollTo'
  var terms = [];
  for (var kek in window)
    terms.push(kek);

  var textField = document.querySelector('#field');
  textField.addEventListener('input', function(event){
addList(createList(matchInput(textField.value)));
  });
  var leDiv = document.querySelector('#divSug');
  leDiv.addEventListener('click', function(event) {
    textField.value = event.target.textContent;
  });
  
  function createList(arr) {
    var rootNode = document.createElement("ul");
    var att = document.createAttribute("id");
    att.value = "suggestionList";
    rootNode.setAttributeNode(att);
    for(var i = 0 ; i< arr.length; i++) {
      rootNode.appendChild(createListElement(arr[i]));
    }
    return rootNode;
  }
  
  function matchInput(input) {
    var result = [];
    for(var i = 0; i<terms.length; i++) {
      if (-1 !== terms[i].search(input)){
        result.push(terms[i]);
      }
    }
    return result;
  }
  
  function createListElement(ele) {
    var listElement = document.createElement("li");
    var text = document.createTextNode(ele);
    listElement.appendChild(text);
    return listElement;
  }
  
  function addList(unorderdListNode) {
   var suggest = document.querySelector('#divSug');
   var sugList = document.querySelector('#suggestionList');
   if (sugList === null ){
  suggest.appendChild(unorderdListNode);
   }
  else {
  suggest.replaceChild(unorderdListNode, sugList);
  }
  }
  