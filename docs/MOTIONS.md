# Reusable motion presets

```js
import {makeMotion, motionLabels} from '../player/motions.js';
const animation = makeMotion('walk', project.joints, project.size);
player.setAnimation(animation);
```

Eight presets: `sway`, `bounce`, `walk`, `jump`, `run`, `wave`, `dance`, `float`.
They return Rigpop-compatible `{duration, tracks}` with loop-matched endpoints.
Only roots receive translation. Dimensions scale the jump/bounce displacement.

Walking/running are stylized in-place gaits, not a foot-contact/IK solver. The
header/footer translate the entire canvas along a separate CSS path; the joints
still animate through the real Rigpop renderer. The loop resets offscreen.

For good results, place the root at the hips and add separate left/right leg and
arm chains. Descriptive names (hip, spine, head, lshoulder, lelbow, lhand,
lhip, lknee, lfoot, and right-side equivalents) help classification. Unnamed
joints use their rest positions relative to the root. Non-humanoid rigs may
look better with sway, float or bounce. Motion quality depends on the rig.

The mini editor keeps one uploaded project in memory, including edited joints
and motion, when switching characters. The dropdown lists My uploaded image
after upload. It does not survive page reload. Export embeds the source image
for use in the full Rigpop editor. A new upload replaces the previous upload.

Header/footer walkers have a shared pause control and stop under reduced
motion. Offscreen and hidden-tab canvas rendering is suspended by the player.
