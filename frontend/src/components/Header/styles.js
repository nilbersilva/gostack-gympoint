import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 0px 30px;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 2px;
      width: 56px;
    }
    span {
      height: 100%;
      font-size: 15px;
      font-weight: bold;
      color: ${Colors.Red};
      margin-left: 10px;
      padding-right: 20px;
      line-height: 40px;
      vertical-align: center;
      border-right: 1px solid #ddd;
    }

    a {
      margin-left: 20px;
      margin-right: 20px;
      font-weight: bold;
      font-size: 15px;
      color: #999999;
      &:hover {
        color: #000;
      }
    }
  }
  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    strong {
      color: #666666;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    a {
      color: ${Colors.Red};
      font-size: 14px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  /*border-left: 1px solid #ddd;*/

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: ${Colors.Red};
      &:hover {
        color: ${Colors.RedDarken};
        font-weight: bold;
      }
    }
  }
  /*img {
    height: 32px;
    border-radius: 50%;
  }*/
`;
