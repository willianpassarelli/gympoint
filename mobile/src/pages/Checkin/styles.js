import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Card = styled.View`
  justify-content: space-between;
  align-items: center;
  background: #fff;
  flex-direction: row;
  padding: 15px;
  margin-bottom: 10px;
  height: 46px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px;
`;

export const CheckinTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const CheckinDate = styled.Text`
  font-size: 14px;
  color: #444;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
