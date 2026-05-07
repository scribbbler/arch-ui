import React, { forwardRef } from 'react';
import './MessageCard.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface MessageCardProps {
  /** URL for the card image displayed at the top. */
  image?: string;
  /** Heading text for the message. */
  heading?: string;
  /** Body paragraph text for the message. */
  paragraph?: string;
  /** Label for the call-to-action button. */
  buttonLabel?: string;
  /** Click handler for the call-to-action button. */
  onClick?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── MessageCard ────────────────────────────────────────────────────────────── */

/**
 * MessageCard
 *
 * A card component optimized for displaying messages with metadata.
 *
 * @example
 * <MessageCard
 *   image="/photos/welcome.jpg"
 *   heading="Welcome aboard"
 *   paragraph="We are glad to have you. Here is what to expect next."
 *   buttonLabel="Get started"
 *   onClick={() => navigate('/onboarding')}
 * />
 */
const MessageCard = forwardRef<HTMLDivElement, MessageCardProps>(function MessageCard(
  { image, heading, paragraph, buttonLabel, onClick, className },
  ref
) {
  const classes = ['arch-message-card', className].filter(Boolean).join(' ');

  return (
    <article ref={ref} className={classes} role="article">
      {image && (
        <div className="arch-message-card__image-wrapper">
          <img className="arch-message-card__image" src={image} alt="" />
        </div>
      )}
      <div className="arch-message-card__body">
        {heading && <h3 className="arch-message-card__heading">{heading}</h3>}
        {paragraph && <p className="arch-message-card__paragraph">{paragraph}</p>}
        {buttonLabel && (
          <button
            type="button"
            className="arch-message-card__button"
            onClick={onClick}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </article>
  );
});

export { MessageCard };
export default MessageCard;
