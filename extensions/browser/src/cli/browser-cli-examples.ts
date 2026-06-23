/**
 * Help examples shown by the Browser CLI root command.
 */
/** Core Browser CLI examples for lifecycle and inspection commands. */
export const browserCoreExamples = [
  "supportClaw browser status",
  "supportClaw browser start",
  "supportClaw browser start --headless",
  "supportClaw browser stop",
  "supportClaw browser tabs",
  "supportClaw browser open https://example.com",
  "supportClaw browser focus abcd1234",
  "supportClaw browser close abcd1234",
  "supportClaw browser screenshot",
  "supportClaw browser screenshot --full-page",
  "supportClaw browser screenshot --ref 12",
  "supportClaw browser snapshot",
  "supportClaw browser snapshot --format aria --limit 200",
  "supportClaw browser snapshot --efficient",
  "supportClaw browser snapshot --labels",
];

/** Browser CLI examples for interaction/action commands. */
export const browserActionExamples = [
  "supportClaw browser navigate https://example.com",
  "supportClaw browser resize 1280 720",
  "supportClaw browser click 12 --double",
  "supportClaw browser click-coords 120 340",
  'supportClaw browser type 23 "hello" --submit',
  "supportClaw browser press Enter",
  "supportClaw browser hover 44",
  "supportClaw browser drag 10 11",
  "supportClaw browser select 9 OptionA OptionB",
  "supportClaw browser upload /tmp/supportClaw/uploads/file.pdf",
  "supportClaw browser upload media://inbound/file.pdf",
  'supportClaw browser fill --fields \'[{"ref":"1","value":"Ada"}]\'',
  "supportClaw browser dialog --accept",
  'supportClaw browser wait --text "Done"',
  "supportClaw browser evaluate --fn '(el) => el.textContent' --ref 7",
  "supportClaw browser evaluate --fn 'const title = document.title; return title;'",
  "supportClaw browser console --level error",
  "supportClaw browser pdf",
];
