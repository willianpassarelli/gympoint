import styled from 'styled-components/native';
import logoHeader from '~/assets/logo-header.png';

export const Container = styled.SafeAreaView`
  height: 94px;
  align-items: center;
  justify-content: center;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
`;

export const Logo = styled.Image.attrs({
  source: logoHeader,
  resizeMode: 'cover',
})`
  width: 116px;
  height: 18;
`;
