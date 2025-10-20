const DEFAULT_COLOR: string = "var(--palette-grey-900)"

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
export function LyricsIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path
        color={color}
        d="M240-400h160v-80H240v80Zm520-80q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 20.5 2t19.5 5v-207h160v80h-80v240q0 50-35 85t-85 35Zm-520-40h280v-80H240v80Zm0-120h280v-80H240v80Zm0 400L80-80v-720q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v17q-55 24-87.5 73.5T560-600q0 60 32.5 109.5T680-417v97q0 33-23.5 56.5T600-240H240Z"
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