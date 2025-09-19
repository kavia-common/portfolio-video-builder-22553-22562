import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { z } from 'zod';
import { Theme } from '../styles/theme';
import { UserProfile } from '../types/portfolio';

export const PortfolioSchemaB = z.object({
  profile: z.any(),
});

const FadeIn: React.FC<{ from?: number; duration?: number; children?: React.ReactNode }> = ({
  from = 0,
  duration = 20,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + duration], [0, 1], { extrapolateRight: 'clamp' });
  return <div style={{ opacity }}>{children}</div>;
};

export const PortfolioTemplateB: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const accent = profile.accentPrimary || Theme.colors.primary;
  const accent2 = profile.accentSecondary || Theme.colors.secondary;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 600px at 20% 10%, ${accent}22, transparent),
                     radial-gradient(800px 600px at 80% 80%, ${accent2}22, transparent),
                     ${Theme.colors.background}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 28,
          borderRadius: 18,
          background: 'white',
          border: `1px solid ${Theme.colors.border}`,
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          overflow: 'hidden',
          boxShadow: '0 16px 60px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            background: `linear-gradient(180deg, ${accent} 0%, ${accent} 60%, ${accent} 60%, white 60%)`,
            padding: 24,
            color: 'white',
          }}
        >
          <FadeIn>
            <div style={{ fontSize: 38, fontWeight: 900 }}>{profile.name}</div>
            <div style={{ opacity: 0.9, marginTop: 4 }}>{profile.role}</div>
            <div style={{ marginTop: 10, background: 'white', color: Theme.colors.text, padding: 12, borderRadius: 10 }}>
              {profile.tagline}
            </div>
            <div style={{ marginTop: 10, fontSize: 14, opacity: 0.9 }}>
              {profile.website ? <div>Website: {profile.website}</div> : null}
              {profile.email ? <div>Email: {profile.email}</div> : null}
              {profile.location ? <div>Location: {profile.location}</div> : null}
            </div>
          </FadeIn>
        </div>
        <div style={{ padding: 24, display: 'grid', gap: 14 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: accent }}>Highlighted Projects</div>
          {profile.projects.slice(0, 3).map((p, i) => (
            <FadeIn key={p.title + i} from={i * 12 + 8} duration={16}>
              <div
                style={{
                  border: `1px solid ${Theme.colors.border}`,
                  borderRadius: 14,
                  padding: 16,
                  display: 'grid',
                  gridTemplateColumns: '1fr 260px',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{p.title}</div>
                  <div style={{ color: '#4B5563', marginTop: 6 }}>{p.description}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignContent: 'flex-start' }}>
                  {p.tech.map((t) => (
                    <div
                      key={t}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 999,
                        fontSize: 13,
                        background: (accent2) + '1A',
                        color: accent2,
                        border: `1px solid ${accent2}33`,
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
