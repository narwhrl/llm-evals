import test from 'node:test';
import assert from 'node:assert/strict';
// Independent double-precision reference. Integrate from infinity, r_s=1.
// Tests use analytic invariants, critical impact parameter and weak-field limit.
function trace(b,h=.001){
  let u=0,w=1/b,phi=0,maxError=0,crossings=0,previousY=1;
  const f=x=>1.5*x*x-x;
  for(let i=0;i<100000;i++){
    const a=[w,f(u)],bb=[w+h*a[1]/2,f(u+h*a[0]/2)],c=[w+h*bb[1]/2,f(u+h*bb[0]/2)],d=[w+h*c[1],f(u+h*c[0])];
    u+=h*(a[0]+2*bb[0]+2*c[0]+d[0])/6;w+=h*(a[1]+2*bb[1]+2*c[1]+d[1])/6;phi+=h;
    maxError=Math.max(maxError,Math.abs(w*w+u*u-u*u*u-1/(b*b)));
    // A tilted disk plane cuts the orbital plane along phi=.7+n*pi.
    const y=Math.sin(phi-.7);if(y*previousY<0&&u>0&&1/u>=3&&1/u<=10)crossings++;previousY=y;
    if(u>=1)return {captured:true,phi,maxError,crossings};
    if(u<0)return {captured:false,phi:phi-u/w,maxError,crossings};
  }
  throw Error('Reference trace exhausted');
}
test('critical capture boundary at b=3*sqrt(3)/2 r_s',()=>{
  const bc=3*Math.sqrt(3)/2;
  assert.equal(trace(bc*.999).captured,true);assert.equal(trace(bc*1.001).captured,false);
});
test('weak-field deflection tends to 2*r_s/b',()=>{
  const b=200,angle=trace(b).phi-Math.PI;
  assert.ok(Math.abs(angle-2/b)/(2/b)<.015,`${angle}`);
});
test('null energy invariant and step-size convergence',()=>{
  const coarse=trace(2.61,.01),fine=trace(2.61,.005),reference=trace(2.61,.0005);
  assert.ok(fine.maxError<1e-8);assert.ok(Math.abs(fine.phi-reference.phi)<Math.abs(coarse.phi-reference.phi));
});
test('one bent ray can encounter two distinct emitting disk crossings',()=>{
  const candidates=Array.from({length:100},(_,i)=>trace(2.6+i*.025,.003));
  assert.ok(candidates.some(t=>t.crossings>=2));
});
