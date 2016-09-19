var processLogin = function(form, event){
  event.preventDefault();
  var request=$.ajax({
    url:"/login",
    type:"POST",
    data: form.serialize(),
    dataType: "json"
  });
  request.done=function(){
    //Login works 
  };
  return (request);
};

var addFormSubmitWithCSSAnimation = function(){
  $(".login").submit(function(event){
    var form = $(this);
    request = processLogin(form, event);
    request.fail(function(){
      form.addClass('shake');
    });
  });
};

var addAnimationEndListener = function(){
  $('.login').on("webkitAnimationEnd onanimationend msAnimationEnd animationend", function(event){
    $(this).removeClass('shake');
  });
};

addFormSubmitWithCSSAnimation();
addAnimationEndListener();