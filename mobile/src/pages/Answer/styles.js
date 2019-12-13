import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Card = styled.View`
  flex-direction: column;
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px;
`;

export const HeaderQuestion = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const Date = styled.Text`
  color: #666;
`;

export const Text = styled.Text`
  color: #666;
  line-height: 25px;
  margin: 10px 0;
`;

export const BodyAnswer = styled.View``;
