const DEFAULT_COLOR: string = "var(--color-text)"

export function MenuIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
      />
    </svg>
  );
}
export function MusicNoteIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"
      />
    </svg>
  );
}
export function QueueMusicIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"
      />
    </svg>
  );
}
export function PlaylistIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="m562-225 199-199-57-56-142 142-56-57-57 57 113 113ZM280-360h120v-80H280v80Zm0-120h280v-80H280v80Zm0-120h280v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
      />
    </svg>
  );
}
export function PlayIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="M320-200v-560l440 280-440 280Z"
      />
    </svg>
  );
}
export function TuneIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"
      />
    </svg>
  );
}
export function CloseIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      />
    </svg>
  );
}
export function LinkIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"
      />
    </svg>
  );
}
export function BackIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
      />
    </svg>
  );
}

