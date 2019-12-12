import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 1380px;
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

export const EnrollmentList = styled.div`
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

    th.student {
      width: 20%;
    }

    th.center {
      text-align: center;
    }

    td.center {
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
      padding-left: 8px;
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

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  button {
    transition: opacity 0.25s ease-out;
    border: 0;
    margin: 0 10px;

    cursor: pointer;

    &[disabled] {
      opacity: 0.35;
    }
  }

  svg {
    color: #de3b3b;
    width: 25px;
    height: 25px;
  }

  span {
    font-size: 14px;
    font-weight: 700;
  }
`;
