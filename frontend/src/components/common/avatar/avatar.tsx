import PropTypes from "prop-types";
import { getColorByString, initial } from "../../../utils";

export interface AvatarProps {
  src?: string;
  alt: string;
  size: string;
}

export const Avatar = ({ src, alt, size }: AvatarProps) => {
  const fallback = initial(alt);

  return (
    <div
      className={`inline-flex mx-auto items-center justify-center rounded-full ${size}`}
      style={{ background: getColorByString(alt).color }}
    >
      {src ? (
        <img src={src} alt={alt} className="rounded-full" />
      ) : (
        <span>
          <span className="font-medium leading-none text-white">
            {fallback}
          </span>
        </span>
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
