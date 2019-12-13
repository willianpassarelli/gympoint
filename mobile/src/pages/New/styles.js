import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 20px;
`;

export const Input = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: '#999',
})`
  font-size: 16px;
  height: 300px;
  background: #fff;
  padding: 15px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px;
  margin-bottom: 20px;
`;
