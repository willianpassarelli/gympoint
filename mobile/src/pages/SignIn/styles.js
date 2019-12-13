import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 5px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  color: #444;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  height: 45px;
  padding: 10px;
  font-size: 16px;
  margin: 15px 0;
`;
