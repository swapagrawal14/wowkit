# Verification checklist
- Run `npm run check` for required files and local HTML links.
- Serve with `npm run dev`.
- At 375, 768, 1440px: inspect layout, text clipping, overflow and tap targets.
- Tab through every control; verify visible focus, sensible order, Escape behavior where applicable.
- Test all theme controls, copy action, links and mobile navigation.
- Enable reduced motion: content is visible and nonessential animation stops.
- Disable JS: essential content and navigation remain available.
- Check browser console and network for failures.
- Run a dedicated accessibility tool and manually review contrast; this repository's check script is not an accessibility certification.

Optional screenshot helper: install Playwright locally (`npm install --no-save playwright`, `npx playwright install chromium`) then run `npm run capture -- http://localhost:3000`. It captures the three viewports into `screenshots/`. Inspect them yourself. Playwright is optional and not required for the website.
