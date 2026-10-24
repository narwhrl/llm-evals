# Visual References and Lighting Decisions

Research date: 2026-10-25. No reference image is shipped as a texture or copied into the scene. Geometry and textures remain procedural. Photographic observations below describe the cited images, not universal claims about Japanese streets.

## First-party and creator sources

1. **FamilyMart — store concept and official interior/sign photographs**
   <https://www.family.co.jp/famima/famima_e/concept.html>
   The page explicitly calls for an open facade, soft lighting, a calm interior, wood/tile/steel material contrast, and restrained sign illumination. The official photographs show bright but controlled interior downlights rather than an orange wash.
   **Applied as:** neutral-warm interior fill, broad low-glare storefront spill, and selective rather than global bloom.

2. **Lukasz Palka — “Optimizing Your Night Street Photography”**
   <https://www.lkazphoto.com/blog/how-to-optimize-your-night-street-photography>
   The Tokyo photographer recommends directional light and light/dark gradation for depth, identifies shop windows as large soft sources, and notes that wet surfaces catch artificial colors while puddles can act as mirrors.
   **Applied as:** lower uniform ambient illumination, two wide penumbral storefront spill lights, and preserved dark areas between local pools of light.

3. **Masahiro Miyagi — Japanese wet-street photograph**
   <https://unsplash.com/photos/a-wet-city-street-at-night-with-neon-signs-uZA3P4sA3tM>
   Direct inspection of the photograph shows blue-black shadows, localized wall/sign colors, and long cyan/orange reflections broken by surface texture.
   **Applied as:** cool shadow separation and anisotropic, interrupted reflection streaks instead of smooth elliptical color blobs.

4. **Andrea Román — “Rainy Night Street Scene in Tokyo”**
   <https://www.pexels.com/photo/rainy-night-street-scene-in-tokyo-31118383>
   Direct inspection shows fine rain streaks and the strongest warm reflections concentrated beneath their sources, with darker pavement outside those pools.
   **Applied as:** reduced uniform rain brightness and stronger source-to-ground reflection alignment.

## Rendering references

5. **Three.js — `UnrealBloomPass`**
   <https://threejs.org/docs/pages/UnrealBloomPass.html>
   The pass builds a mip chain for blurred highlight contributions; threshold controls which bright areas contribute.
   **Applied as:** restrained bloom (`strength 0.24`, `radius 0.42`, initial threshold `0.95`) so lamps glow without washing out toon outlines.

6. **Three.js — `OutputPass` and `EffectComposer`**
   <https://threejs.org/docs/pages/OutputPass.html>
   <https://threejs.org/docs/pages/EffectComposer.html>
   `OutputPass` applies the renderer's tone mapping and color-space conversion and belongs at the end of the chain.
   **Applied as:** `RenderPass → UnrealBloomPass → OutputPass`, with composer resize handling matching the renderer.

7. **Three.js — `RenderTarget.samples`**
   <https://threejs.org/docs/pages/RenderTarget.html>
   The documented `samples` option controls MSAA on offscreen render targets.
   **Applied as:** four-sample half-float scene target so postprocessing does not throw away edge antialiasing.

8. **Three.js — `SpotLight`**
   <https://threejs.org/docs/pages/SpotLight.html>
   `angle` and `penumbra` control cone spread and edge softness; intensity uses candela and physical decay defaults to 2.
   **Applied as:** broad, fully penumbral storefront lights with physical decay, approximating the large soft window source without a shadowed point hotspot.

## Scope

No people, interface elements, external image dependencies, brand logos, or new scene props are introduced by this revision. The changes are limited to lighting, atmosphere, wet-reflection rendering, and the supporting render pipeline.
