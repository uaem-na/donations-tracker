import PropTypes from "prop-types";

export interface AvatarProps {
  src?: string;
  alt: string;
  size: string;
}

export const Avatar = ({ src, alt, size }: AvatarProps) => {
  const fallback = alt.charAt(0);

  return (
    <div
      className={`flex items-center justify-center rounded-full ${size} bg-gray-300`}
    >
      {src ? (
        <img src={src} alt={alt} className="rounded-full" />
      ) : (
        <div className="text-gray-600 text-xl font-bold">{fallback}</div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Avatar;
