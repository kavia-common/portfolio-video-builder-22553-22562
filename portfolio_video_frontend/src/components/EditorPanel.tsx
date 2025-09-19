import React from 'react';
import { Button, ColorInput, Field, Input, SectionTitle, Select, TextArea } from './UI';
import { UserProfile, defaultProfile } from '../types/portfolio';
import { Theme } from '../styles/theme';

export type TemplateId = 'templateA' | 'templateB';

// PUBLIC_INTERFACE
export type EditorState = {
  template: TemplateId;
  profile: UserProfile;
  background: string;
};

// PUBLIC_INTERFACE
export const defaultEditorState: EditorState = {
  template: 'templateA',
  profile: defaultProfile,
  background: '#F3F4F6',
};

// PUBLIC_INTERFACE
export const EditorPanel: React.FC<{
  state: EditorState;
  onChange: (s: EditorState) => void;
  onExport?: () => void;
}> = ({ state, onChange, onExport }) => {
  const update = <K extends keyof EditorState>(key: K, value: EditorState[K]) => {
    onChange({ ...state, [key]: value });
  };
  const updateProfile = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    onChange({ ...state, profile: { ...state.profile, [key]: value } });
  };

  const addProject = () => {
    const next = [...state.profile.projects, { title: 'New Project', description: '', tech: [] as string[] }];
    updateProfile('projects', next);
  };
  const removeProject = (idx: number) => {
    const next = state.profile.projects.filter((_, i) => i !== idx);
    updateProfile('projects', next);
  };
  const updateProject = (idx: number, patch: Partial<UserProfile['projects'][number]>) => {
    const next = state.profile.projects.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    updateProfile('projects', next);
  };

  return (
    <div>
      <SectionTitle title="Template" subtitle="Choose a video style" />
      <Select
        value={state.template}
        onChange={(e) => update('template', e.target.value as TemplateId)}
        options={[
          { value: 'templateA', label: 'Template A - Card Grid' },
          { value: 'templateB', label: 'Template B - Sidebar Highlight' },
        ]}
      />

      <div style={{ height: 12 }} />

      <SectionTitle title="Palette" subtitle="Ocean Professional accents" />
      <ColorInput
        label="Background"
        value={state.background}
        onChange={(v) => update('background', v)}
      />
      <ColorInput
        label="Primary Accent"
        value={state.profile.accentPrimary || Theme.colors.primary}
        onChange={(v) => updateProfile('accentPrimary', v)}
      />
      <ColorInput
        label="Secondary Accent"
        value={state.profile.accentSecondary || Theme.colors.secondary}
        onChange={(v) => updateProfile('accentSecondary', v)}
      />

      <div style={{ height: 12 }} />
      <SectionTitle title="About You" />
      <Field label="Name" required>
        <Input value={state.profile.name} onChange={(e) => updateProfile('name', e.target.value)} />
      </Field>
      <Field label="Role" required>
        <Input value={state.profile.role} onChange={(e) => updateProfile('role', e.target.value)} />
      </Field>
      <Field label="Tagline">
        <TextArea value={state.profile.tagline} onChange={(e) => updateProfile('tagline', e.target.value)} />
      </Field>
      <Field label="Website">
        <Input value={state.profile.website || ''} onChange={(e) => updateProfile('website', e.target.value)} />
      </Field>
      <Field label="Email">
        <Input value={state.profile.email || ''} onChange={(e) => updateProfile('email', e.target.value)} />
      </Field>
      <Field label="Location">
        <Input value={state.profile.location || ''} onChange={(e) => updateProfile('location', e.target.value)} />
      </Field>

      <div style={{ height: 12 }} />
      <SectionTitle title="Projects" subtitle="Showcase up to 4 projects" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {state.profile.projects.map((proj, idx) => (
          <div
            key={idx}
            style={{
              border: `1px solid ${Theme.colors.border}`,
              borderRadius: 12,
              padding: 12,
              background: '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700 }}>Project {idx + 1}</div>
              <Button kind="ghost" onClick={() => removeProject(idx)} title="Remove Project">
                Remove
              </Button>
            </div>
            <div style={{ height: 8 }} />
            <Field label="Title" required>
              <Input
                value={proj.title}
                onChange={(e) => updateProject(idx, { title: e.target.value })}
              />
            </Field>
            <Field label="Description">
              <TextArea
                value={proj.description}
                onChange={(e) => updateProject(idx, { description: e.target.value })}
              />
            </Field>
            <Field label="Technologies (comma separated)">
              <Input
                value={proj.tech.join(', ')}
                onChange={(e) =>
                  updateProject(
                    idx,
                    {
                      tech: e.target.value
                        .split(',')
                        .map((t: string) => t.trim())
                        .filter((s: string) => Boolean(s)),
                    },
                  )
                }
              />
            </Field>
            <Field label="Link">
              <Input
                value={proj.link || ''}
                onChange={(e) => updateProject(idx, { link: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </div>
      <div style={{ height: 8 }} />
      <Button kind="outline" onClick={addProject} title="Add Project">
        + Add Project
      </Button>

      <div style={{ height: 16 }} />
      <Button kind="primary" onClick={onExport} title="Export video">
        Export Video
      </Button>
    </div>
  );
};
