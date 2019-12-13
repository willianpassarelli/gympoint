import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Card = styled.TouchableOpacity`
  flex-direction: column;
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  height: 150px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const HelpOrderAnswer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AnswerIcon = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AnswerText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin-left: 8px;
  color: ${props => (props.answer ? '#42CB59' : '#999')};
`;

export const AnswerDate = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 15px;
  color: #666;
  font-size: 14px;
  line-height: 25px;
`;
