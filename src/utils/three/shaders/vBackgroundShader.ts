export default function vertexShader() {
  return `
      varying vec3 vUv; 
  
      void main() {
        vUv = (modelMatrix * vec4(position, 1.0)).xyz; 
  
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
    `
}
