import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${Colors.Red};
  display: flex;
`;

export const Content = styled.div`
  background: #fff;
  height: 448px;
  width: 360px;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  padding: 30px;
  img {
    margin-top: 26px;
  }
  /*span {
    margin-top: 5px;
    font-weight: bold;
    font-size: 29px;
    color: #ee4d64;
  }*/
  form {
    margin-top: 15px;
    padding: 10px;
    display: flex;
    width: 100%;
    flex-direction: column;
    p {
      font-weight: bold;
      font-size: 14px;
      margin-top: 5px;
    }
    input {
      height: 45px;
      border-radius: 4px;
      border: 1px solid #eee;
      padding: 20px;
      margin-top: 5px;
      margin-bottom: 15px;
    }
  }

  button {
    margin: 10px 0 0;
    height: 44px;
    background: ${Colors.Red};
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    &:hover {
      background: ${Colors.RedDarken};
    }
  }
`;
