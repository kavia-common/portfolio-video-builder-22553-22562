import React from 'react';
import { Theme, styles } from '../styles/theme';

// PUBLIC_INTERFACE
export const Button: React.FC<{
  kind?: 'primary' | 'outline' | 'ghost';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  title?: string;
  type?: 'button' | 'submit';
  children?: React.ReactNode;
}> = ({ kind = 'primary', iconLeft, iconRight, children, onClick, title, type = 'button' }) => {
  const kindStyle =
    kind === 'primary' ? styles.button.primary : kind === 'outline' ? styles.button.outline : styles.button.ghost;
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      style={{
        ...styles.button.base,
        ...kindStyle,
      }}
    >
      {iconLeft ? <span>{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span>{iconRight}</span> : null}
    </button>
  );
};

// PUBLIC_INTERFACE
export const Field: React.FC<{
  label: string;
  help?: string;
  required?: boolean;
  children?: React.ReactNode;
}> = ({ label, help, required, children }) => {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={styles.input.label}>
        {label} {required ? <span style={{ color: Theme.colors.secondary }}>*</span> : null}
      </label>
      {children}
      {help ? <div style={styles.input.help}>{help}</div> : null}
    </div>
  );
};

// PUBLIC_INTERFACE
export const Input: React.FC<React.InputHTMLAttributes<any>> = (props) => {
  return <input {...props} style={{ ...styles.input.base, ...(props.style || {}) }} />;
};

// PUBLIC_INTERFACE
export const TextArea: React.FC<React.TextareaHTMLAttributes<any>> = (props) => {
  return (
    <textarea
      {...props}
      style={{ ...styles.input.base, ...(props.style || {}), minHeight: 80, resize: 'vertical' }}
    />
  );
};

// PUBLIC_INTERFACE
export const Select: React.FC<
  React.SelectHTMLAttributes<any> & { options: { value: string; label: string }[] }
> = ({ options, ...props }) => {
  return (
    <select {...props} style={{ ...styles.input.base, ...(props.style || {}) }}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

// PUBLIC_INTERFACE
export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontWeight: 800, fontSize: 14 }}>{title}</div>
      {subtitle ? <div style={{ fontSize: 12, color: Theme.colors.muted }}>{subtitle}</div> : null}
    </div>
  );
};

// PUBLIC_INTERFACE
export const ColorInput: React.FC<{ value: string; onChange: (v: string) => void; label: string; children?: React.ReactNode }> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <Field label={label}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: 44,
            height: 36,
            padding: 0,
            borderRadius: 8,
            border: `1px solid ${Theme.colors.border}`,
            background: 'transparent',
          }}
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </Field>
  );
};
