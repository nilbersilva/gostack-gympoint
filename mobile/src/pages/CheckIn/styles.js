import styled from 'styled-components/native';

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const CheckInItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 16px 16px;
  margin-bottom: 10px;
  border: solid 1px #ddd;
`;

export const CheckInLabel = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 14px;
`;

export const CheckInTime = styled.Text`
  color: #666666;
  font-size: 14px;
`;
