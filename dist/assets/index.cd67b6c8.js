var Q=Object.defineProperty,Z=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var R=(t,e,o)=>e in t?Q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,C=(t,e)=>{for(var o in e||(e={}))te.call(e,o)&&R(t,o,e[o]);if(N)for(var o of N(e))oe.call(e,o)&&R(t,o,e[o]);return t},O=(t,e)=>Z(t,ee(e));var v=(t,e,o)=>(R(t,typeof e!="symbol"?e+"":e,o),o);import{P as ne,S as ae,C as h,T as j,L as re,a as ie,E as se,W as le,M as ce,G as ue,V as E,b as k,A as me,F as de,R as D,c as fe,d as A,e as pe,f as I,g as ve,h as B,w as V,i as he,j as ge,k as _e,l as xe,U as we,m as ye,u as U,o as $,n as be,p as Se,r as L,q as ze,s as Ce,t as ke,v as G,x as g,y as x,z as Pe,B as Me,D as W,H as P,I as Re,J as Ee,K as Be,N as Le,O as Te,Q as Fe,X as Ne}from"./vendor.1916fcf1.js";const Oe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}};Oe();function je(){const t=new ne(60,1,.1,1e3);return t.position.set(0,0,1),t}function De(){const t=new ae;t.background=new h(0);const e=new j().load("src/assets/environment.jpg");return e.minFilter=re,e.colorSpace=ie,e.mapping=se,t.environment=e,t}function Ae(){const t=new le({antialias:!0,alpha:!0});return t.setClearColor(0,0),t}const Y=(t,e,o)=>{e.aspect=(t==null?void 0:t.clientWidth)/(t==null?void 0:t.clientHeight),e.updateProjectionMatrix(),o.setSize(t==null?void 0:t.clientWidth,t==null?void 0:t.clientHeight),o.setPixelRatio(window.devicePixelRatio)};class Ie{constructor(e,o,n){window.addEventListener("resize",()=>{Y(e,o,n),this.onResize()}),Y(e,o,n)}onResize(){}}function H(t){return t.scene.children[0]}class Ve extends ce{constructor(e=6,o=!0){super();this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new h("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=n=>{n.uniforms=C(C({},n.uniforms),this.uniforms),this.anisotropy>0&&(n.defines.USE_ANISOTROPY=""),o?n.defines.USE_SAMPLER="":n.defines.USE_TRANSMISSION="",n.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +\u221E, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),n.fragmentShader=n.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${e}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${e})) , material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${e})), material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${e}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(n=>Object.defineProperty(this,n,{get:()=>this.uniforms[n].value,set:a=>this.uniforms[n].value=a}))}}async function Ue(t){const e=new ue,[o,n]=await Promise.all([await e.loadAsync("src/assets/twist.glb"),await e.loadAsync("src/assets/rubbon.glb")]);document.addEventListener("mousemove",r);let a=0,i=0;function r(u){a=u.clientX/window.innerWidth*2-1,i=-(u.clientY/window.innerHeight)*2+1}const s=H(o),l=H(n);return l.position.set(0,10,0),l.name="rubbon",l.rotation.x=-.7,l.rotation.z=-.7,l.tick=()=>{l.rotateY(Math.PI/2*-.001)},s.scale.set(.1,.1,.1),s.tick=()=>{const u=new E(a,i,0);u.unproject(t);const b=u.sub(t.position).normalize(),S=-t.position.z/b.z,z=t.position.clone().add(b.multiplyScalar(S));s.position.set(z.x,z.y,0),s.rotation.z-=.001,s.rotation.y-=.001},s.material=Object.assign(new Ve(6),{clearCoat:.01,clearCoatRoughness:1,chromaticAberration:2,transmission:1,roughness:.01,thickness:.5,ior:1.5,time:0,distortion:1,distortionScale:1,temporalDistortion:.2}),s.name="twist",{twist:s,rubbon:l}}function $e(){const t=new k(16777215,0,5),e=new k(16777215,0,20),o=new k(16777215,0,20),n=new k(16777215,0,5),a=new me(16777215,.1);return t.position.set(0,0,-3),e.position.set(2,1,3),o.position.set(-2,1,3),n.position.set(0,0,3),{ambient:a,point:t,point1:e,point2:o,point3:n}}class Ge{constructor(e,o,n,a){v(this,"camera");v(this,"scene");v(this,"renderer");v(this,"updatables");v(this,"composer");this.camera=e,this.scene=o,this.renderer=n,this.composer=a,this.updatables=[]}start(){this.renderer.setAnimationLoop(()=>{this.tick(),this.composer.render(this.scene,this.camera)})}stop(){this.renderer.setAnimationLoop(null)}tick(){for(const e of this.updatables)e.tick()}}function We(){return`
      varying vec3 vUv; 
      uniform float time; 

      void main() {
        vUv = position; 
  
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
    `}function Ye(){return`
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
  `}async function X(t,e,o,n="",a="#FFFFFF"){const i=new de,r=new j().load("src/assets/perlin_noise.png"),s=0,l=2,u=.2;r.wrapS=D,r.wrapT=D,r.repeat.set(4,4);const b=await new Promise(J=>i.load("fonts/dirty.json",J)),S=new fe(t,{font:b,size:e,depth:0,curveSegments:10,bevelEnabled:!1});S.center();const z=new A({uniforms:{time:{type:"f",value:s},perlinNoise:{type:"t",value:r},threshold:{type:"f",value:l},range:{type:"f",value:u}},vertexShader:We(),fragmentShader:Ye(),transparent:!0});new pe({map:r,color:a,reflectivity:10,refractionRatio:0});const d=new I(S,z);return d.position.set(o.x,o.y,o.z),d.tick=()=>{d.material.uniforms.threshold.value-=.003,d.material.uniforms.threshold.value<=0&&(d.material.transparent=!1)},d.name=n,d}function He(){return`
      varying vec3 vUv; 
  
      void main() {
        vUv = position; 
  
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
    `}function Xe(){return`
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
  `}function Ke(){document.addEventListener("mousemove",o);let t=0,e=0;function o(s){e=s.clientY,t=s.clientX}const n=new ve(12,6),a=0,i=new A({uniforms:{time:{type:"f",value:a},mouseX:{type:"f",value:t},mouseY:{type:"f",value:e},resolution:{value:new B(window.innerWidth,window.innerHeight)}},vertexShader:He(),fragmentShader:Xe()}),r=new I(n,i);return r.name="background",r.position.z=-4,r.tick=()=>{r.material.uniforms.time.value+=5e-4,r.material.uniforms.mouseX.value=t,r.material.uniforms.mouseY.value=e},r}function qe(t,e,o){V(()=>t.currentPage,n=>{setTimeout(()=>{Je(n,e,o)},1500)})}function Je(t,e,o){switch(t){case 1:e.background=new h(592137),e.getObjectByName("background").position.set(10,10,10),e.getObjectByName("name").position.set(10,10,10),e.getObjectByName("surname").position.set(10,10,10),e.getObjectByName("twist").scale.set(0,0,0),e.getObjectByName("rubbon").position.set(1.5,.4,-2),o.strength=.6,o.radius=.3;break;case 2:e.background=new h(592137),e.getObjectByName("background").position.set(10,10,10),e.getObjectByName("name").position.set(10,10,10),e.getObjectByName("surname").position.set(10,10,10),e.getObjectByName("rubbon").position.set(1.5,10,-2),e.getObjectByName("twist").scale.set(0,0,0);break;default:e.background=new h(592137),e.getObjectByName("background").position.set(0,0,-4),e.getObjectByName("name").position.set(0,.2,-2),e.getObjectByName("surname").position.set(0,-.1,-2),e.getObjectByName("rubbon").position.set(1.5,10,-2),e.getObjectByName("twist").scale.set(.1,.1,.1),o.strength=.3,o.radius=0;break}}let _,c,f,m,w,p,K;class Qe{constructor(e,o){K=o,_=je(),f=De(),c=Ae(),e==null||e.append(c.domElement),c.setPixelRatio(window.devicePixelRatio),c.setSize(e==null?void 0:e.clientWidth,e==null?void 0:e.clientHeight),w=new he(c);const n=new ge(_e),a=new xe(f,_),i=c.getPixelRatio(),r=n.material.uniforms;r.resolution={value:new B(1/(window.innerWidth*i),1/(window.innerHeight*i))},w.addPass(a),p=new we(new B(window.innerWidth,window.innerHeight),0,0,1),w.addPass(p),w.addPass(n),p.clearColor=new h(16777215),p.threshold=0,p.strength=.3,p.radius=0,new Ie(e,_,c),m=new Ge(_,f,c,w)}async init(){const{twist:e,rubbon:o}=await Ue(_),n=Ke(),a=await X("hI, i'm Adl\xC8nE",.3,new E(0,.2,-2),"name"),i=await X("fUll-StaCk deVelOpER",.16,new E(0,-.1,-2),"surname");qe(K,f,p),m.updatables.push(e),m.updatables.push(n),m.updatables.push(a),m.updatables.push(i),m.updatables.push(o);const r=$e();return f.add(r.point,e,r.ambient,r.point1,r.point2,r.point3,a,i,o,n),f}render(){c.render(f,_)}start(){m.start()}stop(){m.stop()}}function Ze(t){const e=document.querySelector("#scene-container");if(!e)return Promise.resolve(null);const o=new Qe(e,t);return o.init().then(a=>(o.start(),a))}const T=ye("pages",{state:()=>({page:0}),getters:{currentPage(t){return t.page}},actions:{increment(){this.page<2?this.page++:this.page=0},decrement(){this.page>0&&this.page--},setPage(t){this.page!==t&&(this.page=t)}}});function et(t){const e=T(),o=U();let n=0;const a=l=>{t.value||(t.value=!0,l.deltaY>0?e.increment():e.decrement(),s())};function i(l){n=l.touches[0].clientY}function r(l){l.changedTouches[0].clientY<n?e.increment():e.decrement(),n=0,s()}function s(){setTimeout(()=>{switch(t.value=!1,e.currentPage){case 0:o.push("/");break;case 1:o.push("/about");break;case 2:o.push("/experiences");break;case 3:o.push("/contact");break;default:o.push("/");break}},1500)}$(()=>{window.addEventListener("wheel",a),document.body.addEventListener("touchstart",i),document.body.addEventListener("touchend",r)}),be(()=>{window.removeEventListener("wheel",a)})}const tt=(t,e)=>{switch(e.path){case"/":t.setPage(0);break;case"/about":t.setPage(1);break;case"/experiences":t.setPage(2);break}},ot=Se({setup(t){const e=L(!1),o=L(null),n=T(),a=ze(),i=U();return et(e),$(()=>{window.innerWidth>1024?Ze(n).then(r=>{var s;o.value=r,(s=document.getElementById("loader"))==null||s.classList.add("fade-out")}):setTimeout(()=>{var r;(r=document.getElementById("loader"))==null||r.classList.add("fade-out")},500)}),Ce({title:"Adl\xE8ne SABA",meta:[{name:"description"}]}),i.afterEach(()=>{setTimeout(()=>{tt(n,a)},500)}),(r,s)=>{const l=G("router-view");return g(),ke(l)}}});const nt=Me('<div class="loader__tiles"><div class="loader__tile"></div><div class="loader__tile"></div><div class="loader__tile"></div><div class="loader__tile"></div><div class="loader__tile"></div></div>',1),at=[nt],rt={setup(t){const e=L(!1),o=T();return V(()=>o.currentPage,()=>{e.value=!0,setTimeout(()=>{e.value=!1},1500)}),(n,a)=>(g(),x("div",{class:Pe(["loader",{"loader--active":e.value}])},at,2))}};var F=(t,e)=>{const o=t.__vccOpts||t;for(const[n,a]of e)o[n]=a;return o};const it={},st={href:"mailto:votreadresse@mail.fr",class:"absolute top-1 left-1 btn btn-ghost normal-case text-xl"};function lt(t,e){return g(),x("a",st," Contact me ")}var ct=F(it,[["render",lt]]);const ut={},mt={id:"loader",class:"h-screen w-screen absolute z-10 flex justify-center items-center text-6xl bg-black",style:{transition:"all 5s ease-in-out","pointer-events":"none"}},dt=W("span",{class:"loadSpinner"},null,-1),ft=[dt];function pt(t,e){return g(),x("div",mt,ft)}var vt=F(ut,[["render",pt]]);const ht={},gt={class:"flex bg-transparent transition align-middle h-screen p-6"};function _t(t,e){const o=vt,n=G("router-view"),a=ct,i=rt;return g(),x(Re,null,[P(o),W("main",gt,[P(n)]),P(a),P(i)],64)}var xt=F(ht,[["render",_t]]);const wt={default:xt};function yt(t){return t.map(e=>{var o;return{path:e.path,component:wt[((o=e.meta)==null?void 0:o.layout)||"default"],children:[O(C({},e),{path:""})]}})}const bt="modulepreload",q={},St="/portfolio/",M=function(e,o){return!o||o.length===0?e():Promise.all(o.map(n=>{if(n=`${St}${n}`,n in q)return;q[n]=!0;const a=n.endsWith(".css"),i=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${i}`))return;const r=document.createElement("link");if(r.rel=a?"stylesheet":bt,a||(r.as="script",r.crossOrigin=""),r.href=n,document.head.appendChild(r),a)return new Promise((s,l)=>{r.addEventListener("load",s),r.addEventListener("error",l)})})).then(()=>e())};const zt={setup(t){return(e,o)=>(g(),x("div"))}},Ct=[{name:"about",path:"/about",component:()=>M(()=>import("./about.f7e0ffc6.js"),["assets/about.f7e0ffc6.js","assets/vendor.1916fcf1.js","assets/PageTitle.3150822d.js"]),props:!0},{name:"experiences",path:"/experiences",component:()=>M(()=>import("./experiences.36331956.js"),["assets/experiences.36331956.js","assets/experiences.120637b2.css","assets/vendor.1916fcf1.js","assets/PageTitle.3150822d.js"]),props:!0},{name:"index",path:"/",component:zt,props:!0},{name:"tool",path:"/tool",component:()=>M(()=>import("./tool.71ef3db1.js"),["assets/tool.71ef3db1.js","assets/vendor.1916fcf1.js"]),props:!0},{name:"all",path:"/:all(.*)*",component:()=>M(()=>import("./_...all_.7736f185.js"),["assets/_...all_.7736f185.js","assets/vendor.1916fcf1.js"]),props:!0}],kt=yt(Ct),Pt=Ee({history:Be("/portfolio/"),routes:kt});var Mt={en:{button:{about:t=>{const{normalize:e}=t;return e(["About"])},back:t=>{const{normalize:e}=t;return e(["Back"])},go:t=>{const{normalize:e}=t;return e(["GO"])},home:t=>{const{normalize:e}=t;return e(["Home"])},toggle_dark:t=>{const{normalize:e}=t;return e(["Toggle dark mode"])},toggle_langs:t=>{const{normalize:e}=t;return e(["Change languages"])}},intro:{desc:t=>{const{normalize:e}=t;return e(["Opinionated Vite Starter Template"])},"dynamic-route":t=>{const{normalize:e}=t;return e(["Demo of dynamic route"])},hi:t=>{const{normalize:e,interpolate:o,named:n}=t;return e(["Hi, ",o(n("name")),"!"])},aka:t=>{const{normalize:e}=t;return e(["Also known as"])},"whats-your-name":t=>{const{normalize:e}=t;return e(["What's your name?"])}},"not-found":t=>{const{normalize:e}=t;return e(["Not found"])}},"zh-CN":{button:{about:t=>{const{normalize:e}=t;return e(["\u5173\u4E8E"])},back:t=>{const{normalize:e}=t;return e(["\u8FD4\u56DE"])},go:t=>{const{normalize:e}=t;return e(["\u786E\u5B9A"])},home:t=>{const{normalize:e}=t;return e(["\u9996\u9875"])},toggle_dark:t=>{const{normalize:e}=t;return e(["\u5207\u6362\u6DF1\u8272\u6A21\u5F0F"])},toggle_langs:t=>{const{normalize:e}=t;return e(["\u5207\u6362\u8BED\u8A00"])}},intro:{desc:t=>{const{normalize:e}=t;return e(["\u56FA\u6267\u5DF1\u89C1\u7684 Vite \u9879\u76EE\u6A21\u677F"])},"dynamic-route":t=>{const{normalize:e}=t;return e(["\u52A8\u6001\u8DEF\u7531\u6F14\u793A"])},hi:t=>{const{normalize:e,interpolate:o,named:n}=t;return e(["\u4F60\u597D\uFF0C",o(n("name"))])},aka:t=>{const{normalize:e}=t;return e(["\u4E5F\u53EB"])},"whats-your-name":t=>{const{normalize:e}=t;return e(["\u8F93\u5165\u4F60\u7684\u540D\u5B57"])}},"not-found":t=>{const{normalize:e}=t;return e(["\u672A\u627E\u5230\u9875\u9762"])}}};const Rt=Le({legacy:!1,locale:"fr-FR",fallbackLocale:"en",messages:Mt});const Et=Te(),y=Fe(ot);y.use(Pt);y.use(Rt);y.use(Et);y.use(Ne());y.mount("#app");export{F as _};
