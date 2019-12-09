import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  input {
    width: 100%;
  }

  > b {
    margin-top: 10px;
    font-weight: bolder;
    font-size: 29px;
    color: #ee4d64;
  }

  form {
    label {
      margin-bottom: 15px;
    }
    span {
      color: #ee4d64;
    }

    input {
      margin-bottom: 5px;
      &::placeholder {
        color: #a9a9a9;
      }
    }
  }
`;
