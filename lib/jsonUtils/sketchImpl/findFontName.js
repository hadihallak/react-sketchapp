"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hashStyle_1 = __importDefault(require("../../utils/hashStyle"));
var textLayers_1 = require("../textLayers");
// this borrows heavily from react-native's RCTFont class
// thanks y'all
// https://github.com/facebook/react-native/blob/master/React/Views/RCTFont.mm
var FONT_WEIGHTS = {
    ultralight: -0.8,
    '100': -0.8,
    thin: -0.6,
    '200': -0.6,
    light: -0.4,
    '300': -0.4,
    normal: 0,
    regular: 0,
    '400': 0,
    semibold: 0.23,
    demibold: 0.23,
    '500': 0.23,
    '600': 0.3,
    bold: 0.4,
    '700': 0.4,
    extrabold: 0.56,
    ultrabold: 0.56,
    heavy: 0.56,
    '800': 0.56,
    black: 0.62,
    '900': 0.62,
};
var isItalicFont = function (font) {
    var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);
    var symbolicTraits = traits[NSFontSymbolicTrait].unsignedIntValue();
    return (symbolicTraits & NSFontItalicTrait) !== 0;
};
var isCondensedFont = function (font) {
    var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);
    var symbolicTraits = traits[NSFontSymbolicTrait].unsignedIntValue();
    return (symbolicTraits & NSFontCondensedTrait) !== 0;
};
var weightOfFont = function (font) {
    var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);
    var weight = traits[NSFontWeightTrait].doubleValue();
    if (weight === 0.0) {
        var weights = Object.keys(FONT_WEIGHTS);
        var fontName_1 = String(font.fontName()).toLowerCase();
        var matchingWeight = weights.find(function (w) { return fontName_1.endsWith(w); });
        if (matchingWeight) {
            return FONT_WEIGHTS[matchingWeight];
        }
    }
    return weight;
};
var fontNamesForFamilyName = function (familyName) {
    var manager = NSFontManager.sharedFontManager();
    var members = NSArray.arrayWithArray(manager.availableMembersOfFontFamily(familyName));
    var results = [];
    for (var i = 0; i < members.length; i += 1) {
        results.push(members[i][0]);
    }
    return results;
};
var useCache = true;
var _cache = new Map();
var getCached = function (key) {
    if (!useCache)
        return undefined;
    return _cache.get(key);
};
exports.findFont = function (style) {
    var cacheKey = hashStyle_1.default(style);
    var font = getCached(cacheKey);
    if (font) {
        return font;
    }
    var defaultFontFamily = NSFont.systemFontOfSize(14).familyName();
    var defaultFontWeight = NSFontWeightRegular;
    var defaultFontSize = 14;
    var fontSize = style.fontSize ? style.fontSize : defaultFontSize;
    var fontWeight = style.fontWeight
        ? FONT_WEIGHTS[style.fontWeight.toLowerCase()]
        : defaultFontWeight;
    var familyName = defaultFontFamily;
    var isItalic = false;
    var isCondensed = false;
    if (style.fontFamily) {
        familyName = style.fontFamily;
    }
    if (style.fontStyle) {
        isItalic = textLayers_1.FONT_STYLES[style.fontStyle] || false;
    }
    var didFindFont = false;
    // Handle system font as special case. This ensures that we preserve
    // the specific metrics of the standard system font as closely as possible.
    if (familyName === defaultFontFamily || familyName === 'System') {
        font = NSFont.systemFontOfSize_weight(fontSize, fontWeight);
        if (font) {
            didFindFont = true;
            if (isItalic || isCondensed) {
                var fontDescriptor = font.fontDescriptor();
                var symbolicTraits = fontDescriptor.symbolicTraits();
                if (isItalic) {
                    symbolicTraits |= NSFontItalicTrait;
                }
                if (isCondensed) {
                    symbolicTraits |= NSFontCondensedTrait;
                }
                fontDescriptor = fontDescriptor.fontDescriptorWithSymbolicTraits(symbolicTraits);
                font = NSFont.fontWithDescriptor_size(fontDescriptor, fontSize);
            }
        }
    }
    var fontNames = fontNamesForFamilyName(familyName);
    // Gracefully handle being given a font name rather than font family, for
    // example: "Helvetica Light Oblique" rather than just "Helvetica".
    if (!didFindFont && fontNames.length === 0) {
        font = NSFont.fontWithName_size(familyName, fontSize);
        if (font) {
            // It's actually a font name, not a font family name,
            // but we'll do what was meant, not what was said.
            familyName = font.familyName();
            fontWeight = style.fontWeight ? fontWeight : weightOfFont(font);
            isItalic = style.fontStyle ? isItalic : isItalicFont(font);
            isCondensed = isCondensedFont(font);
        }
        else {
            font = NSFont.systemFontOfSize_weight(fontSize, fontWeight);
        }
        didFindFont = true;
    }
    if (!didFindFont) {
        // Get the closest font that matches the given weight for the fontFamily
        var closestWeight = Infinity;
        for (var i = 0; i < fontNames.length; i += 1) {
            var match = NSFont.fontWithName_size(fontNames[i], fontSize);
            if (isItalic === isItalicFont(match) && isCondensed === isCondensedFont(match)) {
                var testWeight = weightOfFont(match);
                if (Math.abs(testWeight - fontWeight) < Math.abs(closestWeight - fontWeight)) {
                    font = match;
                    closestWeight = testWeight;
                }
            }
        }
    }
    // If we still don't have a match at least return the first font in the fontFamily
    // This is to support built-in font Zapfino and other custom single font families like Impact
    if (!font) {
        if (fontNames.length > 0) {
            font = NSFont.fontWithName_size(fontNames[0], fontSize);
        }
    }
    // TODO(gold): support opentype features: small-caps & number types
    if (font) {
        _cache.set(cacheKey, font);
    }
    return font;
};
function findFontName(style) {
    var font = exports.findFont(style);
    return font.fontDescriptor().postscriptName();
}
exports.default = findFontName;
