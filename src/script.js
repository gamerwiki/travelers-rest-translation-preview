const VERSION = '0.6.8'

const el_version = document.getElementById('version');
el_version.textContent = `v.${VERSION}`;

const emojis = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟",
  "🍡", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰","🎂","🍮", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🍯", "🥛", "☕️", "🍵", "🧃", "🥤",
  "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧉", "🍾"];
const emoji = document.getElementById('emoji');

function getRandomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

let selectedEmoji = getRandomNumber(emojis.length - 1);
emoji.textContent = emojis[selectedEmoji];

emoji.addEventListener('click', function () {
  selectedEmoji = getRandomNumber(emojis.length - 1);
  emoji.textContent = emojis[selectedEmoji];
});

let translation = "[ControllerType=You can click on it with [Action=LeftMouseDetect] or press [Action=OpenTavern]/You can press [Action=OpenTavern]] to [Red=open] and [Red=close] the tavern when you want. [Bounce=Cheers!]";

let controlType = "keyboard";
let gender = 'male';
let singlePlayer = true;
let textDirection = 'auto';

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

const singlePlayerToggle = document.getElementById('single-player');
singlePlayerToggle.addEventListener('change', function () {
  singlePlayer = singlePlayerToggle.checked;
  updatePreview();
});

const directionSelect = document.getElementById('direction-select');
const previewInfoButton = document.getElementById('preview-info-button');
const previewInfoPanel = document.getElementById('preview-info-panel');
const previewRepairNote = document.getElementById('preview-repair-note');
directionSelect.addEventListener('change', function () {
  textDirection = directionSelect.value;
  updatePreview();
});
previewInfoButton.addEventListener('click', function () {
  previewInfoPanel.hidden = !previewInfoPanel.hidden;
  previewInfoButton.setAttribute('aria-expanded', String(!previewInfoPanel.hidden));
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
    "LeftMouseDetect": "__IMGSTART__rb.png __TITLE__='RB'__IMGEND__",
    "RightMouseDetect": "__IMGSTART__lb.png __TITLE__'LB' __IMGEND__",
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

function sanitizePreviewHtml(markup) {
  const previewDocument = new DOMParser().parseFromString(`<div>${markup}</div>`, 'text/html');
  const previewRoot = previewDocument.body.firstElementChild;
  previewRoot.querySelectorAll('script, iframe, object, embed, style, link').forEach(function (element) {
    element.remove();
  });

  previewRoot.querySelectorAll('*').forEach(function (element) {
    Array.from(element.attributes).forEach(function (attribute) {
      const value = attribute.value.trim().toLowerCase();
      if (/^on/i.test(attribute.name) || /^(javascript|data):/.test(value)) {
        element.removeAttribute(attribute.name);
      }
      if (attribute.name === 'src' && !attribute.value.startsWith('./images/')) {
        element.removeAttribute(attribute.name);
      }
    });
  });
  return previewRoot.innerHTML;
}

function normalizeLineBreaks(inputText) {
  // Translation exports can contain escaped line breaks instead of literal
  // newlines. The legacy `\ \` marker also represents an empty line.
  return inputText
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\\s*\\/g, '\n\n');
}

function closeUnclosedRichTextTags(inputText) {
  // Some original and completed translations omit closing rich-text tags.
  // Repair only tags understood by this preview, leaving unknown markup alone.
  const supportedTags = 'bounce|wave|shake|pulse|wiggle|b|strong|i|em|u|size|color|align|link';
  const tagPattern = new RegExp(`<(/?)(${supportedTags})\\b[^>]*>`, 'gi');
  const openTags = [];
  repairedRichTextTags = [];
  let match;

  while ((match = tagPattern.exec(inputText)) !== null) {
    const tagName = match[2].toLowerCase();
    if (match[1]) {
      const matchingTag = openTags.lastIndexOf(tagName);
      if (matchingTag !== -1) openTags.splice(matchingTag, 1);
    } else if (!/\/\\s*>$/.test(match[0])) {
      openTags.push(tagName);
    }
  }

  const repairedTags = openTags.reverse();
  repairedTags.forEach(function (tagName) {
    if (!repairedRichTextTags.includes(tagName)) repairedRichTextTags.push(tagName);
  });
  return inputText + repairedTags.map(function (tagName) {
    return `</${tagName}>`;
  }).join('');
}

let repairedRichTextTags = [];

function replaceTagsAndActions(inputText, controlType) {
	animationPlaceholders.length = 0;
	inputText = normalizeLineBreaks(inputText);
	inputText = fixMissingClosingBracket(inputText);
  inputText = closeUnclosedRichTextTags(inputText);
  let actionTexts = (controlType === "keyboard") ? control.keyboard : control.gamepad;
  const spriteFallbacks = { Music: '♫', Break_Emote: '💥' };

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


  // Accept normal rich text as well as the doubled quotes found in some
  // AssetRipper/CSV exports: name="ruU" and name=""ruU"".
  inputText = inputText.replace(/<sprite\s+name\s*=\s*(?:"{1,2}|'{1,2})?([^"' >]+)(?:"{1,2}|'{1,2})?\s*\/?>/gi, function(match, spriteName) {
    const actionSprite = actionTexts[`"${spriteName}"`] || actionTexts[spriteName];
    if (actionSprite) return actionSprite;
    const sprite = runeSprites[spriteName];
    if (sprite) {
      const displayScale = 0.68;
      const baseFontSize = 20;
      const em = function (value) { return `${(value * displayScale / baseFontSize).toFixed(4)}em`; };
      return `<span class="game-sprite" role="img" aria-label="${spriteName}" style="--sprite-x:${em(-sprite.x)};--sprite-top:${em(-sprite.top)};--sprite-width:${em(sprite.width)};--sprite-height:${em(sprite.height)};--atlas-width:${em(110)};--atlas-height:${em(125)}"></span>`;
    }
    return spriteFallbacks[spriteName] || spriteName;
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

  inputText = inputText.replace(/\[ControllerType:\s?([\s\S]*?)\/\s?([\s\S]*?)\]/g, function(match, keyboardPart, gamepadPart) {
    return (controlType === "keyboard") ? keyboardPart : gamepadPart;
  });
  

  inputText = inputText.replace(/\[ControllerType=\s?([\s\S]*?)\/\s?([\s\S]*?)\]/g, function(match, keyboardPart, gamepadPart) {
    return (controlType === "keyboard") ? keyboardPart : gamepadPart;
  });

  inputText = inputText.replace(/\[ControllerType=\s?([\s\S]*?),\s?([\s\S]*?)\]/g, function(match, keyboardPart, gamepadPart) {
    return (controlType === "keyboard") ? keyboardPart : gamepadPart;
  });

  Object.keys(tagmap).forEach(function(tag) {
	  let customText = tagmap[tag];
	  let regex = new RegExp(tag, 'g');
	  inputText = inputText.replace(regex, customText);
	});

  //inputText = inputText.replace(/<color=(.*?)>/g, '<span style="color:$1;">').replace(/<\/color>/g,'</span>');
  inputText = inputText.replace(/<color=(["']?)(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\1>/g, '<span style="color:$2;">').replace(/<\/color>/g, '</span>');

  inputText = inputText.replace(/<\/?(b|strong)>/gi, function (match) {
    return match.charAt(1) === '/' ? '</strong>' : '<strong>';
  });
  inputText = inputText.replace(/<\/?(i|em)>/gi, function (match) {
    return match.charAt(1) === '/' ? '</em>' : '<em>';
  });
  inputText = inputText.replace(/<\/?u>/gi, function (match) {
    return match.charAt(1) === '/' ? '</u>' : '<u>';
  });
  inputText = inputText.replace(/<size\s*=\s*["']?(\d+(?:\.\d+)?)(%|px)?["']?\s*>/gi, '<span style="font-size:$1$2;">').replace(/<\/size>/gi, '</span>');

  inputText = inputText.replace(/<align\s*=\s*["']?center["']?\s*>/gi, '<span class="text-align-center">').replace(/<\/align>/gi, '</span>');
  inputText = inputText.replace(/<link\s*=\s*["']?[^>"']+["']?\s*>/gi, '<span class="translation-link">').replace(/<\/link>/gi, '</span>');
  inputText = inputText.replace(/<br\s*\/?>/gi, '<br>');

  inputText = inputText.replace(/\[[A-Za-z]+Gender\s*=\s*([\s\S]*?)\/\s*([\s\S]*?)\]/g, function(match, genderMale, genderFemale) {
  return (gender === "male") ? genderMale : genderFemale;
});

  inputText = inputText.replace(/\[SinglePlayer\s*=\s*([\s\S]*?)\/\s*([\s\S]*?)\]/g, function(match, singlePlayerText, multiplayerText) {
    return singlePlayer ? singlePlayerText : multiplayerText;
  });

  inputText = inputText.replace(/\[Brown2\s*=\s*([^\]]+)\]/g, '<span class="brown">$1</span>');

  inputText = replaceAnimatedText(inputText);
  return sanitizePreviewHtml(restoreAnimatedText(inputText));
}


const translationTextarea = document.getElementById("translation");
const preview = document.getElementById("preview");
const placeholderHint = document.getElementById('placeholder-hint');

// TextMeshPro rune entries from Travellers Rest's gamepad_buttons_ui_512TMPro atlas.
// The preview ships only the cropped rune area. AssetRipper stores the glyph Y
// coordinate from the bottom of the original 512x512 atlas.
const runeSprites = {};
const runeAtlasHeight = 512;
const runeCropTop = 350;
const runeRows = [
  ['A', 'B', 'C', 'D', 'E', 'F', 108],
  ['G', 'H', 'I', 'J', 'K', 'L', 91],
  ['M', 'N', 'O', 'P', 'Q', 'R', 74],
  ['S', 'T', 'U', 'V', 'W', 'X', 57],
  ['Y', 'Z', null, null, null, null, 40]
];
runeRows.forEach(function (row) {
  row.slice(0, 6).forEach(function (letter, column) {
    if (!letter) return;
    runeSprites[`ru${letter}`] = {
      x: 2 + column * 17,
      top: runeAtlasHeight - row[6] - 14 - runeCropTop,
      width: 12,
      height: letter === 'E' ? 15 : 14
    };
  });
});

// These four special glyphs are explicitly present in the exported TMP
// table. Their atlas rectangles are 16x14 at the top of the cropped region.
[
  ['RuneFail1', 1, 7],
  ['RuneFail2', 18, 7],
  ['RuneFail3', 1, 24],
  ['RuneFail4', 18, 24]
].forEach(function ([name, x, top]) {
  runeSprites[name] = { x, top, width: 16, height: 14 };
});

if(translationTextarea.value.trim().length <= 0){
  translationTextarea.value = translation;
  window.setTimeout(updatePreview, 0);
}

translationTextarea.addEventListener("input", function() {
  updatePreview()
});


function updatePreview() {
  let inputText = document.getElementById('translation').value;
  let previewDiv = document.getElementById('preview');
  let converted = replaceTagsAndActions(inputText,controlType)
  previewDiv.innerHTML = converted;
  const textNodes = [];
  const walker = document.createTreeWalker(previewDiv, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) {
    if (textNode.textContent.trim() && !textNode.parentElement.closest('.animated-text, bdi')) {
      textNodes.push(textNode);
    }
  }
  textNodes.forEach(function (node) {
    const isolatedText = document.createElement('bdi');
    isolatedText.dir = 'auto';
    node.parentNode.replaceChild(isolatedText, node);
    isolatedText.appendChild(node);
  });
  // Use an explicit direction for the preview block. CSS does not support
  // `direction: auto`; the HTML `dir` attribute is what determines the base
  // direction here, while isolated spans protect mixed-script segments.
  const resolvedDirection = textDirection === 'auto' ? getTextDirection(inputText) : textDirection;
  const isRtlPreview = resolvedDirection === 'rtl';
  previewDiv.dir = resolvedDirection;
  previewDiv.style.textAlign = isRtlPreview ? 'right' : 'left';
  previewRepairNote.hidden = repairedRichTextTags.length === 0;
  if (repairedRichTextTags.length > 0) {
    previewRepairNote.textContent = `Missing closing tags were repaired for this preview: ${repairedRichTextTags.map(function (tagName) {
      return `<${tagName}>`;
    }).join(', ')}.`;
  }
  placeholderHint.hidden = !/\{\d+\}/.test(inputText);
}

const samples = {
  original: translation,
  languages: '[Bounce=Cheers!] [Wave=Привет мир] [Shake=Καλημέρα] [Pulse=مرحبا]\n<b>你好世界</b> · <i>こんにちは世界</i> · <size=24>안녕하세요</size>',
  formatting: '<b>Bold text</b> · <i>Italic text</i> · <u>Underlined text</u> · <size=24>Large text</size> · [Red=Red text] · [Brown=Brown text]',
  'line-breaks': 'Line one\\nLine two\\n\\nLine four\\ \\Line six',
  rtl: '[Bounce=هذا نص عربي] [Wave=שלום עולם]\\nEnglish mixed with العربية and 日本語.',
  'game-tags': '<size=120%><wiggle>Nigel!</wiggle></size> <wave><sprite name="Music">Song</wave><br><align="center"><b>Centered</b></align> [Brown2=all year round] [PlayerGender=he/she] [SinglePlayer=alone/together]',
  'animation-modifiers': '<shake a=0.5>Half-strength shake</shake> · <shake s=2>Double-speed shake</shake> · <wiggle a=2 s=0.75>Stronger, slower wiggle</wiggle>',
  runes: 'Some people ask us to mix <sprite name="ruU"><sprite name="ruL"><sprite name="ruI"><sprite name="ruR"> with <sprite name="ruN"><sprite name="ruA"><sprite name="ruU">…',
  'rune-alphabet': 'Rune alphabet: <sprite name="ruA"><sprite name="ruB"><sprite name="ruC"><sprite name="ruD"><sprite name="ruE"><sprite name="ruF"><sprite name="ruG"><sprite name="ruH"><sprite name="ruI"><sprite name="ruJ"><sprite name="ruK"><sprite name="ruL"><sprite name="ruM"><sprite name="ruN"><sprite name="ruO"><sprite name="ruP"><sprite name="ruQ"><sprite name="ruR"><sprite name="ruS"><sprite name="ruT"><sprite name="ruU"><sprite name="ruV"><sprite name="ruW"><sprite name="ruX"><sprite name="ruY"><sprite name="ruZ">',
  'other-sprites': 'Other game sprites: <sprite name="Music"> <sprite name="Rowdy_Emote"> <sprite name="Break_Emote"> <sprite name="RuneFail1"><sprite name="RuneFail2"><sprite name="RuneFail3"><sprite name="RuneFail4">',
  controls: '[ControllerType=Move with [Action: WASD] and open the staff panel with [Action: Staff]/Move with [Action: WASD] and open the staff panel with [Action: Staff]]\\nAction placeholders: {0}, {1}, <sprite name="Music">',
  variants: '[PlayerGender=He/She] is playing [SinglePlayer=alone/together]. [PlayerGender=His/Her] tavern is ready!',
  layout: 'First line\\nSecond line\\n\\nFourth line\\ \Legacy blank line\\n<br>HTML break<align="center">Centered text</align>',
  'edge-cases': '[Bounce=Áé नमस्ते مرحبا 日本語 🍻] [Red=Unclosed color\\nLong text that should wrap cleanly without breaking the preview panel.'
};
const sampleSelect = document.getElementById('sample-select');
const samplesButton = document.getElementById('samples-button');
samplesButton.addEventListener('click', function () {
  translationTextarea.value = samples[sampleSelect.value];
  updatePreview();
});

// Render each animated character independently, which gives the text the
// staggered motion used by game UI rather than moving one solid text block.
const animationPlaceholders = [];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character];
  });
}

function splitIntoGraphemes(value) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(value), function (part) { return part.segment; });
  }
  return Array.from(value);
}

function getTextDirection(value) {
  const textOnly = value
    .replace(/<[^>]*>/g, '')
    .replace(/\[[A-Za-z][^\]=]*(?:=|:)/g, '')
    .replace(/\[\/?[A-Za-z][^\]]*\]/g, '');
  for (const character of splitIntoGraphemes(textOnly)) {
    if (/[\u0590-\u08ff]/.test(character)) return 'rtl';
    if (/\p{L}/u.test(character)) return 'ltr';
  }
  return 'ltr';
}

function parseAnimationModifiers(attributes) {
  const modifiers = { amplitude: 1, speed: 1 };
  const attributePattern = /\b(a|s)\s*=\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))/gi;
  let match;
  while ((match = attributePattern.exec(attributes || ''))) {
    const value = Number(match[2]);
    if (!Number.isFinite(value) || value <= 0) continue;
    if (match[1].toLowerCase() === 'a') modifiers.amplitude = value;
    if (match[1].toLowerCase() === 's') modifiers.speed = value;
  }
  return modifiers;
}

function addAnimatedText(content, effect, modifiers) {
  modifiers = modifiers || { amplitude: 1, speed: 1 };
  const animatedDocument = new DOMParser().parseFromString(`<div>${content}</div>`, 'text/html');
  const animatedRoot = animatedDocument.body.firstElementChild;
  const textNodes = [];
  const walker = animatedDocument.createTreeWalker(animatedRoot, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) textNodes.push(textNode);
  textNodes.forEach(function (node) {
    const fragment = animatedDocument.createDocumentFragment();
    splitIntoGraphemes(node.textContent).forEach(function (character, index) {
      const characterElement = animatedDocument.createElement('span');
      const isWhitespace = /^\s+$/.test(character);
      characterElement.className = isWhitespace ? 'animated-space' : 'animated-character';
      characterElement.style.setProperty('--character-index', index);
      characterElement.textContent = character;
      fragment.appendChild(characterElement);
    });
    node.parentNode.replaceChild(fragment, node);
  });
  const direction = getTextDirection(animatedRoot.textContent);
  const placeholder = `__ANIMATED_TEXT_${animationPlaceholders.length}__`;
  const animationStyle = ` style="--effect-amplitude:${modifiers.amplitude};--effect-speed:${modifiers.speed}"`;
  animationPlaceholders.push(`<span class="animated-text animated-${effect}"${animationStyle} dir="${direction}" aria-label="${escapeHtml(animatedRoot.textContent)}">${animatedRoot.innerHTML}</span>`);
  return placeholder;
}

function replaceAnimatedText(inputText) {
  inputText = inputText.replace(/\[(Bounce|Wave|Shake|Pulse|Wiggle)\s*=\s*([^\[\]]+)\]/gi, function (match, effect, content) {
    return addAnimatedText(content, effect.toLowerCase());
  });
  inputText = inputText.replace(/<(bounce|wave|shake|pulse|wiggle)([^>]*)>([\s\S]*?)<\/\1>/gi, function (match, effect, attributes, content) {
    return addAnimatedText(content, effect.toLowerCase(), parseAnimationModifiers(attributes));
  });
  return inputText;
}

function restoreAnimatedText(inputText) {
  return inputText.replace(/__ANIMATED_TEXT_(\d+)__/g, function (match, index) {
    return animationPlaceholders[Number(index)] || match;
  });
}
