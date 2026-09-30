export const vertex = `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
export const rayFragment = `
precision highp float;
varying vec2 vUv;
uniform vec2 resolution;uniform vec3 eye,forward,right,up;uniform float fov,time;
uniform int steps,debug;uniform float innerR,outerR,thickness,temperature,emission,velocity,turbulence,turbSpeed,stars,galaxy;
const float PI=3.14159265359;
float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float n=0.,w=.5;for(int i=0;i<4;i++){n+=noise(p)*w;p=p*2.04+13.1;w*=.5;}return n;}
vec3 sky(vec3 d){vec3 q=d*190.;vec3 cell=floor(q);float rnd=hash(cell);float star=pow(max(0.,1.-length(fract(q)-.5)*2.),12.)*step(1.-stars*.003,rnd);float milky=exp(-pow((d.y+.21*d.x)/.12,2.))*fbm(d*7.)*galaxy;return vec3(.0018,.0028,.005)+vec3(.1,.12,.19)*milky+star*(vec3(.65,.78,1.)+rnd*vec3(.4,.2,0.))*3.;}
// G=c=1, Schwarzschild radius rs=1. Null rays are planar; u=1/r obeys
// d²u/dphi² = -u + 3u²/2. State (u,du/dphi,phi) is advanced by RK4.
vec2 derivative(vec2 state){return vec2(state.y,-state.x+1.5*state.x*state.x);}
vec2 rk4(vec2 s,float h){vec2 a=derivative(s),b=derivative(s+a*h*.5),c=derivative(s+b*h*.5),d=derivative(s+c*h);return s+h*(a+2.*b+2.*c+d)/6.;}
vec3 diskEmission(vec3 p,vec3 direction,out float g){float r=length(p);float phi=atan(p.z,p.x);float beta=clamp(velocity*sqrt(.5/max(r-1.,.1)),0.,.82);vec3 orbital=normalize(vec3(-p.z,0.,p.x));g=sqrt(max(1.-1./r,0.001))*sqrt(1.-beta*beta)/max(.15,1.+beta*dot(orbital,direction));float temp=temperature*pow(innerR/r,.72)*pow(max(.02,1.-sqrt(innerR/r)),.25);vec3 color=mix(vec3(1.,.18,.015),vec3(1.,.79,.42),smoothstep(2000.,8500.,temp));color=mix(color,vec3(.8,.91,1.),smoothstep(8500.,16000.,temp));float field=fbm(vec3(cos(phi+time*turbSpeed*.05)*r,sin(phi+time*turbSpeed*.05)*r,time*turbSpeed*.08));float band=.65+.35*sin(r*18.+phi*5.-time*.8+field*5.);float structure=max(.08,1.+turbulence*(field-.5)*2.3)*band;return color*emission*pow(g,3.)*pow(innerR/r,2.2)*structure*smoothstep(innerR,innerR+.3,r)*smoothstep(outerR,outerR-.7,r);}
void main(){vec2 screen=(vUv-.5)*2.;screen.x*=resolution.x/resolution.y;screen*=max(1.,resolution.y/resolution.x);vec3 ray=normalize(forward+(screen.x*right+screen.y*up)*tan(fov*.5));float r0=length(eye);vec3 e0=eye/r0;float radial=dot(ray,e0);vec3 tang=ray-radial*e0;float sinA=length(tang);vec3 e1=sinA>1.e-5?tang/sinA:normalize(cross(e0,vec3(0.,1.,.001)));float b=r0*sinA/sqrt(1.-1./r0);float u0=1./r0;float energy=1./max(b*b,1.e-10)-u0*u0+u0*u0*u0;vec2 s=vec2(u0,-sign(radial)*sqrt(max(energy,0.)));float phi=0.,used=0.,captured=0.,crossings=0.,gLast=1.;vec3 previous=eye,dir=ray,col=vec3(0.);float trans=1.;
// Terminate below r=1.002 (horizon), or after an outward escape to r>120.
// Plane crossings are processed in ray order, so the near image attenuates later images.
for(int i=0;i<640;i++){if(i>=steps)break;float h=clamp(.012/(.035+abs(s.y)),.006,.065);vec2 next=rk4(s,h);float nextPhi=phi+h;used=float(i)/float(steps);if(next.x>=.998){captured=1.;break;}if(next.x<=.0083){vec3 radialBasis=e0*cos(nextPhi)+e1*sin(nextPhi);vec3 angularBasis=-e0*sin(nextPhi)+e1*cos(nextPhi);dir=normalize(angularBasis*next.x-radialBasis*next.y);break;}vec3 p=(e0*cos(nextPhi)+e1*sin(nextPhi))/next.x;dir=normalize(p-previous);if(previous.y*p.y<=0.){float k=previous.y/(previous.y-p.y+1.e-8);vec3 hit=mix(previous,p,clamp(k,0.,1.));float r=length(hit);if(r>innerR&&r<outerR){float red;vec3 light=diskEmission(hit,dir,red);float opacity=clamp(.76+thickness*.55,.65,.98);col+=trans*light*opacity;trans*=1.-opacity;gLast=red;crossings+=1.;}}
previous=p;s=next;phi=nextPhi;if(phi>PI*5.)break;}
vec3 background=sky(dir);col+=trans*background*(1.-captured);
if(debug==1)col=vec3(used,used*used,1.-used);
if(debug==2)col=vec3(captured);
if(debug==3)col=vec3(crossings*.3,step(1.5,crossings),step(2.5,crossings));
if(debug==4)col=vec3(max(0.,gLast-1.),.12,1./max(gLast,1.))*(step(.5,crossings));
if(debug==5)col=.5+.5*dir;
if(debug==6)col=background*4.;
if(debug==7)col=col/(1.+col);
if(debug==8)col=vec3(fract(phi/PI),length(previous)/120.,captured);
if(debug==9)col=vec3(smoothstep(2.5,2.7,b),exp(-abs(b-2.598076)*10.),crossings*.2);
gl_FragColor=vec4(col,1.);
}`;
export const postFragment = `precision highp float;varying vec2 vUv;uniform sampler2D image;uniform vec2 texel;uniform float bloom,threshold,exposure,vignette,grain,dispersion,time;uniform int debug;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}void main(){vec2 d=(vUv-.5)*dispersion*.003;vec3 c=vec3(texture2D(image,vUv+d).r,texture2D(image,vUv).g,texture2D(image,vUv-d).b);vec3 glow=vec3(0.);for(int i=0;i<24;i++){float a=float(i)*2.399963;float radius=2.+float(i)*.9;vec3 s=texture2D(image,vUv+vec2(cos(a),sin(a))*texel*radius).rgb;glow+=max(s-vec3(threshold),0.);}if(debug==0)c+=glow/24.*bloom;c=aces(c*exposure);if(debug==0){c*=1.-vignette*pow(length((vUv-.5)*1.3),2.);c+=(hash(gl_FragCoord.xy+time)-.5)*grain*.035;}gl_FragColor=vec4(pow(max(c,vec3(0.)),vec3(1./2.2)),1.);}`;
