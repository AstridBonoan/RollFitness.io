/**
 * Inline script applied before paint so contrast / type / motion prefs do not flash.
 * Reads `rf-a11y` cookie.
 */
export const accessibilityBootstrapScript = `(function(){try{var raw=document.cookie.split('; ').find(function(r){return r.indexOf('rf-a11y=')===0});var s={high_contrast:false,font_scale:'default',reduce_motion:false};if(raw){try{s=Object.assign(s,JSON.parse(decodeURIComponent(raw.slice(7))))}catch(e){}}var root=document.documentElement;root.classList.remove('dark');root.classList.toggle('high-contrast',!!s.high_contrast);root.classList.toggle('font-scale-large',s.font_scale==='large');root.classList.toggle('font-scale-x-large',s.font_scale==='x-large');root.classList.toggle('reduce-motion',!!s.reduce_motion);root.style.colorScheme='light'}catch(e){}})();`;
