import sharp from 'sharp';
import { URL } from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';
const brand = JSON.parse(
  await readFile(new URL('../src/config/brand.json', import.meta.url), 'utf8'),
);
const mark = `<path d="${brand.markPath}"/>`;
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brand.markViewBox}" fill="${brand.colors.forest}">${mark}</svg>`;
await writeFile('public/brand-mark.svg', logo);
await sharp(Buffer.from(logo))
  .resize(192, 192, { fit: 'contain', background: '#00000000' })
  .png()
  .toFile('public/brand-mark.png');
await writeFile(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="20" fill="${brand.colors.forest}"/><g transform="translate(8 11) scale(.88)" fill="${brand.colors.paper}">${mark}</g></svg>`,
);
await writeFile(
  'public/brand-lockup.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252 64"><g fill="${brand.colors.forest}">${mark}<text x="86" y="49" font-family="Arial,sans-serif" font-size="53" font-weight="700" letter-spacing="-3">wyllex</text></g></svg>`,
);
const person = (x, y, shirt, skin, flip = false) =>
  `<g transform="translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}" stroke="#334237" stroke-width="1.5" stroke-linejoin="round"><path d="m-15 74-4 65h12L0 82l7 57h13l-5-65" fill="#35453a"/><path d="M-20 138h14v6h-21l7-6Zm27 0h14l7 6H7v-6Z" fill="#293a31"/><path d="M-17 21Q0 10 17 21l4 57q-21 9-43 0l5-57Z" fill="${shirt}"/><path d="m12 25 16 26 22-8 3 7-30 13-18-25" fill="${shirt}"/><path d="m49 43 7-4 5 5-9 6" fill="${skin}"/><path d="M-7 11v12q7 7 14 0V11" fill="${skin}"/><ellipse cy="-8" rx="19" ry="24" fill="${skin}"/><path d="M-19-6q-4-28 19-28 26 0 19 28l-7-18q-15 12-25 2l-6 16Z" fill="#63503b"/><path d="M-8-8h1M7-8h1" stroke-width="3" stroke-linecap="round"/><path d="M-5 5q6 5 12-1" fill="none"/></g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="bg"><stop stop-color="#073e33"/><stop offset="1" stop-color="#062f28"/></linearGradient><linearGradient id="frame"><stop stop-color="#c4c7bf"/><stop offset=".3" stop-color="#636b60"/><stop offset=".7" stop-color="#a3aa9d"/><stop offset="1" stop-color="#3f4940"/></linearGradient><clipPath id="screen"><rect x="805" y="80" width="278" height="592" rx="36"/></clipPath></defs>
<rect width="1200" height="630" fill="url(#bg)"/><g transform="translate(570 -55) scale(11)" fill="none" stroke="#b8e3ce" stroke-width=".1" opacity=".15">${mark}</g>
<g transform="translate(60 45) scale(.68)" fill="#b8e3ce">${mark}</g><text x="122" y="84" font-family="Arial,sans-serif" font-size="41" font-weight="700" fill="#f4f2eb" letter-spacing="-2.5">wyllex</text>
<text x="65" y="205" fill="#b8cebd" font-family="Arial,sans-serif" font-size="11" letter-spacing="2.4">YOUR LAW DEGREE. BROUGHT TO LIFE.</text>
<g font-family="Arial,sans-serif" font-size="96" font-weight="500" letter-spacing="-6"><text x="58" y="317" fill="#f4f2eb">Law worth</text><text x="58" y="420" fill="#b8e3ce">scrolling.</text></g>
<text x="65" y="486" fill="#c4d3c6" font-family="Arial,sans-serif" font-size="18">Your modules. Your notes. A different kind of feed.</text><rect x="63" y="534" width="156" height="35" rx="18" fill="#f4f2eb"/><text x="83" y="557" fill="#073e33" font-family="Arial,sans-serif" font-size="13">Coming to iPhone</text><text x="534" y="557" fill="#c0d0c4" font-family="Arial,sans-serif" font-size="15">wyllex.com</text>
<g transform="rotate(7 944 375)"><rect x="793" y="68" width="302" height="616" rx="49" fill="url(#frame)"/><rect x="799" y="74" width="290" height="604" rx="43" fill="#080e0a"/><g clip-path="url(#screen)"><rect x="805" y="80" width="278" height="592" fill="#101a16"/><text x="825" y="105" font-family="Arial" font-size="10" fill="#f4f2eb">9:41</text><rect x="899" y="89" width="88" height="24" rx="12" fill="#020603"/><text x="842" y="149" font-family="Arial" font-size="10" fill="#9eb5a5">Following</text><text x="914" y="149" font-family="Arial" font-size="11" fill="#f4f2eb">For you</text><rect x="805" y="166" width="278" height="355" fill="#f0eade"/><text x="824" y="193" font-family="Arial" font-size="7" letter-spacing="1.4" fill="#4d6d59">ANIMATED STORY</text><text x="823" y="230" font-family="Arial" font-size="30" letter-spacing="-1.5" fill="#234333">An offer.</text><text x="823" y="265" font-family="Georgia" font-style="italic" font-size="30" letter-spacing="-1.2" fill="#234333">Not yet a deal.</text>
<rect x="821" y="306" width="109" height="178" rx="12" fill="#e4dac8"/><rect x="949" y="306" width="118" height="178" rx="12" fill="#d3e1d6"/><path d="M874 335Q934 245 1008 335" fill="none" stroke="#5e8a6e" stroke-dasharray="3 4"/>
${person(871, 337, '#759782', '#c3916f')}${person(1008, 337, '#9f8397', '#e5be9c', true)}
<g transform="translate(915 348) rotate(9)"><rect width="60" height="42" rx="3" fill="#fffdf6" stroke="#526b58"/><path d="m2 3 28 20L58 3" stroke="#819782" fill="none"/><circle cx="30" cy="23" r="5" fill="#326c4b"/></g><rect x="827" y="498" width="230" height="25" rx="3" fill="#254c36"/><text x="942" y="515" font-family="Arial" font-size="10" text-anchor="middle" fill="#f4f2eb">Received doesn’t mean accepted.</text>
<g transform="translate(824 545) scale(.26)" fill="#b8e3ce">${mark}</g><text x="850" y="557" font-family="Arial" font-size="10" fill="#f4f2eb">Wyllex · 45-second Law</text><text x="824" y="587" font-family="Arial" font-size="15" fill="#f4f2eb">When is an offer communicated?</text><text x="824" y="611" font-family="Arial" font-size="8" fill="#aac6b2">CONTRACT LAW</text></g></g></svg>`;
await writeFile('public/og.svg', svg);
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('Generated the folded-W brand assets and original 1200 × 630 social card.');
