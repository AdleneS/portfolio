export default function textVertexShader() {
  return /* glsl */ `
      varying vec3 vUv; 
      uniform float time; 

      void main() {
        vUv = position; 
  
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
    `
}
