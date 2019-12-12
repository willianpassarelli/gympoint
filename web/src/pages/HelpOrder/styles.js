import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 700px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    margin-bottom: 20px;

    strong {
      color: #444;
      font-size: 24px;
    }
  }
`;

export const HelpList = styled.div`
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: #999;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead th {
      color: #444;
      text-align: left;
      padding: 12px 0;
    }

    tbody td {
      padding: 12px 0;
      font-size: 16px;
      text-align: left;
      color: #666;
      margin: 0 auto;
      border-bottom: 1px solid #eee;
    }

    td.edit {
      text-align: right;

      button {
        font-size: 15px;
        background: transparent;
        color: #4d85ee;
        border: 0;

        :hover {
          color: ${lighten(0.06, '#4d85ee')};
        }
      }
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
`;
