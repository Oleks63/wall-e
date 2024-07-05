varying vec3 vNormal;
varying vec3 vCamera;
varying float vReflectionFactor;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vNormal = normal;
  vNormal *= rand(instanceMatrix[3].xz);

  vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position + vec3(0., .3, 0.), 1.);
  vReflectionFactor = .2 + 2. * pow(1. + dot(normalize(worldPosition.xyz - cameraPosition - vec3(1., 2., 0.)), normal), 3.);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}