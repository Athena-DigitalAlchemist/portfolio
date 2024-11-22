uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave effect
    float wave = sin(pos.x * 5.0 + uTime) * 0.1;
    pos.z += wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}