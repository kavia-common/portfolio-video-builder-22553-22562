import React from 'react';
import { Theme, styles } from '../styles/theme';

// PUBLIC_INTERFACE
export const PreviewArea: React.FC<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ title, description, actions, children }) => {
  return (
    <div style={{ ...styles.card, padding: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <div>
          <div style={{ fontWeight: 800 }}>{title}</div>
          {description ? (
            <div style={{ fontSize: 12, color: Theme.colors.muted }}>{description}</div>
          ) : null}
        </div>
        <div>{actions}</div>
      </div>
      <div
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: `1px solid ${Theme.colors.border}`,
          background: '#000',
          minHeight: 320,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
