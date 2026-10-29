# Wowkit · instructions for coding agents

Build distinctive, usable websites—not a collection of decorative effects.

## Workflow
1. Read the user's brief. Identify audience, primary action, content, stack and constraints. Ask only blocking questions. Never invent testimonials, customer logos, metrics or product capabilities.
2. Write a short design direction before coding: mood, typography, palette, layout motif, primary interaction. Choose ONE style from `styles/presets.css` or create a coherent alternative.
3. Choose a structure from `recipes/`. Replace all example copy with content grounded in the brief. Preserve semantic headings, navigation and a single clear primary action.
4. Build a complete static version first. Use the user's stack; this kit is plain HTML/CSS/JS, not a framework mandate. Use relative asset paths.
5. Add at most two effects from `effects/wow.js`. Follow each effect's HTML contract. Effects must enhance—not hide—the content. Never animate reading text continuously.
6. Make it work at 375, 768 and 1440 px. No horizontal overflow. Touch users get the same functionality. All controls work by keyboard. Respect reduced motion and visible focus. Aim for WCAG AA contrast.
7. Verify every link, button, form and empty state. Use `npm run check` for kit integrity, then inspect the actual site with a browser. That command is NOT a browser accessibility audit. See `tools/VERIFY.md`.
8. Capture desktop and mobile screenshots. Inspect them, fix issues, and report what was tested and what remains. Never claim testing you did not run.

## Design constraints
- Strong hierarchy, generous but intentional spacing, limited color palette.
- Prefer one expressive visual motif to five unrelated gimmicks.
- Avoid default purple gradients, identical rounded cards everywhere, unearned stats, placeholder icon soups, fake partners, and dead CTA buttons.
- No scroll hijacking, cursor replacement, autoplay audio, flashing, or content gated behind animation.
- Real assets need permission and provenance; use original SVG/CSS art when appropriate. Never pass generated visuals off as real product screenshots.
- Keep secrets out of the client. Never require API keys for decorative UI.

## Rigpop integration
The original editor is bundled at `vendor/rigpop/index.html` with its example assets.
Read `docs/RIGPOP_PROJECT_FORMAT.md` and `docs/RIGPOP_ANIMATION_COOKBOOK.md` before generating animation projects.
Use Rigpop v2 project JSON as the asset contract: image, optional static background, joints and animation tracks. Image paths resolve relative to the editor/player document, not the JSON file.
The editor is an authoring tool, not a drop-in website player. Do not embed its full editing UI as a production hero. A standalone demo renderer now exists at `player/rigpop-player.js`; see `docs/SCENE_RECIPE.md` for its API. It currently supports four bundled drawn demos, not arbitrary project JSON. For custom exported work, use real exported WebM with a poster and playback controls until the generic loader is built. Respect reduced motion.
Do not fabricate a player package or API. No API key is needed for manual rigging or the bundled demos.

## Deliver
Working source, setup commands, design rationale, test notes, known limitations. Preserve existing app conventions. Do not rewrite an existing project merely to adopt this kit.

## Prove the design
The homepage must itself demonstrate a compelling use of the kit. Prefer an art-directed scene and real Rigpop deformation to a generic marketing page describing features. See docs/SCENE_RECIPE.md.

## Current player and inline editor
Prefer `player/project-player.js` for new work: it loads v2 project objects and images. See README.md for its exact API. The homepage now uses ten original generated characters, not the legacy demo-only renderer. The mini workshop in workshop.js implements local uploads, joint creation/selection, motion presets and image-embedded project export.
