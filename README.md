# ✳ Wowkit
Give your coding agent a point of view.

A working v0.1 agent playbook, dependency-free effect library and visual starter for distinctive websites. Built fresh from the recovered project plan; not a restoration of Claude's missing source files.

## Run
Requires Python 3 for the static server. Node 18+ for the check scripts.

```sh
npm run dev
# open http://localhost:3000
npm run check
```
No npm install needed for the website. No external fonts, tracking, API keys or runtime dependencies.

## Give it to an agent
Copy this folder into your project, or publish it to your own repository and give the agent that URL. Tell it:

> Read AGENTS.md first. Build a site for [idea/audience]. The main action is [goal]. Use the recipes and effects selectively. Verify desktop, mobile, keyboard and reduced motion. Report actual test results.

A repository link only works with an agent that can read repositories. Otherwise provide AGENTS.md and the relevant files directly. The starter prompt on the demo is editable by copying it into your agent and replacing the placeholders.

## What's here
- `AGENTS.md`: design workflow, anti-generic guardrails, accessibility and delivery expectations.
- `effects/wow.js` + `wow.css`: pointer spotlight and scroll reveal; `initWow()` returns cleanup.
- `styles/presets.css`: Signal, Nocturne and Clay token sets.
- `recipes/`: editorial launch, product workbench and independent portfolio outlines.
- `prompts/start.md`: reusable brief.
- `index.html`: living-world showcase with generated scenery and four actual Rigpop-animated characters.
- `examples/studio/`: complete fictional editorial example.
- `tools/`: local-link check, optional screenshot utility and manual QA checklist.

## Reuse an effect
```html
<link rel="stylesheet" href="effects/wow.css">
<div data-reveal>Always readable without JavaScript.</div>
<div data-spotlight>Pointer lighting surface</div>
<script type="module">
  import { initWow } from './effects/wow.js';
  const cleanup = initWow(); // call cleanup before removing an SPA route
</script>
```
Serve ES modules over HTTP, not file://. Pointer spotlight needs a background on its element; it is subtle by design. Use at most two effects per page. Reduced motion disables reveals and pointer updates.

## Scope / limitations
This is a starter, not a guarantee that every AI agent will produce great design. It has no backend, automatic site generator or hosted service. Recipes are written guides, not three finished template sites. The actual Rigpop editor and example assets are bundled locally; an extracted demo player now powers the homepage. Arbitrary project JSON loading is not yet supported. No GitHub repo has been published on your behalf.

See `tools/VERIFY.md` for browser checks. `npm run check` checks local paths and required files only. See `TESTING.md` for checks performed in this build.

## Rigpop foundation
See `docs/RIGPOP_INTEGRATION.md` for provenance and current integration scope.

## Living-world showcase
`scene.js` uses `player/rigpop-player.js`, adapted from the actual Rigpop renderer and demo definitions. Character selection, bones, play/pause and tempo are interactive. `assets/dreamscape.jpg` is AI-generated scenery, not a Rigpop render. Reduced-motion users get a still pose. See `docs/SCENE_RECIPE.md`.

## Original cast and mini workshop
The current homepage uses ten original AI-generated illustrations, not Rigpop's built-in demo assets. Full images and transparent cutouts are in `assets/cast/`, rigs and fresh keyframes in `projects/cast/`. The hero, gallery and workshop use `player/project-player.js`.

`createProjectPlayer(canvas)` returns `load(project, baseURL=document.baseURI)`, `setJoints(joints)`, `setAnimation(animation)`, `setPaused(bool)`, `setBones(bool)`, `setSpeed(number)`, `getProject()`, `destroy()`. Images resolve relative to baseURL. Parents must precede children. Call destroy on unmount.

The inline workshop supports choosing characters, local PNG/JPEG/WebP uploads under 10 MB, adding/selecting joints by pointer or keyboard, removing the last joint, clearing joints, sway/bounce presets and embedded-image project export. It is a lightweight editor, not all of the original Rigpop editor: no automatic rigging, automatic background removal, video export, joint dragging or timeline editor. Upload transparent images for best results.

`tools/build_cast.py` records image-based coordinates and generates cutouts and project JSON; optional Python dependencies are Pillow, NumPy and OpenCV. Runtime needs none of them. All new illustrations are generated imagery; the tutorial assets retain their original Rigpop provenance.

## Motion presets and uploaded rigs
The workshop now includes Walking, Jumping, Running, Waving, Little dance,
Floating, Gentle sway and Happy bounce. `player/motions.js` produces loop-safe
Rigpop keyframes; see `docs/MOTIONS.md` for rig requirements and API.

After uploading, select **My uploaded image** in the character dropdown to return
to your rig. Its joints and motion are kept while switching to built-in characters
within this page session. Reloading clears it; export to keep your work. A new
upload replaces the prior upload. Header and footer feature walking original
characters, with pause control and reduced-motion support.

Run `npm run test:motions` for motion-data invariant checks.
