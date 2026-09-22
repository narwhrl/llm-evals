export const vertex = `
varying vec2 vUv;
void main(){ vUv=position.xy*0.5+0.5; gl_Position=vec4(position.xy,0.,1.); }
`;
export const rayFragment = `
precision highp float;
varying vec2 vUv;
uniform vec2 resolution;
uniform vec3 cameraOrigin;
uniform mat3 cameraBasis;
uniform float fov, aspect, simTime;
uniform float innerRadius,outerRadius,thickness,temperature,emission,orbitalSpeed,turbulence,turbulenceSpeed,starDensity,galaxy;
uniform int maxSteps,maxCrossings,debugMode;
uniform float angularStep;
const float PI=3.141592653589793;
float hash(vec3 p){p=fract(p*0.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,v=0.;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.07+vec3(7.1,1.3,3.7);a*=.5;}return v;}
vec2 skyUV(vec3 d){return vec2(atan(d.z,d.x)/(2.*PI)+.5,asin(clamp(d.y,-1.,1.))/PI+.5);}
vec3 background(vec3 d){
  vec3 axis=normalize(vec3(.35,.83,.42));
  float latitude=dot(d,axis);
  float clouds=fbm(d*7.);
  float band=exp(-pow(latitude/(.075+.04*clouds),2.));
  float dust=smoothstep(.25,.7,fbm(d*26.+4.));
  vec3 color=vec3(.0005,.0008,.0016)+galaxy*band*(.012+.12*pow(clouds,2.))*mix(vec3(.46,.58,.9),vec3(.88,.65,.44),clouds)*(.25+dust);
  vec2 uv=skyUV(d), grid=vec2(430.,215.), cell=floor(uv*grid), f=fract(uv*grid);
  // Procedural point sources on a periodic celestial sphere, filtered by pixel footprint.
  float footprint=clamp(max(length(dFdx(uv*grid)),length(dFdy(uv*grid))),.045,.65);
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    vec2 c=cell+vec2(float(x),float(y));c.x=mod(c.x,grid.x);
    float h=hash(vec3(c,13.));
    if(h>1.-.012*starDensity){
      vec2 pos=vec2(hash(vec3(c,7.)),hash(vec3(c,29.)));
      float dist=length(vec2(float(x),float(y))+pos-f);
      float radius=.035+footprint*.42;
      float glow=exp(-dist*dist/(radius*radius));
      float brightness=.4+4.*pow(hash(vec3(c,91.)),7.);
      color+=mix(vec3(.55,.7,1.),vec3(1.,.76,.47),hash(vec3(c,67.)))*glow*brightness*.055/max(radius*radius,.012);
    }
  }
  return color;
}
// Schwarzschild in r_s = 2GM/c^2 = 1 units. Each null geodesic is planar.
// u=1/r, w=du/dphi, u''=1.5*u^2-u. E=1, b=L/E.
// Derived from (du/dphi)^2 = 1/b^2 - u^2 + u^3.
vec2 derivative(vec2 s){return vec2(s.y,1.5*s.x*s.x-s.x);}
vec2 rk4(vec2 s,float h){vec2 a=derivative(s),b=derivative(s+.5*h*a),c=derivative(s+.5*h*b),d=derivative(s+h*c);return s+h*(a+2.*b+2.*c+d)/6.;}
vec3 pointOnRay(vec3 e1,vec3 e2,float phi,float u){return (e1*cos(phi)+e2*sin(phi))/max(u,1e-6);}
vec3 blackbody(float kelvin){
  // Planck samples at 650, 550, 450 nm; normalize chromaticity only.
  vec3 wavelength=vec3(.65,.55,.45);
  vec3 c=1./(pow(wavelength,vec3(5.))*(exp(14388./(wavelength*clamp(kelvin,1200.,30000.)))-1.));
  return c/max(max(c.r,c.g),c.b);
}
void diskEmission(vec3 p,vec3 backwardTangent,float pathLength,float observerR,inout vec3 radiance,inout float transmittance,out float shift){
  float r=length(p.xz);
  vec3 radial=normalize(p);
  // Coordinate tangent -> local static observer direction. Photon travels toward camera.
  float f=max(1.-1./length(p),.0001);
  float dr=dot(backwardTangent,radial);
  vec3 photon=normalize(-(backwardTangent-radial*dr+radial*dr/sqrt(f)));
  vec3 orbit=normalize(vec3(-p.z,0.,p.x));
  float beta=min(.85,orbitalSpeed/sqrt(2.*max(r-1.,.1)));
  shift=sqrt(f/(1.-1./observerR))*sqrt(1.-beta*beta)/(1.-beta*dot(orbit,photon));
  float angle=atan(p.z,p.x);
  float orbitalPhase=angle-simTime*turbulenceSpeed*2.4/pow(r,1.5);
  vec3 flow=vec3(cos(orbitalPhase)*r,sin(orbitalPhase)*r,r*.7);
  float wisps=fbm(flow*3.);
  float filaments=.5+.5*sin(r*19.+11.*wisps+3.*sin(orbitalPhase*4.+r));
  float structure=mix(1.,(.18+1.6*wisps)*(.72+.4*filaments),turbulence);
  float edge=smoothstep(innerRadius,innerRadius+.3,r)*(1.-smoothstep(outerRadius-.8,outerRadius,r));
  float vertical=exp(-2.5*pow(p.y/thickness,2.));
  float opacity=1.-exp(-pathLength*5.*edge*vertical);
  float radialHeat=pow(innerRadius/r,.72);
  vec3 color=blackbody(temperature*radialHeat*shift);
  float intensity=emission*pow(radialHeat,2.)*pow(shift,3.)*structure;
  radiance+=transmittance*opacity*color*intensity;
  transmittance*=1.-opacity;
}
void main(){
  vec2 screen=(vUv*2.-1.)*vec2(aspect,1.);
  vec3 direction=normalize(cameraBasis*vec3(screen*tan(radians(fov)*.5),-1.));
  float r0=length(cameraOrigin);
  vec3 e1=cameraOrigin/r0;
  float cosAlpha=dot(direction,e1);
  vec3 transverse=direction-cosAlpha*e1;
  float sinAlpha=length(transverse);
  vec3 e2=sinAlpha>1e-7 ? transverse/sinAlpha : normalize(cross(e1,abs(e1.y)<.9?vec3(0,1,0):vec3(1,0,0)));
  // Static tetrad: b=r*sin(alpha)/sqrt(1-r_s/r), du/dphi=-cos(alpha)/b.
  float impact=r0*sinAlpha/sqrt(1.-1./r0);
  vec2 state=vec2(1./r0,-cosAlpha/max(impact,1e-7));
  float phi=0.,transmittance=1.,termination=2.,steps=0.,crossings=0.,redshift=1.;
  vec3 previous=cameraOrigin,radiance=vec3(0),firstHit=vec3(0),escape=direction;
  bool wasInDisk=false;
  for(int i=0;i<640;i++){
    if(i>=maxSteps)break;
    steps=float(i+1);
    // Relative radial change bound plus a quality-controlled angular step.
    float h=min(angularStep,.12*max(state.x,.001)/max(abs(state.y),.001));
    vec2 next=rk4(state,h);
    float nextPhi=phi+h;
    if(next.x<=0.){
      // Interpolate the u=0 crossing: asymptotic sky direction at infinity.
      float escapePhi=mix(phi,nextPhi,state.x/(state.x-next.x));
      escape=normalize(e1*cos(escapePhi)+e2*sin(escapePhi));termination=0.;break;
    }
    vec3 current=pointOnRay(e1,e2,nextPhi,next.x);
    if(impact<1e-7){current=previous+direction*max(.03,length(previous)*.12);next.x=1./length(current);if(cosAlpha>0.&&length(current)>4096.){escape=direction;termination=0.;break;}}
    // Intersect the curved path segment with the finite-height emitting slab.
    vec3 segment=current-previous;
    float lo=0.,hi=1.;
    if(abs(segment.y)>1e-8){float a=(-thickness-previous.y)/segment.y,b=(thickness-previous.y)/segment.y;lo=max(0.,min(a,b));hi=min(1.,max(a,b));}
    else if(abs(previous.y)>thickness){hi=-1.;}
    bool inDisk=false;
    if(hi>lo){
      vec3 hit=mix(previous,current,(lo+hi)*.5);
      float radius=length(hit.xz);
      inDisk=radius>=innerRadius && radius<=outerRadius;
      if(inDisk){
        if(!wasInDisk){crossings+=1.;if(crossings==1.)firstHit=hit;}
        if(crossings<=float(maxCrossings)){
          float g;
          diskEmission(hit,normalize(segment),length(segment)*(hi-lo),r0,radiance,transmittance,g);
          if(crossings==1.)redshift=g;
        }
      }
    }
    wasInDisk=inDisk && abs(current.y)<=thickness;
    state=next;phi=nextPhi;previous=current;
    if(state.x>=1./1.0001){termination=1.;break;} // Absorbing event horizon.
  }
  vec3 sky=termination==0. ? background(escape):vec3(0.);
  vec3 hdr=radiance+sky*transmittance;
  vec3 outColor=hdr;
  if(debugMode==1)outColor=mix(vec3(.015,.03,.09),vec3(1.,.44,.12),pow(steps/float(maxSteps),.6));
  if(debugMode==2)outColor=termination==1.?vec3(.8,.15,.12):(termination==0.?vec3(.08,.35,.5):vec3(1.,0.,1.));
  if(debugMode==3)outColor=vec3(termination==1.?1.:0.);
  if(debugMode==4)outColor=crossings>0.?vec3(atan(firstHit.z,firstHit.x)/(2.*PI)+.5,length(firstHit.xz)/outerRadius,.25):vec3(0.);
  if(debugMode==5)outColor=crossings<.5?vec3(0.):(crossings<1.5?vec3(.15,.55,.8):(crossings<2.5?vec3(1.,.52,.15):vec3(.9,.15,.55)));
  if(debugMode==6)outColor=crossings>0.?mix(vec3(1.,.15,.07),vec3(.12,.55,1.),clamp((redshift-.45)/1.1,0.,1.)):vec3(0.);
  if(debugMode==7)outColor=termination==0.?vec3(skyUV(escape),.3):vec3(0.);
  if(debugMode==8)outColor=sky;
  if(debugMode==9)outColor=vec3(log2(1.+dot(hdr,vec3(.2126,.7152,.0722))))*.45;
  gl_FragColor=vec4(outColor,1.);
}
`;
export const bloomFragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D inputTexture;
uniform vec2 texel;
uniform float threshold;
uniform bool extract;
vec3 sampleColor(vec2 uv){vec3 c=texture2D(inputTexture,uv).rgb;if(extract){float b=max(max(c.r,c.g),c.b);c*=max(b-threshold,0.)/max(b,.0001);}return c;}
void main(){vec3 c=sampleColor(vUv)*.25;c+=sampleColor(vUv+texel*vec2(1,1))*.125;c+=sampleColor(vUv+texel*vec2(-1,1))*.125;c+=sampleColor(vUv+texel*vec2(1,-1))*.125;c+=sampleColor(vUv-texel)*.125;c+=sampleColor(vUv+texel*vec2(2,0))*.0625;c+=sampleColor(vUv-texel*vec2(2,0))*.0625;c+=sampleColor(vUv+texel*vec2(0,2))*.0625;c+=sampleColor(vUv-texel*vec2(0,2))*.0625;gl_FragColor=vec4(c,1.);}
`;
export const compositeFragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D sceneTexture,bloom0,bloom1,bloom2,bloom3,bloom4;
uniform float bloom,exposure,vignette,grain,dispersion,simTime;
uniform int debugMode;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
vec3 toSRGB(vec3 c){return mix(12.92*c,1.055*pow(max(c,vec3(0.)),vec3(1./2.4))-.055,step(vec3(.0031308),c));}
void main(){
 vec3 c=texture2D(sceneTexture,vUv).rgb;
 if(debugMode!=0){gl_FragColor=vec4(debugMode==8?toSRGB(aces(c)):clamp(c,0.,1.),1.);return;}
 vec2 offset=(vUv-.5)*dispersion;
 c.r=texture2D(sceneTexture,vUv+offset).r;c.b=texture2D(sceneTexture,vUv-offset).b;
 vec3 glow=texture2D(bloom0,vUv).rgb*.16+texture2D(bloom1,vUv).rgb*.22+texture2D(bloom2,vUv).rgb*.26+texture2D(bloom3,vUv).rgb*.2+texture2D(bloom4,vUv).rgb*.16;
 c=aces((c+bloom*glow)*exposure);
 c*=1.-vignette*smoothstep(.15,.72,length(vUv-.5));
 c=toSRGB(c);
 // Grain vanishes at zero radiance; the horizon has no self emission.
 c+=(hash(gl_FragCoord.xy+floor(simTime*24.))-.5)*grain*smoothstep(0.,.15,max(max(c.r,c.g),c.b));
 gl_FragColor=vec4(max(c,vec3(0.)),1.);
}
`;
