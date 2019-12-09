import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const HelpOrderItem = styled(TouchableOpacity)`
  background: #fff;
  border: 1px solid #ddd;
  padding: 8px 16px;
  margin-bottom: 8px;
`;

export const HelpOrderItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HelpOrderLabel = styled.Text`
  font-size: 12px;
  color: ${props => (props.disabled ? '#999' : '#42cb59')};
  margin-left: 8px;
`;

export const HelpOrderTime = styled.Text`
  color: #666666;
  font-size: 12px;
`;

export const HelpOrderText = styled.Text`
  font-size: 12px;
  color: #666;
  line-height: 26px;
  margin-top: 8px;
`;
