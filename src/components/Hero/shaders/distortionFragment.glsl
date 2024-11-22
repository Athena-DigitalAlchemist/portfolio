uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uTexture;
uniform float uHover;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Distortion effect
    float distortion = sin(uv.y * 10.0 + uTime) * 0.01 * uHover;
    uv.x += distortion;
    
    // Mouse interaction
    vec2 mouse = uMouse / uResolution;
    float dist = length(uv - mouse);
    float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.1 * uHover;
    uv += mouseEffect * (uv - mouse);
    
    // Sample texture with distorted UVs
    vec4 texture = texture2D(uTexture, uv);
    
    // RGB split effect
    float r = texture2D(uTexture, uv + vec2(0.01, 0.0) * uHover).r;
    float g = texture.g;
    float b = texture2D(uTexture, uv - vec2(0.01, 0.0) * uHover).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
}