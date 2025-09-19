import React, { useMemo, useState } from 'react';
import { DashboardShell, Sidebar, Topbar } from './components/Layout/DashboardShell';
import { Button } from './components/UI';
import { PreviewArea } from './components/PreviewArea';
import { EditorPanel, defaultEditorState, EditorState } from './components/EditorPanel';
import { Theme } from './styles/theme';
import { getCliExportCommand } from './utils/export';

const SidebarItems = [
  { id: 'builder', label: 'Builder' },
  { id: 'templates', label: 'Templates' },
  { id: 'export', label: 'Export' },
];

export const App: React.FC = () => {
  const [active, setActive] = useState('builder');
  const [state, setState] = useState<EditorState>(defaultEditorState);

  const compositionId = useMemo(() => {
    return state.template === 'templateA' ? 'PortfolioA' : 'PortfolioB';
  }, [state.template]);

  const handleExport = () => {
    const cmd = getCliExportCommand('src/index.ts', compositionId, `out/${compositionId}.mp4`);
    const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
    if (g && g.alert) {
      g.alert(
        `To export your video, run this in the terminal:\n\n${cmd}\n\nThis demo uses Remotion Studio for preview. Automated export hooks can be added later.`,
      );
    }
  };

  return (
    <DashboardShell
      sidebar={<Sidebar items={SidebarItems as any} activeId={active} onSelect={setActive} />}
      topbar={
        <Topbar
          title="Portfolio Video Builder"
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button kind="outline" onClick={() => setState(defaultEditorState)}>
                Reset
              </Button>
              <Button onClick={handleExport}>Export</Button>
            </div>
          }
        />
      }
      rightPanel={<EditorPanel state={state} onChange={setState} onExport={handleExport} />}
    >
      <PreviewArea
        title="Preview"
        description="Use the left Remotion sidebar to select compositions. The settings on the right control default props and theme."
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              style={{
                padding: '6px 10px',
                borderRadius: 999,
                border: `1px solid ${Theme.colors.border}`,
                background: 'white',
                color: Theme.colors.muted,
                fontSize: 12,
              }}
            >
              Composition: {compositionId}
            </div>
          </div>
        }
      >
        <div style={{ color: 'white', opacity: 0.9, textAlign: 'center', padding: 16 }}>
          Remotion Studio preview is on the left sidebar (HelloWorld/PortfolioA/PortfolioB).
          Choose the composition and adjust props in Root.tsx or via right panel defaults in this UI.
        </div>
      </PreviewArea>
    </DashboardShell>
  );
};
