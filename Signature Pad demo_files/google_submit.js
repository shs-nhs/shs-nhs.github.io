var inputs = $('input[type="text"]');
var googleSubmitBtn = $('#google-submit');
var snackbar = $('#snackbar');

var inputFirstName = $('#fname');
var inputLastName = $('#lname');
var inputId = $('#iname');
var inputHours = $('#hname');

function isLoading(status){
  if(status){
    $('html, body').addClass('wait');
    googleSubmitBtn.attr('disabled', true).html('Submitting...');
  } else {
    $('html, body').removeClass('wait');
    googleSubmitBtn.attr('disabled', false).html('Submit');
  }
}

function checkInput(){
  var isEmpty = false;

  $.each(inputs, function (index, element) {
    if (element.value === '') {
      alert('Empty lines');
      isEmpty = true;
      return false;
    }
  });

  if (signaturePad.isEmpty()) {
    alert("Please provide a signature.");
    isEmpty = true;
    return false;
  }

  return isEmpty;
}

$('#google-submit').click(function () {

  if (checkInput()) { return; }

  isLoading(true);

  $.ajax({
    type: "POST",
    //url: "https://script.google.com/macros/s/AKfycby4EtzWYLXdGYn9kAzbdDSbZElwqWV8TS3LGJM_HJMjZFSNxAvo/exec",
    url: "https://script.google.com/macros/s/AKfycbzarmWaf3QOZ68_9neB49ckDzhPY4mECrBjdGQ4UR43yVCVIRKd/exec",
    data: {
      "First Name": inputFirstName.val(),
      "Last Name": inputLastName.val(),
      "ID": (inputId.val()).toString(),
      "Hours": (inputHours.val()).toString(),
      "Signature": signaturePad.toDataURL("image/jpeg"),
    },
    success: function (response) {
      isLoading(false);

      setTimeout(function () {
        snackbar.removeClass('show');
      }, 3000);

      signaturePad.clear();
      alert('Submitted!');
    },
    error: function (request, status, error) {
      isLoading(false);
      console.log("code:" + request.status + "\n" + "error:" + error);
      console.log(request.responseText);
    }
  });
});