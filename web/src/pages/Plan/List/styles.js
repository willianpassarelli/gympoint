import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

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

export const PlanList = styled.div`
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

    th.title {
      width: 40%;
    }

    th.duration {
      text-align: center;
    }

    th.price {
      text-align: center;
    }

    td.duration {
      text-align: center;
    }

    td.price {
      text-align: center;
    }

    th.edit {
      width: 6%;
      text-align: left;
    }

    th.delete {
      width: 6%;
      text-align: left;
    }

    td.edit {
      text-align: right;

      a {
        font-size: 15px;
        background: transparent;
        color: #4d85ee;
        border: 0;

        :hover {
          color: ${lighten(0.06, '#4d85ee')};
        }
      }
    }

    td.delete {
      padding-left: 15px;
      text-align: right;

      button {
        font-size: 15px;
        background: transparent;
        color: #de3b3b;
        border: 0;

        :hover {
          color: ${lighten(0.06, '#de3b3b')};
        }
      }
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
`;
