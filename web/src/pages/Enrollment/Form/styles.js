import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;

    input {
      margin: 8px 0 20px;
      font-size: 16px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;

      ::placeholder {
        color: #999;
      }

      :disabled {
        background: #f5f5f5;
      }
    }

    select {
      margin: 8px 0 20px;
      font-size: 16px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      color: #444;
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      font-size: 12px;
    }
  }

  header {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;

    strong {
      color: #444;
      font-size: 24px;
    }

    div {
      display: flex;
      flex-direction: row;
    }
  }
`;

export const Column = styled.div`
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: ${props => (props.nospace ? '0px' : '15px')};
`;
