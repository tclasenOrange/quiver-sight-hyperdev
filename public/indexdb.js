var db=null;
window.indexDB = window.indexedDB||window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var connectToDB= function(){
  var version=1;
  var request= window.indexedDB.open("quiversight", version);
  request.onupgradeneeded = function(event){
    alert("onUpgradeNeeded fired");
    var db = event.target.result;
    db.createObjectStore("notes",{keyPath:"id", autoIncrement:true});
  };
  request.onsuccess = function(event){
    db=event.target.result;
    fetchNotes();
  };
  request.onerror = function(event){
    alert(event.debug[1].message);
  };
};

var fetchNotes = function(){
  var keyRange, request, result, store, transaction;
  
  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");
  
  //Get everything in the store
  keyRange = IDBKeyRange.lowerBound(0);
  request = store.openCursor(keyRange);
  
  request.onsucces= function(event){
    result = event.target.result;
    if(result){
      addToNotesList(result.key, result.value);
      result.continue();
    }
  };
  
  request.onerror = function ( event){
    alert("Unable to fetch records.");
  };
};

var addToNotesList = function(key, data){
  var item = $("<li>");
  var notes= $("#notes");
  
  item.attr("data-id", key);
  item.html(data.title);
  notes.append(item);
};

$("#notes").click(function(event){
  var element = $(event.target);
  if(element.is('li')){
    getNote(element.attr("data-id"));
  }
});

var getNote = function(id){
  var request, store, transaction;
  id=parseInt(id);
  
  transaction = db.transaction(["notes"]);
  store = transaction.objectStore("notes");
  
  request = store.get(id);
  
  request.onsucces = function(event){
    showNote(request.result);
  };
  
  request.onerror = function(error){
    alert("Unable to fetch record " + id);
  };
};

var showNote= function(data){
  var note=$("note");
  var title=$("title");
  
  title.val(data.title);
  title.attr("data-id", data.id);
  note.val(data.note);
  $("#delete_button").show();
};

$("new_button").click(function(event){
  newNote();
});

var newNote = function(){
  var note=$("#note");
  var title = $("#title");
  
  $("#delete_button").hide();
  title.removeAttr("data-id");
  title.val("");
  note.val("");
};

$("#save_button").click(function(event){
  var note, id, title;
  
  event.preventDefault();
  note=$("#note");
  title=$("#title");
  id=title.attr("data-id");
  
  if(id){
    updateNote(id, title.val(), note.val());
  }else{
    insertNote(title.val(), note.val());
  }
});

var insertNote = function(title, note){
  var data, key, transaction, store, request;
  data = {
    "title":title,
    "note": note
  };
  
  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");
  request = store.put(data);
  
  request.onsuccess = function(event){
    key = request.result;
    addToNotesList(key, data);
    newNote();
  };
};

var updateNote= function(id, title, note){
  var data, request, store, transaction;
  id=parseInt(id);
  data = {
    "title":title,
    "note":note,
    "id":id
  };
  
  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");
  request = store.put(data);
  
  request.onsuccess = function(event){
    $("#notes>li[data-id=" + id + "]").html(title);
  };
};

$("#delete_button").click(function(event){
  var title=$("#title");
  event.preventDefault();
  deleteNote(title.attr("data-id"));
});

var deleteNote = function(id){
  var request, store, transaction;
  
  id = parseInt(id);
  
  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");
  request = store.delete(id);
  
  request.onsuccess = function(event){
    $("#notes>li[data-id=" + id + "]").remove();
    newNote();
  };
};

$("#delete_all_button").click(function(id){
  clearNotes();
});

var clearNotes = function(id){
  var request, store, transaction
  
  transaction = db.transaction(["notes"], "readwrite");
  store = transaction.objectStore("notes");
  request = store.clear();
  
  request.onsuccess = function(event){
    $('#notes').empty();
  };
  
  request.onerror = function(event){
    alert("Unable to clear things out.");
  };
};

connectToDB();
newNote();