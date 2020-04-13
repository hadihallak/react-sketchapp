"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = __importStar(require("prop-types"));
var numberProp = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
exports.numberProp = numberProp;
var numberArrayProp = PropTypes.oneOfType([PropTypes.arrayOf(numberProp), numberProp]);
var fillProps = {
    fill: PropTypes.string,
    fillOpacity: numberProp,
    fillRule: PropTypes.oneOf(['evenodd', 'nonzero']),
};
exports.fillProps = fillProps;
var clipProps = {
    clipRule: PropTypes.oneOf(['evenodd', 'nonzero']),
    clipPath: PropTypes.string,
};
exports.clipProps = clipProps;
var definationProps = {
    name: PropTypes.string,
};
var strokeProps = {
    stroke: PropTypes.string,
    strokeWidth: numberProp,
    strokeOpacity: numberProp,
    strokeDasharray: numberArrayProp,
    strokeDashoffset: numberProp,
    strokeLinecap: PropTypes.oneOf(['butt', 'square', 'round']),
    strokeLinejoin: PropTypes.oneOf(['miter', 'bevel', 'round']),
    strokeAlignment: PropTypes.oneOf(['center', 'inner', 'outer']),
    strokeMiterlimit: numberProp,
};
exports.strokeProps = strokeProps;
var transformProps = {
    scale: numberProp,
    scaleX: numberProp,
    scaleY: numberProp,
    rotate: numberProp,
    rotation: numberProp,
    translate: numberProp,
    translateX: numberProp,
    translateY: numberProp,
    x: numberProp,
    y: numberProp,
    origin: numberProp,
    originX: numberProp,
    originY: numberProp,
    skew: numberProp,
    skewX: numberProp,
    skewY: numberProp,
    transform: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
var pathProps = __assign(__assign(__assign(__assign(__assign({}, fillProps), strokeProps), clipProps), transformProps), definationProps);
exports.pathProps = pathProps;
// normal | italic | oblique | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style
var fontStyle = PropTypes.oneOf(['normal', 'italic', 'oblique']);
// normal | small-caps | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-variant
var fontVariant = PropTypes.oneOf(['normal', 'small-caps']);
// normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight
var fontWeight = PropTypes.oneOf([
    'normal',
    'bold',
    'bolder',
    'lighter',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
]);
// normal | wider | narrower | ultra-condensed | extra-condensed |
// condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-stretch
var fontStretch = PropTypes.oneOf([
    'normal',
    'wider',
    'narrower',
    'ultra-condensed',
    'extra-condensed',
    'condensed',
    'semi-condensed',
    'semi-expanded',
    'expanded',
    'extra-expanded',
    'ultra-expanded',
]);
// <absolute-size> | <relative-size> | <length> | <percentage> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-size
var fontSize = numberProp;
// [[<family-name> | <generic-family>],]* [<family-name> | <generic-family>] | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family
var fontFamily = PropTypes.string;
/*
    font syntax [ [ <'font-style'> || <font-variant-css21> ||
    <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] |
    caption | icon | menu | message-box | small-caption | status-bar
    where <font-variant-css21> = [ normal | small-caps ]

    Shorthand property for setting ‘font-style’, ‘font-variant’,
    ‘font-weight’, ‘font-size’, ‘line-height’ and ‘font-family’.

    The ‘line-height’ property has no effect on text layout in SVG.

    Note: for the purposes of processing the ‘font’ property in SVG,
    'line-height' is assumed to be equal the value for property ‘font-size’

    https://www.w3.org/TR/SVG11/text.html#FontProperty
    https://developer.mozilla.org/en-US/docs/Web/CSS/font
    https://drafts.csswg.org/css-fonts-3/#font-prop
    https://www.w3.org/TR/CSS2/fonts.html#font-shorthand
    https://www.w3.org/TR/CSS1/#font
*/
var font = PropTypes.object;
// start | middle | end | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
var textAnchor = PropTypes.oneOf(['start', 'middle', 'end']);
// none | underline | overline | line-through | blink | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-decoration
var textDecoration = PropTypes.oneOf(['none', 'underline', 'overline', 'line-through', 'blink']);
// normal | <length> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing
var letterSpacing = numberProp;
// normal | <length> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/word-spacing
var wordSpacing = numberProp;
// auto | <length> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/kerning
var kerning = numberProp;
/*
Name: font-variant-ligatures
Value: normal | none | [ <common-lig-values> || <discretionary-lig-values> ||
  <historical-lig-values> || <contextual-alt-values> ]
    Initial: normal
    Applies to: all elements
    Inherited: yes
    Percentages: N/A
    Media: visual
    Computed value: as specified
    Animatable: no

  Ligatures and contextual forms are ways of combining glyphs to produce more harmonized forms.

  <common-lig-values>        = [ common-ligatures | no-common-ligatures ]
  <discretionary-lig-values> = [ discretionary-ligatures | no-discretionary-ligatures ]
  <historical-lig-values>    = [ historical-ligatures | no-historical-ligatures ]
  <contextual-alt-values>    = [ contextual | no-contextual ]

  https://developer.mozilla.org/en/docs/Web/CSS/font-variant-ligatures
  https://www.w3.org/TR/css-fonts-3/#font-variant-ligatures-prop
*/
var fontVariantLigatures = PropTypes.oneOf(['normal', 'none']);
var fontProps = {
    fontStyle: fontStyle,
    fontVariant: fontVariant,
    fontWeight: fontWeight,
    fontStretch: fontStretch,
    fontSize: fontSize,
    fontFamily: fontFamily,
    textAnchor: textAnchor,
    textDecoration: textDecoration,
    letterSpacing: letterSpacing,
    wordSpacing: wordSpacing,
    kerning: kerning,
    fontVariantLigatures: fontVariantLigatures,
    font: font,
};
exports.fontProps = fontProps;
/*
  Name Value Initial value Animatable
  lengthAdjust spacing | spacingAndGlyphs spacing yes
  https://svgwg.org/svg2-draft/text.html#TextElementLengthAdjustAttribute
  https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/lengthAdjust
 */
var lengthAdjust = PropTypes.oneOf(['spacing', 'spacingAndGlyphs']);
/*
  Name Value Initial value Animatable
  textLength <length> | <percentage> | <number> See below yes
  https://svgwg.org/svg2-draft/text.html#TextElementTextLengthAttribute
  https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/textLength
*/
var textLength = numberProp;
/*
  2.2. Transverse Box Alignment: the vertical-align property

  Name: vertical-align
  Value: <‘baseline-shift’> || <‘alignment-baseline’>
  Initial: baseline
  Applies to: inline-level boxes
  Inherited: no
  Percentages: N/A
  Media: visual
  Computed value: as specified
  Canonical order: per grammar
  Animation type: discrete
  This shorthand property specifies how an inline-level box is aligned within the line.
  Values are the same as for its longhand properties, see below.

  Authors should use this property (vertical-align) instead of its longhands.

  https://www.w3.org/TR/css-inline-3/#transverse-alignment
  https://drafts.csswg.org/css-inline/#propdef-vertical-align
 */
var verticalAlign = numberProp;
/*
  Name: alignment-baseline

  1.1 Value: auto | baseline | before-edge | text-before-edge | middle | central |
  after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | inherit
  2.0 Value: baseline | text-bottom | alphabetic | ideographic | middle | central |
  mathematical | text-top | bottom | center | top
  Initial: baseline
  Applies to: inline-level boxes, flex items, grid items, table cells
  Inherited: no
  Percentages: N/A
  Media: visual
  Computed value: as specified
  Canonical order: per grammar
  Animation type: discrete
  https://drafts.csswg.org/css-inline/#propdef-alignment-baseline
  https://www.w3.org/TR/SVG11/text.html#AlignmentBaselineProperty
  https://svgwg.org/svg2-draft/text.html#AlignmentBaselineProperty
  https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline
*/
var alignmentBaseline = PropTypes.oneOf([
    'baseline',
    'text-bottom',
    'alphabetic',
    'ideographic',
    'middle',
    'central',
    'mathematical',
    'text-top',
    'bottom',
    'center',
    'top',
    'text-before-edge',
    'text-after-edge',
    'before-edge',
    'after-edge',
    'hanging',
]);
/*
  2.2.2. Alignment Shift: baseline-shift longhand

  Name: baseline-shift
  Value: <length> | <percentage> | sub | super
  Initial: 0
  Applies to: inline-level boxes
  Inherited: no
  Percentages: refer to the used value of line-height
  Media: visual
  Computed value: absolute length, percentage, or keyword specified
  Animation type: discrete

  This property specifies by how much the box is shifted up from its alignment point.
  It does not apply when alignment-baseline is top or bottom.

  https://www.w3.org/TR/css-inline-3/#propdef-baseline-shift
*/
var baselineShift = PropTypes.oneOfType([
    PropTypes.oneOf(['sub', 'super', 'baseline']),
    PropTypes.arrayOf(numberProp),
    numberProp,
]);
/*
  6.12. Low-level font feature settings control: the font-feature-settings property

  Name: font-feature-settings
  Value: normal | <feature-tag-value> #
  Initial: normal
  Applies to: all elements
  Inherited: yes
  Percentages: N/A
  Media: visual
  Computed value: as specified
  Animatable: no

    This property provides low-level control over OpenType font features.

    It is intended as a way of providing access to font features
    that are not widely used but are needed for a particular use case.

    Authors should generally use ‘font-variant’ and its related subproperties
    whenever possible and only use this property for special cases where its use
    is the only way of accessing a particular infrequently used font feature.

    enable small caps and use second swash alternate
    font-feature-settings: "smcp", "swsh" 2;
    A value of ‘normal’ means that no change in glyph selection or positioning
    occurs due to this property.

    Feature tag values have the following syntax:

    <feature-tag-value> = <string> [ <integer> | on | off ]?
    The <string> is a case-sensitive OpenType feature tag. As specified in the
    OpenType specification, feature tags contain four ASCII characters.

    Tag strings longer or shorter than four characters,
    or containing characters outside the U+20–7E codepoint range are invalid.

    Feature tags need only match a feature tag defined in the font,
    so they are not limited to explicitly registered OpenType features.

    Fonts defining custom feature tags should follow the tag name rules
    defined in the OpenType specification [OPENTYPE-FEATURES].

    Feature tags not present in the font are ignored;
    a user agent must not attempt to synthesize fallback behavior based on these feature tags.

    The one exception is that user agents may synthetically support the kern feature with fonts
    that contain kerning data in the form of a ‘kern’ table but lack kern feature
    support in the ‘GPOS’ table.

    In general, authors should use the ‘font-kerning’ property to explicitly
    enable or disable kerning
    since this property always affects fonts with either type of kerning data.

    If present, a value indicates an index used for glyph selection.

    An <integer> value must be 0 or greater.

    A value of 0 indicates that the feature is disabled.

    For boolean features, a value of 1 enables the feature.

    For non-boolean features, a value of 1 or greater enables the
    feature and indicates the feature selection index.

    A value of ‘on’ is synonymous with 1 and ‘off’ is synonymous with 0.

    If the value is omitted, a value of 1 is assumed.

    font-feature-settings: "dlig" 1;       /* dlig=1 enable discretionary ligatures * /
    font-feature-settings: "smcp" on;      /* smcp=1 enable small caps * /
    font-feature-settings: 'c2sc';         /* c2sc=1 enable caps to small caps * /
    font-feature-settings: "liga" off;     /* liga=0 no common ligatures * /
    font-feature-settings: "tnum", 'hist'; /* tnum=1, hist=1 enable tabular numbers
                                              and historical forms * /
    font-feature-settings: "tnum" "hist";  /* invalid, need a comma-delimited list * /
    font-feature-settings: "silly" off;    /* invalid, tag too long * /
    font-feature-settings: "PKRN";         /* PKRN=1 enable custom feature * /
    font-feature-settings: dlig;           /* invalid, tag must be a string * /

    When values greater than the range supported by the font are specified,
    the behavior is explicitly undefined.

    For boolean features, in general these will enable the feature.

    For non-boolean features, out of range values will in general be equivalent to a 0 value.

    However, in both cases the exact behavior will depend upon the way the font is designed
    (specifically, which type of lookup is used to define the feature).

    Although specifically defined for OpenType feature tags,
    feature tags for other modern font formats that support font features
    may be added in the future.

    Where possible, features defined for other font formats
    should attempt to follow the pattern of registered OpenType tags.

    The Japanese text below will be rendered with half-width kana characters:

    body { font-feature-settings: "hwid"; /* Half-width OpenType feature * / }

    <p>毎日カレー食べてるのに、飽きない</p>

    https://drafts.csswg.org/css-fonts-3/#propdef-font-feature-settings
    https://developer.mozilla.org/en/docs/Web/CSS/font-feature-settings
*/
var fontFeatureSettings = PropTypes.string;
var textSpecificProps = __assign(__assign(__assign({}, pathProps), fontProps), { alignmentBaseline: alignmentBaseline,
    baselineShift: baselineShift,
    verticalAlign: verticalAlign,
    lengthAdjust: lengthAdjust,
    textLength: textLength, fontData: PropTypes.object, fontFeatureSettings: fontFeatureSettings });
// https://svgwg.org/svg2-draft/text.html#TSpanAttributes
var textProps = __assign(__assign({}, textSpecificProps), { dx: numberArrayProp, dy: numberArrayProp });
exports.textProps = textProps;
/*
  Name
  side
  Value
  left | right
  initial value
  left
  Animatable
  yes
  https://svgwg.org/svg2-draft/text.html#TextPathElementSideAttribute
*/
var side = PropTypes.oneOf(['left', 'right']);
/*
  Name
  startOffset
  Value
  <length> | <percentage> | <number>
  initial value
  0
  Animatable
  yes
  https://svgwg.org/svg2-draft/text.html#TextPathElementStartOffsetAttribute
  https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
 */
var startOffset = numberProp;
/*
  Name
  method
  Value
  align | stretch
  initial value
  align
  Animatable
  yes
  https://svgwg.org/svg2-draft/text.html#TextPathElementMethodAttribute
  https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
 */
var method = PropTypes.oneOf(['align', 'stretch']);
/*
  Name
  spacing
  Value
  auto | exact
  initial value
  exact
  Animatable
  yes
  https://svgwg.org/svg2-draft/text.html#TextPathElementSpacingAttribute
  https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
 */
var spacing = PropTypes.oneOf(['auto', 'exact']);
/*
  Name
  mid-line
  Value
  sharp | smooth
  initial value
  smooth
  Animatable
  yes
 */
var midLine = PropTypes.oneOf(['sharp', 'smooth']);
// https://svgwg.org/svg2-draft/text.html#TextPathAttributes
// https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
var textPathProps = __assign(__assign({}, textSpecificProps), { href: PropTypes.string.isRequired, startOffset: startOffset,
    method: method,
    spacing: spacing,
    side: side,
    midLine: midLine });
exports.textPathProps = textPathProps;
