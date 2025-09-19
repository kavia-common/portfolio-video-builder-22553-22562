# Portfolio Video Builder (Remotion)

This project provides a Remotion-based "Ocean Professional" video portfolio builder.

- Theme: Ocean Professional (Blue #2563EB, Amber #F59E0B)
- Layout: Dashboard with sidebar, top bar, main preview and settings panel
- Features: Input profile/projects, choose templates, live preview in Remotion Studio, export via CLI

## Quick Start

Install dependencies:
```bash
npm i
```

Start Remotion Studio:
```bash
npm run dev
```

In Studio, select one of:
- HelloWorld
- OnlyLogo
- PortfolioA
- PortfolioB

Use the right-side dashboard to edit portfolio info (name, role, tagline, projects, colors) and select a template. The dashboard runs alongside Studio and provides guidance and default props used by compositions.

To export from CLI:
```bash
npx remotion render src/index.ts PortfolioA out/PortfolioA.mp4
# or
npx remotion render src/index.ts PortfolioB out/PortfolioB.mp4
```

## Files of interest

- src/compositions/PortfolioTemplateA.tsx — card grid template
- src/compositions/PortfolioTemplateB.tsx — sidebar highlight template
- src/components/EditorPanel.tsx — right panel controls
- src/components/Layout/DashboardShell.tsx — dashboard layout
- src/styles/theme.ts — Ocean Professional theme
- src/Root.tsx — registers compositions

## Notes

- No authentication or external services are required.
- The "Export" button shows the CLI command; automated rendering hooks can be added in future iterations.
