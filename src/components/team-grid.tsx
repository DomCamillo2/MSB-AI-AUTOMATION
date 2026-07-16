import Image from 'next/image';
import { RevealGroup } from '@/components/reveal';
import { team } from '@/lib/site-content';

type TeamGridProps = {
  compact?: boolean;
};

export function TeamGrid({ compact = false }: TeamGridProps) {
  return (
    <RevealGroup className={`team-grid${compact ? ' team-grid-compact' : ''}`}>
      {team.map((member) => (
        <article key={member.name} className={`team-card${compact ? ' team-card-compact' : ' team-card-profile'}`}>
          <div className="team-portrait">
            {member.image ? (
              <Image
                className={`team-portrait-image team-portrait-image-${member.initials.toLowerCase()}`}
                src={member.image}
                alt={member.imageAlt}
                fill
                sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 980px) 50vw, 33vw"
              />
            ) : (
              <div className="team-portrait-fallback" aria-hidden="true">
                <span aria-hidden="true">{member.initials}</span>
              </div>
            )}
          </div>
          <div className="team-card-body">
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p>{member.text}</p>
            <p className="team-context">{member.context}</p>
            <a
              className="profile-link"
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn-Profil von ${member.name} in einem neuen Tab öffnen`}
            >
              LinkedIn-Profil <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </RevealGroup>
  );
}

export default TeamGrid;
