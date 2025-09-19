export type ExportOptions = {
  compositionId: string;
  outputFile?: string;
};

// PUBLIC_INTERFACE
export function getCliExportCommand(entry = 'src/index.ts', compositionId: string, out = 'out/portfolio.mp4') {
  /** Returns the Remotion CLI command to render a composition to a file. */
  return `npx remotion render ${entry} ${compositionId} ${out}`;
}
