import styled from 'styled-components/native';

export const Question = styled.TextInput.attrs({
  multiline: true,
  textAlignVertical: 'top',
})`
  min-height: 200px;
  height: 60%;
  border-radius: 4px;
  border: solid 1px #dddddd;
  background-color: #ffffff;
  margin: 8px 0px 16px;
  padding: 15px;
`;
