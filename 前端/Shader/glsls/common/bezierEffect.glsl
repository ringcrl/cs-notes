float easeInOutQuint(float t) {
  return t < 0.5 ? 16.0 * t * t * t * t * t
                 : 1.0 + 16.0 * (--t) * t * t * t * t;
}
