export default function fragmentShader() {
  return `
      uniform vec2 resolution; 
      uniform float time; 
      uniform float mouseX;
      uniform float mouseY;
      varying vec3 vUv;

      void main(){
          vec2 uv =  vUv.xy * 0.5; //(2.0 * vUv.xy - resolution.xy) / min(resolution.x, resolution.y) * 500.;
          vec2 uv2 = vUv.xy; //(2.0 * vUv.xy - resolution.xy) / min(resolution.x, resolution.y) * 500.;
          
          float r = 3.3 ;
          float z = 0.0;
          
          for(float i = 1.0; i < 10.0; i++){
              uv.x += 0.6 / i * cos(i * 2.5 * uv.y + time + (mouseY * 0.0001));
              uv.y += 0.6 / i * cos(i * 1.5 * uv.x + time + (mouseX * 0.0001));
          }
          float d = length(uv2 * uv);
          float col =  smoothstep(r - 300.0/resolution.y,r,d) ;


          
          //gl_FragColor = vec4(1.0 ,1.0, 1.0, 0.6);
          gl_FragColor = mix(vec4(.0, .0, .0, 1.), vec4((cos(1. * (uv.x))), 0.6 * cos(1.6 * (uv.x)), 0.3 * cos(2.5 * (uv.y)), 1.), col);


          //fragColor = vec4(1. * uv.x, 0.4 * uv.x, 0.5 * (sin(uv.x + uv.y) * uv.y), 1.0);
      }
  `
}
