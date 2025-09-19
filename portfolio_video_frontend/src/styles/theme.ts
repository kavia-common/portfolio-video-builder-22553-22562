export const Theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB', // Blue
    secondary: '#F59E0B', // Amber
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(0,0,0,0.08)',
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 10px rgba(0,0,0,0.06)',
    lg: '0 12px 24px rgba(0,0,0,0.10)',
  },
  gradient: 'linear-gradient(135deg, rgba(59,130,246,0.10) 0%, rgba(243,244,246,1) 100%)',
};

export const styles = {
  appShell: {
    background: Theme.colors.background,
    color: Theme.colors.text,
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  } as React.CSSProperties,
  card: {
    background: Theme.colors.surface,
    borderRadius: 12,
    border: `1px solid ${Theme.colors.border}`,
    boxShadow: Theme.shadow.sm,
  } as React.CSSProperties,
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '10px 14px',
      borderRadius: 10,
      border: '1px solid transparent',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 160ms ease',
      userSelect: 'none',
    } as React.CSSProperties,
    primary: {
      background: Theme.colors.primary,
      color: 'white',
      boxShadow: Theme.shadow.sm,
    } as React.CSSProperties,
    outline: {
      background: 'white',
      color: Theme.colors.primary,
      border: `1px solid ${Theme.colors.primary}`,
    } as React.CSSProperties,
    ghost: {
      background: 'transparent',
      color: Theme.colors.text,
      border: `1px solid ${Theme.colors.border}`,
    } as React.CSSProperties,
  },
  input: {
    base: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: 10,
      border: `1px solid ${Theme.colors.border}`,
      outline: 'none',
      transition: 'all 150ms ease',
      background: 'white',
    } as React.CSSProperties,
    label: {
      fontSize: 12,
      fontWeight: 600,
      color: Theme.colors.muted,
      marginBottom: 6,
      display: 'block',
    } as React.CSSProperties,
    help: {
      fontSize: 11,
      color: Theme.colors.muted,
      marginTop: 6,
    } as React.CSSProperties,
  },
};
