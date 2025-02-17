import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { T_AvatarSize } from '../../types/T_AvatarSize';

const Image = styled.img<{ $size: T_AvatarSize }>`
  border-radius: 100%;
  object-fit: cover;

  ${(props) => {
    switch (props.$size) {
      case 'small':
        return css`
          width: 40px;
          height: 40px;
        `;
      default:
        return css`
          width: 60px;
          height: 60px;
        `;
    }
  }};
`;

interface AvatarProps {
  size: T_AvatarSize;
  src: string;
}

const Avatar: FC<AvatarProps> = ({ size, src }) => {
  return <Image $size={size} alt='Аватар' src={src} />;
};

export default Avatar;
