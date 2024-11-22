uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec2 mousePos = uMouse * 2.0 - 1.0;
    float dist = length(uv - mousePos);
    
    // Create a more sophisticated gradient effect
    vec3 color1 = vec3(0.96, 0.96, 0.96); // Light color
    vec3 color2 = vec3(0.92, 0.92, 0.92); // Medium color
    vec3 color3 = vec3(0.88, 0.88, 0.88); // Darker color
    
    // Dynamic color mixing based on mouse position and time
    float mixFactor1 = sin(dist * 5.0 - uTime * 0.5) * 0.5 + 0.5;
    float mixFactor2 = cos(dist * 3.0 - uTime * 0.3) * 0.5 + 0.5;
    
    // Smooth color transitions
    vec3 gradientColor = mix(
        mix(color1, color2, mixFactor1),
        color3,
        mixFactor2 * uHover
    );
    
    // Add subtle vignette effect
    float vignette = smoothstep(1.5, 0.3, length(uv - 0.5));
    gradientColor = mix(gradientColor * 0.95, gradientColor, vignette);
    
    // Add interference pattern
    float interference = sin(uv.x * 50.0 + uv.y * 30.0 + uTime) * 0.02 * uHover;
    gradientColor += interference;
    
    gl_FragColor = vec4(gradientColor, 1.0);
}