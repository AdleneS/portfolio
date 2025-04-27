export default function textFragmentShader() {
  return `
    uniform vec2 resolution; 
    uniform float time; 
    varying vec3 vUv;
    uniform sampler2D perlinNoise;

    uniform float range;
    uniform float threshold;
    void main()
    {
        float alpha = smoothstep(threshold - range, threshold + range, texture2D(perlinNoise, vUv.xy * 2.).r * 2.);
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
        //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        //gl_FragColor = texture2D(perlinNoise, vUv.xy);
    }
  `
}
