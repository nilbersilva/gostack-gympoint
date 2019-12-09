import styled from 'styled-components/native';

export const Container = styled.View`
  height: 46px;
  background: #fff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;

  border: 1px solid #ddd;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding: 0 16px;
`;
