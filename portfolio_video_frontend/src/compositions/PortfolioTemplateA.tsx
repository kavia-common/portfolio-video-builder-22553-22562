import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { z } from 'zod';
import { Theme } from '../styles/theme';
import { UserProfile } from '../types/portfolio';

export const PortfolioSchema = z.object({
  profile: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string(),
    email: z.string().optional(),
    website: z.string().optional(),
    location: z.string().optional(),
    avatarColor: z.string().optional(),
    accentPrimary: z.string().optional(),
    accentSecondary: z.string().optional(),
    projects: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          tech: z.array(z.string()),
          link: z.string().optional(),
        }),
      )
      .min(1),
  }),
  background: z.string().optional(),
});

const Heading: React.FC<{ title: string; subtitle?: string; accent?: string }> = ({
  title,
  subtitle,
  accent,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });
  return (
    <div style={{ opacity, transform: `translateY(${y}px)` }}>
      <div style={{ fontSize: 64, fontWeight: 900 }}>
        <span style={{ color: accent || Theme.colors.primary }}>{title}</span>
      </div>
      {subtitle ? (
        <div style={{ fontSize: 24, color: '#374151', marginTop: 6 }}>{subtitle}</div>
      ) : null}
    </div>
  );
};

const Badge: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      padding: '6px 10px',
      background: 'white',
      border: `1px solid ${Theme.colors.border}`,
      borderRadius: 999,
      fontSize: 18,
      boxShadow: '0 1px 1px rgba(0,0,0,0.06)',
    }}
  >
    {text}
  </div>
);

const ProjectCard: React.FC<{
  index: number;
  title: string;
  description: string;
  tech: string[];
  accent?: string;
}> = ({ index, title, description, tech, accent }) => {
  const frame = useCurrentFrame();
  useVideoConfig();
  const base = index * 15;
  const opacity = interpolate(frame, [base, base + 12], [0, 1], { extrapolateRight: 'clamp' });
  const x = interpolate(frame, [base, base + 12], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${x}px)`,
        background: 'white',
        border: `1px solid ${Theme.colors.border}`,
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800 }}>{title}</div>
      <div style={{ color: '#4B5563' }}>{description}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
        {tech.map((t) => (
          <div
            key={t}
            style={{
              padding: '6px 10px',
              borderRadius: 999,
              fontSize: 14,
              background: (accent || Theme.colors.primary) + '1A',
              color: accent || Theme.colors.primary,
              border: `1px solid ${(accent || Theme.colors.primary)}33`,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PortfolioTemplateA: React.FC<{
  profile: UserProfile;
  background?: string;
}> = ({ profile, background }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const outOpacity = interpolate(
    frame,
    [durationInFrames - 24, durationInFrames - 8],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const accent = profile.accentPrimary || Theme.colors.primary;
  const avatar = (
    <div
      style={{
        width: 120,
        height: 120,
        borderRadius: 24,
        background: (profile.avatarColor || accent) + '26',
        border: `2px solid ${(profile.avatarColor || accent)}55`,
        display: 'grid',
        placeItems: 'center',
        fontWeight: 900,
        color: profile.avatarColor || accent,
        fontSize: 36,
      }}
    >
      {profile.name.slice(0, 1)}
    </div>
  );

  return (
    <AbsoluteFill style={{ background: background || Theme.gradient, opacity: outOpacity }}>
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            inset: 24,
            borderRadius: 20,
            background: 'white',
            border: `1px solid ${Theme.colors.border}`,
            boxShadow: '0 12px 40px rgba(37,99,235,0.10)',
            padding: 28,
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gap: 18,
            opacity: bgOpacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {avatar}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Heading title={profile.name} subtitle={`${profile.role} • ${profile.location ?? ''}`} accent={accent} />
              <div style={{ marginTop: 8, color: '#374151' }}>{profile.tagline}</div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {profile.website ? <Badge text={profile.website} /> : null}
                {profile.email ? <Badge text={profile.email} /> : null}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {profile.projects.slice(0, 4).map((p, idx) => (
              <ProjectCard
                key={p.title + idx}
                index={idx}
                title={p.title}
                description={p.description}
                tech={p.tech}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
