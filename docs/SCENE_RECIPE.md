# Living world recipe
A website should prove the toolkit's capabilities, not just describe them.

1. Choose one visual world tied to the user's purpose. Use original/generated scenery, clearly identify generated imagery, and leave a deliberate text-safe region.
2. Put a real animated Rigpop subject in the scene. The sample player exports `createPlayer(canvas, demoId)` and supports octo, tulip, fish and hoodie drawn demos from Rigpop. `select(id)`, `toggle()`, `toggleBones()`, `setSpeed(number)`, `destroy()` are its methods. It is not yet a generic JSON loader.
3. Use large expressive typography, restrained supporting copy and one visible primary action. Character and text must not overlap on mobile.
4. Give visitors direct controls to switch subjects, pause, adjust tempo and see the actual skeleton. Animation is mesh deformation, not CSS bobbing applied to a flat image.
5. Preserve reduced motion (rest pose), pause offscreen rendering, handle failure and clean up on unmount.
6. Inspect the composed scene at 375 and 1440 pixels. The generated scene is a background, not evidence of real product functionality.

See `scene.js` for real integration and `player/rigpop-player.js` for the renderer extracted from the user's Rigpop repository. Do not embed the authoring editor as a marketing hero.

## Current original-art implementation
The homepage now uses `player/project-player.js` and real v2 JSON from `projects/cast/`, not the older demo-only API above. See README.md for the current interface. Ten new generated illustrations, cutouts and distinct loop-safe keyframe tracks drive the hero, gallery and mini editor.
