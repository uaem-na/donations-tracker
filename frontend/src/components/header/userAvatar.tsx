import * as Avatar from "@radix-ui/react-avatar";
import PropTypes from "prop-types";
import styled from "styled-components";

export const UserAvatar = ({ firstName, imageSrc }) => {
  return (
    <AvatarRoot>
      {imageSrc && <AvatarImage src={imageSrc} alt={firstName} />}
      <AvatarFallback delayMs={600}>{firstName[0] || "U"}</AvatarFallback>
    </AvatarRoot>
  );
};

UserAvatar.propTypes = {
  firstName: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

const AvatarRoot = styled(Avatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-color: var(--color-gray-100);
`;

const AvatarImage = styled(Avatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const AvatarFallback = styled(Avatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--color-primary);
  font-size: 20px;
  line-height: 1;
  font-weight: 500;
`;

export default UserAvatar;
