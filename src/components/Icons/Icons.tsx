const DEFAULT_COLOR: string = "var(--color-text-body-1)"

export function LoadingSpininer({ size = 40, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ display: "block" }}
    >
      <circle cx="20" cy="20" r="15" stroke={color || "currentColor"} strokeOpacity=".1" strokeWidth="6" fill="none" />
      <circle
        cx="20"
        cy="20"
        r="15"
        stroke="#2B80FF"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="70 100"
        strokeDashoffset="0"
        transform="rotate(-90 20 20)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="1s"
          repeatCount="indefinite"
          calcMode="cubic"
        />
        <animate
          attributeName="stroke-dasharray"
          values="10 100;50 100;10 100"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
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
export function FlatIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path color={color} d="M10.5 12.667c.482-.396 1.045-.74 1.73-.938.804-.246 2.012-.183 2.812.612 1.76 2.081.66 4.256-.19 5.685-.974 1.501-2.282 2.635-3.685 3.554-.214.14-.437.276-.667.411V22h-1V3h1v9.667Zm3.151 1.111c-.306-.416-1.538-.278-2.63.325-.181.096-.344.186-.521.29v6.027c1.12-.999 2.112-2.108 2.782-3.331.707-1.2.927-2.85.37-3.31Z" />
    </svg>
  );
}
export function SharpIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path color={color} d="m15 7.045 3-.545v2l-3 .545v5.5L18 14v2l-3 .545V21h-1v-4.273l-3 .546V22h-1v-4.546L7 18v-2l3-.546v-5.5L7 10.5v-2l3-.546V3h1v4.772l3-.545V2h1v5.045Zm-4 2.727v5.5l3-.545v-5.5l-3 .545Z" />
    </svg>
  );
}
export function ArrowUpIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path color={color} d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
    </svg>
  );
}
export function ArrowDownIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path color={color} d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );
}
export function SettingsIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path color={color} d="M9.312 3.908a.617.617 0 0 1 .754.233c.347.527.934 1.362 1.25 1.502l-.011.004c.459-.05.918-.05 1.37-.002.322-.234.83-.983 1.14-1.472a.617.617 0 0 1 .75-.245l1.258.508c.28.113.43.415.358.708-.22.889-.309 1.43-.178 1.872.336.27.648.574.927.913.339.107 1.32-.081 1.927-.217a.618.618 0 0 1 .704.357l.53 1.248a.606.606 0 0 1-.246.754c-.825.497-1.277.824-1.485 1.26l-.001-.004c.045.424.045.847.006 1.264.222.414.676.73 1.486 1.198.26.151.373.47.26.75l-.508 1.258a.617.617 0 0 1-.698.368c-.591-.121-1.536-.286-1.899-.192a6.35 6.35 0 0 1-.924.946c-.1.35.086 1.315.22 1.915a.617.617 0 0 1-.355.704l-1.25.53a.604.604 0 0 1-.753-.247c-.487-.809-.812-1.257-1.235-1.47a6.35 6.35 0 0 1-1.321.007c-.32.196-.858.99-1.181 1.5a.617.617 0 0 1-.75.245L8.2 19.595a.605.605 0 0 1-.358-.708c.225-.908.313-1.453.17-1.9a6.345 6.345 0 0 1-.906-.887l.003.007c-.458-.153-1.007-.055-1.937.193a.606.606 0 0 1-.714-.346l-.53-1.249a.618.618 0 0 1 .233-.754c.519-.343 1.336-.919 1.494-1.237a6.349 6.349 0 0 1-.014-1.3c-.227-.401-.677-.714-1.469-1.173a.605.605 0 0 1-.26-.748l.508-1.258a.617.617 0 0 1 .698-.37c.566.117 1.455.272 1.849.203a6.35 6.35 0 0 1 .955-.984l-.01.004c.152-.457.054-1.007-.194-1.937a.605.605 0 0 1 .346-.713l1.249-.53Zm1.368 4.971a3.39 3.39 0 1 0 2.65 6.241 3.39 3.39 0 0 0-2.65-6.241Z" />
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

