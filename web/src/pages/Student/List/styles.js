import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
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

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 237px;
  padding: 0 15px;
  margin-left: 15px;

  input {
    border: 0;
    width: 100%;
    background: transparent;
    font-weight: normal;

    ::placeholder {
      color: #999;
    }
  }
`;

export const StudentList = styled.div`
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

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

    th.name {
      width: 40%;
    }

    th.age {
      width: 30%;
      text-align: center;
    }

    th.edit {
      width: 5%;
      text-align: left;
    }

    th.delete {
      width: 6%;
      text-align: left;
    }

    td.age {
      text-align: center;
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
      padding-left: 5px;
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
