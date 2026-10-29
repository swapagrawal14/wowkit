# v0.1 test notes

Checked in Chromium in the build environment:
- Required files and local HTML links: `npm run check` passed.
- No horizontal document overflow at 375, 768, 1440 px.
- Desktop and mobile full-page screenshots captured and visually inspected. Removed an orphaned decorative star on mobile after inspection.
- Nocturne and Clay controls switched the root preset; sample navigation reached the Small Hours example.
- Copy prompt reported success after awaiting clipboard completion. A timeout and manual-select fallback handle denied or delayed permission.
- Reduced-motion emulation left zero pending reveal elements.
- Initial favicon 404 fixed with a local SVG icon.

Not performed: comprehensive accessibility audit, exhaustive keyboard testing,
Safari/Firefox testing, screen-reader testing, external link validation or real-device testing.

# Living-world redesign
- Chromium: all four character controls switched successfully.
- Canvas pixel comparison confirmed animation changes the rendered frame and Pause stops changes.
- Rig overlay toggle and paused state checked.
- No horizontal document overflow at 375, 768 and 1440 px.
- Desktop and mobile screenshots inspected; removed a mobile annotation that overlapped the character's face.
- Reduced-motion mode exercised; exhaustive accessibility and cross-browser audits not performed.

# Illustrated tutorials
Added three original Rigpop step illustrations and six full-guide images, served locally.
Chromium: three intro images and all six expanded guide images loaded; expandable guide opened; no horizontal overflow at 375px. Desktop tutorial screenshot inspected. Full-size images use normal new-tab links. Static local-link check passed.

# Ten original characters + mini workshop
- Generated ten separate original images; inspected a coordinate grid before writing rigs.
- Rendered all ten projects; visually inspected gallery at two different animation times.
- Pixel comparison: all ten canvases changed between frames.
- Mini editor: switched to robot, confirmed animation and pause via pixel comparison, added a joint using keyboard (15 → 16), applied bounce, exported a project with image embedded.
- Local PNG upload tested: loaded image with zero initial joints.
- No document overflow at 375, 768, 1440 pixels.
- Inspected desktop workshop screenshot. Extensive accessibility and multi-browser testing remain outstanding.

# Motion expansion, uploaded-rig retention and page walkers
- Node invariant test: 8 motion presets across frog, robot and cloud; finite keys, matching loop endpoints, root-only translation.
- Chromium: uploaded an image, added 2 joints by keyboard, applied walking, switched to robot and back to My uploaded image. Both joints remained; exported project retained embedded image and 1.6-second walk animation.
- All 8 workshop presets selected and reported application successfully.
- Header/footer canvases loaded; header travel changed position over time. Shared pause stopped both CSS paths. Reduced-motion disabled both paths.
- Header and footer screenshots visually inspected.
- No horizontal document overflow at 375, 768, 1440px.
- Walking/running are stylized procedural gaits, not foot-locked IK; exhaustive cross-browser/accessibility testing remains outstanding.
