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
      margin: 8px 15px 20px 0;
      font-size: 16px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;

      ::placeholder {
        color: #999;
      }
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

      svg {
        margin-right: 8px;
      }
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
`;
