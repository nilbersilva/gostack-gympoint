import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import Colors from '~/styles/colors';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  /* display: ${props => props.display}; */
  display: block;
  ${props => {
    switch (props.fadeType) {
      case 'in':
        return css`
          visibility: visible;
          opacity: 1;
          transition: opacity linear 0.15s;
        `;
      default:
        return css`
          visibility: hidden;
          opacity: 0;
          transition: opacity linear 0.15s, visibility 0.16s;
        `;
    }
  }};
`;

export const ModalMain = styled.section`
  position: fixed;
  background: #fff;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.display};
  padding: 20px;
  border-radius: 5px;
  min-height: 200px;
  text-transform: none;
  span {
    color: ${Colors.Red};
  }
  p {
    color: ${lighten(0.2, '#333')};
    /* text-transform: uppercase; */
    width: 100%;
    margin-top: 12px;
  }
  p.question {
    color: #666;
    width: 100%;
    text-transform: none;
    font-weight: normal;
    margin: 8px 0px 8px;
  }
  input {
    height: 100px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ddd;
    color: #666;
    margin-top: 8px;
    padding: 0 8px;
    padding-bottom: 60px;

    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    background: ${Colors.Red};
    width: 100%;
    margin-top: 16px;
    height: 42px;
    border: 0;
    border-radius: 5px;
    font-weight: bold;

    transform: background 0.2s;
    &:hover {
      background: ${Colors.RedDarken};
    }
  }

  .secondary {
    color: #000;
    background: #ddd;
    transform: background 0.2s;
    &:hover {
      background: #ccc;
    }
  }

  .sucess {
    color: #fff;
    background: #00c853;
    transform: background 0.2s;
    &:hover {
      background: ${darken(0.05, '#00c853')};
    }
  }
`;
