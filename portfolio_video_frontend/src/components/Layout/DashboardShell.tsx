import React from 'react';
import { Theme, styles } from '../../styles/theme';

type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export const Sidebar: React.FC<{
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}> = ({ items, activeId, onSelect }) => {
  return (
    <aside
      style={{
        width: 260,
        background: 'white',
        borderRight: `1px solid ${Theme.colors.border}`,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          padding: 14,
          borderRadius: 12,
          background: Theme.gradient,
          border: `1px solid ${Theme.colors.border}`,
        }}
      >
        <div style={{ fontWeight: 800, color: Theme.colors.primary, fontSize: 18 }}>
          Ocean Portfolio
        </div>
        <div style={{ fontSize: 12, color: Theme.colors.muted }}>Video Builder</div>
      </div>
      <nav style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              style={{
                ...styles.button.base,
                justifyContent: 'flex-start',
                background: active ? Theme.colors.primary : 'transparent',
                color: active ? 'white' : Theme.colors.text,
                border: active ? `1px solid ${Theme.colors.primary}` : `1px solid transparent`,
                padding: '10px 10px',
              }}
            >
              <span style={{ opacity: 0.9 }}>{it.icon}</span>
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: 'auto' }}>
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            border: `1px dashed ${Theme.colors.border}`,
            color: Theme.colors.muted,
            fontSize: 12,
          }}
        >
          Tip: Use the right panel to customize your video and click Export to render.
        </div>
      </div>
    </aside>
  );
};

export const Topbar: React.FC<{
  title: string;
  right?: React.ReactNode;
}> = ({ title, right }) => {
  return (
    <div
      style={{
        height: 64,
        background: 'white',
        borderBottom: `1px solid ${Theme.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: Theme.colors.secondary,
            boxShadow: `0 0 0 6px rgba(245,158,11,0.20)`,
          }}
        />
        <div style={{ fontWeight: 700 }}>{title}</div>
      </div>
      <div>{right}</div>
    </div>
  );
};

export const DashboardShell: React.FC<{
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}> = ({ sidebar, topbar, children, rightPanel }) => {
  return (
    <div style={{ ...styles.appShell, display: 'flex', minHeight: '100vh' }}>
      {sidebar}
      <main style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {topbar}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: rightPanel ? '1fr 380px' : '1fr',
            gap: 16,
            padding: 16,
          }}
        >
          <section style={{ minHeight: 0 }}>{children}</section>
          {rightPanel ? (
            <aside
              style={{
                ...styles.card,
                padding: 16,
                minHeight: 'calc(100vh - 64px - 32px)',
                position: 'sticky',
                top: 80,
              }}
            >
              {rightPanel}
            </aside>
          ) : null}
        </div>
      </main>
    </div>
  );
};
