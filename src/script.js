const VERSION = '0.6.3'

const el_version = document.getElementById('version');
el_version.textContent = `v.${VERSION}`;

let translation = "[ControllerType=You can click on it with [Action=LeftMouseDetect] or press [Action=OpenTavern]/You can press [Action=OpenTavern]] to [Red=open] and [Red=close] the tavern when you want. ";

let controlType = "keyboard";
let gender = 'male';

const controlButtons = document.querySelectorAll('.controller-type .contol-button');

  controlButtons.forEach(function (button) {
    const controller = button.getAttribute("data-type");
    button.addEventListener("click", function (e) {
      controlButtons.forEach(function (otherButton) {
        otherButton.classList.remove('active');
      });
      button.classList.add('active');
      controlType = controller;
      updatePreview();
    });
  });

const genderButtons = document.querySelectorAll('.gender-select .gender-button');
const genderPreview = document.querySelector('.selected-gender');
genderButtons.forEach(function (button) {
    const selected = button.getAttribute("data-gender");
    button.addEventListener("click", function (e) {
      genderButtons.forEach(function (otherButton) {
        otherButton.classList.remove('active');
      });
      button.classList.add('active');
      gender = selected;
      genderPreview.textContent = gender;
      updatePreview();
    });
  });



let control = {
  keyboard: {
    "WASD": "__SPANOPEN 'brown'__SPANCLOSE__W/A/S/D__SPANEND__",
    "RightStick": "__SPANOPEN 'brown'__SPANCLOSE__Left Mouse Button__SPANEND__",
    "ObjectMove": "__SPANOPEN 'brown'__SPANCLOSE__Mouse__SPANEND__",
    "Objective": "__SPANOPEN 'brown'__SPANCLOSE__P__SPANEND__",
    "LeftMouseDetect": "__SPANOPEN 'brown'__SPANCLOSE__Left Mouse Button__SPANEND__",
    "RightMouseDetect": "__SPANOPEN 'brown'__SPANCLOSE__Right Mouse Button__SPANEND__",
    "{0}": "__SPANOPEN 'brown'__SPANCLOSE__SPACE__SPANEND__",
    "UIInteract": "__SPANOPEN 'brown'__SPANCLOSE__START__SPANEND__",
    "Interact": "__SPANOPEN 'brown'__SPANCLOSE__E__SPANEND__",
    "Rotate": "__SPANOPEN 'brown'__SPANCLOSE__R__SPANEND__",
    "Style": "__SPANOPEN 'brown'__SPANCLOSE__T__SPANEND__",
    "Use": "__SPANOPEN 'brown'__SPANCLOSE__F__SPANEND__",
    "BuildMode": "__SPANOPEN 'brown'__SPANCLOSE__B__SPANEND__",
    "SprintHoldAction": "__SPANOPEN 'brown'__SPANCLOSE__SHIFT__SPANEND__",
    "Select": "__SPANOPEN 'brown'__SPANCLOSE__F__SPANEND__",
    "OpenTavern": "__SPANOPEN 'brown'__SPANCLOSE__O__SPANEND__",
    "OpenInventory": "__SPANOPEN 'brown'__SPANCLOSE__I__SPANEND__",
    "Pause": "__SPANOPEN 'brown'__SPANCLOSE__Esc__SPANEND__",
    "OpenStats": "__SPANOPEN 'brown'__SPANCLOSE__L__SPANEND__",
    "OpenTalents": "__SPANOPEN 'brown'__SPANCLOSE__T__SPANEND__",
    "OpenXPModifiers": "__SPANOPEN 'brown'__SPANCLOSE__X__SPANEND__",
    "OpenRecipeBook": "__SPANOPEN 'brown'__SPANCLOSE__K__SPANEND__",
    "OpenQuests": "__SPANOPEN 'brown'__SPANCLOSE__H__SPANEND__",
    "ScrollUp": "__SPANOPEN 'brown'__SPANCLOSE__Mouse Scroll Up__SPANEND__",
    "ScrollDown": "__SPANOPEN 'brown'__SPANCLOSE__Mouse Scroll Down__SPANEND__",
    "\"Rowdy_Emote\"": "__IMGSTART__rowdy.png __TITLE__'Rowdy' __IMGEND__"
  },
  gamepad: {
    "WASD": "__IMGSTART__l_stick.png __TITLE__'Left Stick'  __IMGEND__",
    "RightStick": "__IMGSTART__r_stick.png __TITLE__'Right Stick' __IMGEND__",
    "ObjectMove": "__IMGSTART__r_stick.png __TITLE__'Right Stick' __IMGEND__",
    "Objective": "__IMGSTART__up.png __TITLE__'Up' __IMGEND__",
    "LeftMouseDetect": "__IMGSTART__rb.png title='RB'__IMGEND__",
    "{1}": "__IMGSTART__share.png __TITLE__'Interact' __IMGEND__",
    "UIInteract": "__IMGSTART__share.png __TITLE__'Share Button' __IMGEND__",
    "Interact": "__IMGSTART__a.png __TITLE__'A' __IMGEND__",
    "Rotate": "__IMGSTART__rb.png __TITLE__'RB' __IMGEND__",
    "Style": "__IMGSTART__lb.png __TITLE__'LB' __IMGEND__",
    "Use": "__IMGSTART__x.png __TITLE__'X' __IMGEND__",
    "BuildMode": "__IMGSTART__left.png __TITLE__'Left' __IMGEND__",
    "Up": "__IMGSTART__up.png __TITLE__'Up' __IMGEND__",
    "SprintHoldAction": "__IMGSTART__lt.png __TITLE__'LT' __IMGEND__",
    "Select": "__IMGSTART__y.png __TITLE__'A' __IMGEND__",
    "OpenTavern": "__IMGSTART__down.png __TITLE__'Down' __IMGEND__",
    "OpenInventory": "__IMGSTART__share.png __TITLE__'Share button' __IMGEND__",
    "Pause": "__IMGSTART__view.png __TITLE__'View button' __IMGEND__",
    "ScrollUp": "__IMGSTART__rb.png __TITLE__'RB' __IMGEND__",
    "ScrollDown": "__IMGSTART__lb.png __TITLE__'LB' __IMGEND__",
    "\"Rowdy_Emote\"": "__IMGSTART__rowdy.png __TITLE__'Rowdy' __IMGEND__",
    "UIAddRemove": "__IMGSTART__x.png __TITLE__'X' __IMGEND__",
  }
};

let tagmap = {
	"__SPANOPEN": "<span class=",
	"__SPANCLOSE__": ">",
	"__SPANEND__": "</span>",
	"__IMGSTART__" : "<img src='./images/",
	"__TITLE__": "' title=",
	"__IMGEND__": "/>"
}

function fixMissingClosingBracket(inputString) {
  let openBracketCount = 0;
  let closeBracketCount = 0;
  let fixedString = inputString;

  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === '[') {
      openBracketCount++;
    } else if (inputString[i] === ']') {
      closeBracketCount++;
    }
  }

  if (openBracketCount > closeBracketCount) {
    const missingBrackets = openBracketCount - closeBracketCount;
    for (let i = 0; i < missingBrackets; i++) {
      fixedString += ']';
    }
  }

  return fixedString;
}

function replaceTagsAndActions(inputText, controlType) {
  let actionTexts = (controlType === "keyboard") ? control.keyboard : control.gamepad;

  //inputText = fixMissingClosingBracket(inputText)

  inputText = inputText.replace(/\[Action[=:]\s*(.*?)\]/g, function(match, p1) {
    let customText = actionTexts[p1] || p1;
    return customText;
  });
  

  inputText = inputText.replace(/\[Brown=([^[\]]+\[[^\]]+\][^\]]*)\]/g, '__SPANOPEN"brown">$1__SPANEND__');

  inputText = inputText.replace(/\[Brown=([^\[\]]+)\]/g, '__SPANOPEN"brown"__SPANCLOSE__$1__SPANEND__');

  inputText = inputText.replace(/\[Red=([^[\]]+\[[^\]]+\][^\]]*)\]/g, '__SPANOPEN"red"__SPANCLOSE__$1__SPANEND__');

  inputText = inputText.replace(/\[Red=([^\[\]]+)\]/g, '__SPANOPEN"red"__SPANCLOSE__$1__SPANEND__');

  inputText = inputText.replace(/\[Grey=([^[\]]+\[[^\]]+\][^\]]*)\]/g, '__SPANOPEN"grey"__SPANCLOSE__$1__SPANEND__');

  inputText = inputText.replace(/\[Grey=([^\[\]]+)\]/g, '__SPANOPEN"grey"__SPANCLOSE__$1__SPANEND__');


  inputText = inputText.replace(/<sprite name=(.*?)>/g, function(match, p1) {
    let customText = actionTexts[p1] || p1;
    return customText ;
  });


  inputText = inputText.replace(/(\{0\})/g, function(match, p1) {
    let customText = actionTexts[p1] || p1;
    return customText ;
  });

  inputText = inputText.replace(/(\{1\})/g, function(match, p1) {
    let customText = actionTexts[p1] || p1;
    return customText ;
  });

  // /\[ControllerType: ([^\]]+), ([^\]]+)\]/g
  // /\[ControllerType:\s?([^\]]+),\s?([^\]]+)\]/g

  inputText = inputText.replace(/\[ControllerType:\s?([\s\S]*?),\s?([\s\S]*?)\]/g, function(match, keyboardPart, gamepadPart) {
    return (controlType === "keyboard") ? keyboardPart : gamepadPart;
  });
  

  inputText = inputText.replace(/\[ControllerType=\s?([\s\S]*?)\/\s?([\s\S]*?)\]/g, function(match, keyboardPart, gamepadPart) {
    return (controlType === "keyboard") ? keyboardPart : gamepadPart;
  });

  Object.keys(tagmap).forEach(function(tag) {
	  let customText = tagmap[tag];
	  let regex = new RegExp(tag, 'g');
	  inputText = inputText.replace(regex, customText);
	});

  inputText = inputText.replace(/<color=(.*?)>/g, '<span style="color:$1;">').replace(/<\/color>/g,'</span>');

  inputText = inputText.replace(/\[.*?Gender=\s?([\s\S]*?)\/\s?([\s\S]*?)\]/g, function(match, genderMale, genderFemale) {
  return (gender === "male") ? genderMale : genderFemale;
});

  return inputText;
}


const translationTextarea = document.getElementById("translation");
const preview = document.getElementById("preview");

if(translationTextarea.value.trim().length <= 0){
  translationTextarea.value = translation;
  let converted = replaceTagsAndActions(translation,controlType)
  preview.innerHTML = converted;
}

translationTextarea.addEventListener("input", function() {
  updatePreview()
});


function updatePreview() {
  let inputText = document.getElementById('translation').value;
  let previewDiv = document.getElementById('preview');
  let converted = replaceTagsAndActions(inputText,controlType)
  previewDiv.innerHTML = converted;
}