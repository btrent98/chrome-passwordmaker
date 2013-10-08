chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.password) {
        fillPasswords(request.password);
    } else if (request.username) {
        fillUsernames(request.username);
    } else if (request.hasPasswordField) {
      if (hasPasswordField()) {
        sendResponse({hasField: true});
      }
    }
});

function fillPasswords(password) {
    jQuery("input[type=password]").val(password);
}

function hasPasswordField() {
  fields = jQuery("input[type=password]");
  
  hasFields = false;
  
  if (fields && fields.length > 0) {
      hasFields = true;
  }
  
  return hasFields;
}

//
// jQuery regular expression filter selector from 
// http://james.padolsey.com/javascript/regex-selector-for-jquery/
//
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

function fillUsernames(uname) {
//	jQuery("input:regex(name,ID|un|name|user|usr|log|email|mail|acct|ssn)[type=text]").val(uname);
	jQuery("input:regex(name,id|un|name|user|usr|log|email|mail|acct|ssn)").each(function() 
		{
		if (($(this).attr("type").toLowerCase() == "text") || 
		    ($(this).attr("type").toLowerCase() == "email"))
			$(this).val(uname);
		});
}

