import styled from 'styled-components';
import { lighten } from 'polished';
import Colors from '~/styles/colors';

export const Container = styled.div`
  padding-top: 32px;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
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
    text-transform: uppercase;
    background: ${Colors.Red};
    border-radius: 3px;
    color: #fff;
    height: 32px;
    font-size: 14px;
    font-weight: 600;
    padding: 18px 16px;
    transform: background 0.2s;
    &:hover {
      background: ${Colors.RedDarken};
    }

    > span {
      margin-left: 8px;
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
    input {
      color: ${lighten(0.4, '#333')};
      height: 36px;
      font-size: 14px;
      border: 1px solid ${lighten(0.7, '#333')};
      border-left: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      padding-left: 8px;
      &::placeholder {
        color: #aaa;
      }
    }
  }
`;

export const BoxIcon = styled.div`
  font-size: 12px;
  margin-left: 16px;
  border: 1px solid ${lighten(0.7, '#333')};
  border-right: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 0px 5px;
  background: #fff;
`;

export const Items = styled.div`
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 5px;
  table {
    border-radius: 5px;
    width: 100%;
    line-height: 48px;
    border-collapse: collapse;
    thead {
      th {
        color: #444444;
      }
    }

    tbody {
      tr {
        border-bottom: 1pt solid ${lighten(0.7, '#333')};

        &:last-child {
          border-bottom: none;
        }
      }
    }

    tr,
    th {
      justify-content: center;
      color: ${lighten(0.2, '#333')};
      text-align: center;
      font-size: 16px;
    }

    .align-left {
      text-align: left;
      width: 35%;
    }
    .align-right {
      text-align: right;
    }

    tr td.answer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
    td button {
      color: ${Colors.Red};
      border: 0;
      background: #fff;
      margin-left: 16px;
      font-weight: normal;
      font-size: 15px;
    }
    td button.help {
      color: blue;
      border: 0;
      background: #fff;
      margin-left: 16px;
      display: flex;
      justify-content: flex-end;
    }
    td a {
      color: #6696f0;
      font-weight: 15px;
    }
  }
`;

export const NoMoreData = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  text-align: center;
  align-items: center;

  strong {
    font-size: 24px;
    color: ${Colors.Red};
    margin: 24px;
  }
`;

export const DivBetween = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
