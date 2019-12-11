import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Select = styled(AsyncSelect)`
  .react-select__control {
    width: 100%;
    height: 44px;
    margin: 8px 0 20px;
  }
  .react-select__value-container {
    display: flex;
    align-items: center;
    height: 44px;
  }
  .react-select__input input {
    height: 16px;
  }
`;
