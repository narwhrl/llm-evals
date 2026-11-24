import React from 'react';

export function PlayIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.5 4.75L15.25 10L6.5 15.25V4.75Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PauseIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <rect x="5.5" y="4.5" width="3.2" height="11" rx="1" fill="currentColor" stroke="none" />
      <rect x="11.3" y="4.5" width="3.2" height="11" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ResetIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4.5 9.5A5.5 5.5 0 1 1 6.2 13.7" />
      <path d="M4.2 5.5V9.7H8.4" />
    </svg>
  );
}

export function SoundOnIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.8 8.2H6.8L10.8 4.8V15.2L6.8 11.8H3.8V8.2Z" />
      <path d="M13.3 7.3C14.4 8.6 14.4 11.4 13.3 12.7" />
      <path d="M15.4 5.4C17.3 7.8 17.3 12.2 15.4 14.6" />
    </svg>
  );
}

export function SoundOffIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.8 8.2H6.8L10.8 4.8V15.2L6.8 11.8H3.8V8.2Z" />
      <path d="M13.2 7.8L16.8 12.2" />
      <path d="M16.8 7.8L13.2 12.2" />
    </svg>
  );
}

export function SlidersIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 6H16.5" />
      <path d="M3.5 10H16.5" />
      <path d="M3.5 14H16.5" />
      <circle cx="7.5" cy="6" r="1.7" fill="#0b0d13" />
      <circle cx="12.8" cy="10" r="1.7" fill="#0b0d13" />
      <circle cx="9.2" cy="14" r="1.7" fill="#0b0d13" />
    </svg>
  );
}

export function EyeIcon({ off = false }) {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2.5 10C4.3 6.5 7 5 10 5C13 5 15.7 6.5 17.5 10C15.7 13.5 13 15 10 15C7 15 4.3 13.5 2.5 10Z" />
      <circle cx="10" cy="10" r="2.2" />
      {off ? <path d="M4 16L16 4" /> : null}
    </svg>
  );
}

export function ChevronIcon({ expanded = false }) {
  return (
    <svg
      className={`ui-icon chevron-icon ${expanded ? 'is-expanded' : ''}`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M6 8L10 12L14 8" />
    </svg>
  );
}

export function AlertIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3.2L17.2 15.8H2.8L10 3.2Z" />
      <path d="M10 8V11.6" />
      <circle cx="10" cy="13.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
