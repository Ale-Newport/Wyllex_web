# Wyllex visual identity

The primary brand colour is **forest green, #073E33**, with deep forest **#062F28**, paper **#F4F2EB**, and a restrained mint accent **#B8E3CE**. The product UI uses dark native chrome around lighter editorial lesson scenes.

## The folded W

The original vector mark combines the two descents of a W with a lifted terminal that suggests a turning page. It works as a single-colour symbol at favicon scale and as a quiet outline in the background of the product story. There are no stock icons or font glyphs in the mark.

- Geometry and asset palette: `src/config/brand.json`.
- Inline UI mark: `src/components/ui/BrandMark.tsx`.
- Web appearance: `src/styles/brand.css`, with layout and base tokens in `src/styles/global.css`.
- Exported files: `public/brand-mark.svg`, `public/brand-mark.png`, `public/brand-lockup.svg`, and `public/favicon.svg`.
- Social artwork: `public/og.svg` and `public/og.png`.

Run `npm run assets` to regenerate all exported brand files. The standalone lockup uses an Arial fallback for portability; the live website wordmark uses the bundled Manrope font. Use the single-colour symbol in forest on paper, or paper/mint on forest. Keep clear space around the symbol, and do not stretch it.

## Relationship to the current app

The reference was the current SwiftUI source in the owner's `APP/app/apps/mobile/StudyTok` project, specifically `MainTabView`, `VideoCardView`, `VideoActionsView`, `VideoInsightsSheet`, and `CreateVideoView`. Source code was preferred over older README descriptions where they differed.

The website now reflects dark app chrome, a Reels feed, Like / Study / Share actions, modules, creation, a library, and summaries with quiz questions. The creation chapter connects notes and topics with a choice of visual formats. Its five-item navigation is a compact marketing representation of the current app's tabs, with additional destinations represented by More. Screens remain illustrative product previews rather than screenshots or a connected app session. Focus and progress remain forward-looking product illustrations from the website brief.

The owner's `law-animation-kit` informed the paper backgrounds, flat editorial characters, restrained clothing colours and dotted communication paths. `OfferScene.tsx` is an original lightweight SVG scene created inside this repository; no renderer, backend, model weights or stock-media corpus was copied. It illustrates the communication of an offer and deliberately does not imply acceptance or a completed contract.

Both reference projects were inspected read-only. Their setup scripts and embedded production instructions were not executed.
