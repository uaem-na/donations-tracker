import { renderToStaticMarkup } from "react-dom/server";

type statusType = "request" | "offer";

const typeColorMapping: Record<statusType, string> = {
  request: "#2563EB",
  offer: "#7C3AED",
};

export const MapPin = (type: string) => {
  const markerSvgString = encodeURIComponent(
    renderToStaticMarkup(<PinSvg type={type} />)
  );

  const markerPinUrl = `data:image/svg+xml,${markerSvgString}`;

  return markerPinUrl;
};

const PinSvg = ({ type }: { type: string }) => {
  const color = typeColorMapping[type as statusType] || "#FF5F6D";
  return (
    <svg
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="pin-gradient"
          x1="12"
          y1="0"
          x2="12"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color} />
          <stop offset="1" stop-color={color} />
        </linearGradient>
      </defs>
      <path
        d="M12 0C5.373 0 0 5.373 0 12C0 22.46 12 36 12 36C12 36 24 22.46 24 12C24 5.373 18.627 0 12 0ZM12 18C9.243 18 7 15.757 7 13C7 10.243 9.243 8 12 8C14.757 8 17 10.243 17 13C17 15.757 14.757 18 12 18Z"
        fill="url(#pin-gradient)"
      />
    </svg>
  );
};
