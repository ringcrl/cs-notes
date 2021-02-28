// normal
vec3 blendNormal(vec3 base, vec3 blend) { return blend; }

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
  return (blendNormal(base, blend) * opacity + blend * (1.0 - opacity));
}

// add
float blendAdd(float base, float blend) { return min(base + blend, 1.0); }

vec3 blendAdd(vec3 base, vec3 blend) { return min(base + blend, vec3(1.0)); }

// average
vec3 blendAverage(vec3 base, vec3 blend) { return (base + blend) / 2.0; }

// color burn
float blendColorBurn(float base, float blend) {
  return (blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
  return vec3(blendColorBurn(base.r, blend.r), blendColorBurn(base.g, blend.g),
              blendColorBurn(base.b, blend.b));
}

// color dodge
float blendColorDodge(float base, float blend) {
  return (blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
  return vec3(blendColorDodge(base.r, blend.r),
              blendColorDodge(base.g, blend.g),
              blendColorDodge(base.b, blend.b));
}

// darken
float blendDarken(float base, float blend) { return min(blend, base); }

vec3 blendDarken(vec3 base, vec3 blend) {
  return vec3(blendDarken(base.r, blend.r), blendDarken(base.g, blend.g),
              blendDarken(base.b, blend.b));
}

// difference
vec3 blendDifference(vec3 base, vec3 blend) { return abs(base - blend); }

// exclusion
vec3 blendExclusion(vec3 base, vec3 blend) {
  return base + blend - 2.0 * base * blend;
}

// reflect
float blendReflect(float base, float blend) {
  return (blend == 1.0) ? blend : min(base * base / (1.0 - blend), 1.0);
}

vec3 blendReflect(vec3 base, vec3 blend) {
  return vec3(blendReflect(base.r, blend.r), blendReflect(base.g, blend.g),
              blendReflect(base.b, blend.b));
}

// glow
vec3 blendGlow(vec3 base, vec3 blend) { return blendReflect(blend, base); }

// hard light
float blendHardLight(float base, float blend) {
  return base < 0.5 ? (2.0 * base * blend)
                    : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend));
}

vec3 blendHardLight(vec3 base, vec3 blend) {
  return vec3(blendHardLight(base.r, blend.r), blendHardLight(base.g, blend.g),
              blendHardLight(base.b, blend.b));
}

// hard mix
float blendHardMix(float base, float blend) {
  if (blend < 0.5) {
    float vividLight = blendColorBurn(base, (2.0 * blend));
    return (vividLight < 0.5) ? 0.0 : 1.0;
  } else {
    float vividLight = blendColorDodge(base, (2.0 * (blend - 0.5)));
    return (vividLight < 0.5) ? 0.0 : 1.0;
  }
}

vec3 blendHardMix(vec3 base, vec3 blend) {
  return vec3(blendHardMix(base.r, blend.r), blendHardMix(base.g, blend.g),
              blendHardMix(base.b, blend.b));
}

// lighten
float blendLighten(float base, float blend) { return max(blend, base); }

vec3 blendLighten(vec3 base, vec3 blend) {
  return vec3(blendLighten(base.r, blend.r), blendLighten(base.g, blend.g),
              blendLighten(base.b, blend.b));
}

// linear burn
float blendLinearBurn(float base, float blend) {
  return max(base + blend - 1.0, 0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
  return max(base + blend - vec3(1.0), vec3(0.0));
}

// linear dodge
float blendLinearDodge(float base, float blend) {
  return min(base + blend, 1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
  return min(base + blend, vec3(1.0));
}

// linear light
float blendLinearLight(float base, float blend) {
  return blend < 0.5 ? blendLinearBurn(base, (2.0 * blend))
                     : blendLinearDodge(base, (2.0 * (blend - 0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
  return vec3(blendLinearLight(base.r, blend.r),
              blendLinearLight(base.g, blend.g),
              blendLinearLight(base.b, blend.b));
}

// multiply
vec3 blendMultiply(vec3 base, vec3 blend) { return base * blend; }

// negation
vec3 blendNegation(vec3 base, vec3 blend) {
  return vec3(1.0) - abs(vec3(1.0) - base - blend);
}

// overlay
float blendOverlay(float base, float blend) {
  return base < 0.5 ? (2.0 * base * blend)
                    : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
  return vec3(blendOverlay(base.r, blend.r), blendOverlay(base.g, blend.g),
              blendOverlay(base.b, blend.b));
}

// phoenix
vec3 blendPhoenix(vec3 base, vec3 blend) {
  return min(base, blend) - max(base, blend) + vec3(1.0);
}

// pin light
float blendPinLight(float base, float blend) {
  return (blend < 0.5) ? blendDarken(base, (2.0 * blend))
                       : blendLighten(base, (2.0 * (blend - 0.5)));
}

vec3 blendPinLight(vec3 base, vec3 blend) {
  return vec3(blendPinLight(base.r, blend.r), blendPinLight(base.g, blend.g),
              blendPinLight(base.b, blend.b));
}

// screen
float blendScreen(float base, float blend) {
  return 1.0 - ((1.0 - base) * (1.0 - blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
  return vec3(blendScreen(base.r, blend.r), blendScreen(base.g, blend.g),
              blendScreen(base.b, blend.b));
}

// soft light
float blendSoftLight(float base, float blend) {
  return (blend < 0.5)
             ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend))
             : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
  return vec3(blendSoftLight(base.r, blend.r), blendSoftLight(base.g, blend.g),
              blendSoftLight(base.b, blend.b));
}

// substract
float blendSubstract(float base, float blend) {
  return max(base + blend - 1.0, 0.0);
}

vec3 blendSubstract(vec3 base, vec3 blend) {
  return max(base + blend - vec3(1.0), vec3(0.0));
}

// vivid light
float blendVividLight(float base, float blend) {
  return (blend < 0.5) ? blendColorBurn(base, (2.0 * blend))
                       : blendColorDodge(base, (2.0 * (blend - 0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
  return vec3(blendVividLight(base.r, blend.r),
              blendVividLight(base.g, blend.g),
              blendVividLight(base.b, blend.b));
}

// snow color
vec3 RGBToHSL(vec3 color) {
  vec3 hsl;
  float fmin = min(min(color.r, color.g), color.b);
  float fmax = max(max(color.r, color.g), color.b);
  float delta = fmax - fmin;

  hsl.z = (fmax + fmin) / 2.0;

  if (delta == 0.0) {
    hsl.x = 0.0;
    hsl.y = 0.0;
  } else {
    if (hsl.z < 0.5)
      hsl.y = delta / (fmax + fmin);
    else
      hsl.y = delta / (2.0 - fmax - fmin);

    float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
    float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
    float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;

    if (color.r == fmax)
      hsl.x = deltaB - deltaG;
    else if (color.g == fmax)
      hsl.x = (1.0 / 3.0) + deltaR - deltaB;
    else if (color.b == fmax)
      hsl.x = (2.0 / 3.0) + deltaG - deltaR;

    if (hsl.x < 0.0)
      hsl.x += 1.0;
    else if (hsl.x > 1.0)
      hsl.x -= 1.0;
  }

  return hsl;
}

float HueToRGB(float f1, float f2, float hue) {
  if (hue < 0.0)
    hue += 1.0;
  else if (hue > 1.0)
    hue -= 1.0;
  float res;
  if ((6.0 * hue) < 1.0)
    res = f1 + (f2 - f1) * 6.0 * hue;
  else if ((2.0 * hue) < 1.0)
    res = f2;
  else if ((3.0 * hue) < 2.0)
    res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
  else
    res = f1;
  return res;
}

vec3 HSLToRGB(vec3 hsl) {
  vec3 rgb;

  if (hsl.y == 0.0)
    rgb = vec3(hsl.z);
  else {
    float f2;

    if (hsl.z < 0.5)
      f2 = hsl.z * (1.0 + hsl.y);
    else
      f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);

    float f1 = 2.0 * hsl.z - f2;

    rgb.r = HueToRGB(f1, f2, hsl.x + (1.0 / 3.0));
    rgb.g = HueToRGB(f1, f2, hsl.x);
    rgb.b = HueToRGB(f1, f2, hsl.x - (1.0 / 3.0));
  }

  return rgb;
}

vec3 blendSnowColor(vec3 blend, vec3 bgColor) {
  vec3 blendHSL = RGBToHSL(blend);
  vec3 hsl = RGBToHSL(bgColor);
  return HSLToRGB(vec3(blendHSL.r, blendHSL.g, hsl.b));
}

// snow hue
vec3 blendSnowHue(vec3 blend, vec3 bgColor) {
  vec3 baseHSL = RGBToHSL(bgColor.rgb);
  return HSLToRGB(vec3(RGBToHSL(blend.rgb).r, baseHSL.g, baseHSL.b));
}

vec3 blendFunc(vec3 base, vec3 blend, float opacity, int blendMode) {
  if (blendMode == 0)
    return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 1)
    return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 2)
    return (blendAverage(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 3)
    return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 4)
    return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 5)
    return (blendDarken(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 6)
    return (blendDifference(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 7)
    return (blendExclusion(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 8)
    return (blendGlow(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 9)
    return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 10)
    return (blendHardMix(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 11)
    return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 12)
    return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 13)
    return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 14)
    return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 15)
    return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 16)
    return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 17)
    return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 18)
    return (blendPhoenix(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 19)
    return (blendPinLight(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 20)
    return (blendReflect(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 21)
    return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 22)
    return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 23)
    return (blendSubstract(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 24)
    return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
  else if (blendMode == 25)
    return blendSnowColor(blend, blend);
  else if (blendMode == 26)
    return blendSnowHue(blend, blend);
  else
    return base;
}

vec4 blendTwoColor(vec4 fgColor, vec4 bgColor, int mode, float fgAlphaFactor) {
  fgColor = fgColor * fgAlphaFactor;

  int newBlendMode = mode;
  if (newBlendMode >= 1000) {
    if (fgColor.a == 0.0) {
      return fgColor;
    }
    newBlendMode = newBlendMode - 1000;
  }
  vec3 color =
      blendFunc(bgColor.rgb, clamp(fgColor.rgb * (1.0 / fgColor.a), 0.0, 1.0),
                1.0, newBlendMode);
  return vec4(bgColor.rgb * (1.0 - fgColor.a) + color.rgb * fgColor.a, 1.0);
}
