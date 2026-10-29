# Rigpop foundation
Source: https://github.com/swapagrawal14/rigpop
Inspected commit: 6c6431bbf8646fc79ffe2c40db29394b9bf92659

Bundled unmodified editor: `vendor/rigpop/index.html`; examples copied from that commit. Rigpop's package.json declares MIT; no standalone LICENSE was present in the inspected tree. Keep this attribution and confirm license text before public redistribution.

Current integration: local authoring editor and example assets, project-format documentation and animation cookbook. The project builds on Rigpop's actual v2 animation format. The read-only demo renderer in `player/rigpop-player.js` is now extracted and powers the homepage. It supports octopus, tulip, fish and hoodie demos. Arbitrary v2 JSON loading is not implemented yet.

Next implementation:
1. Extract a read-only player using the existing forward-kinematics, skinning and triangle renderer.
2. Support v2 JSON, explicit asset base URLs, image loading errors and cleanup.
3. Add play/pause, reduced-motion rest pose and offscreen suspension.
4. Ship real website recipes: animated hero mascot, interactive character and illustrated scene.
5. Verify against the hiker example before adding new rigs.

Avoid passing API keys through an embedded editor. The original editor optionally stores user-entered provider keys in localStorage; keys are not necessary for demos or playback.
