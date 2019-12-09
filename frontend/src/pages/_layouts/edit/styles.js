import styled from 'styled-components';
import { lighten } from 'polished';
import Colors from '~/styles/colors';

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  p {
    margin-top: 16px;
    margin-bottom: 4px;
    color: ${lighten(0.2, '#333')};
    font-weight: bold;
  }
`;

export const Nav = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  text-align: center;
  align-items: center;

  strong {
    font-size: 24px;
    color: #333;
  }
  a {
    display: flex;
    align-items: center;
    background: #ccc;
    border-radius: 4px;
    color: #fff;
    height: 32px;
    font-size: 14px;
    font-weight: 600;
    padding: 18px 16px;
    margin-right: 16px;
    transform: background 0.2s;
    &:hover {
      background: ${Colors.GrayDarken};
    }

    > svg {
      margin-right: 8px;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    > svg {
      background: #fff;
      height: 34px;
      margin-left: 8px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0px 16px;
    background: ${Colors.Red};
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;
    &:hover {
      background: ${Colors.RedDarken};
    }

    &:disabled {
      background: #ddd;
      opacity: 0.6;
      cursor: not-allowed;
    }

    > svg {
      margin-right: 8px;
    }
  }
`;

export const Box = styled.div`
  padding: 16px 32px 32px;
  background-color: #fff;
  border-radius: 4px;
  p {
    color: #333;
    margin-top: 16px;
    margin-bottom: 8px;
    font-weight: bold;
  }
  select {
    width: 100%;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 5px;
    color: ${lighten(0.1, '#333')};
    height: 45px;
    padding: 10px;
  }
  input {
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 20px;
  }

  span {
    color: red;
  }
`;
