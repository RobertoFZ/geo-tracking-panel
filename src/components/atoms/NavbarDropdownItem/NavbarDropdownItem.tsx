import styled from 'styled-components';

export const NavbarDropdownItem = styled.div`
  cursor: pointer;
  float: right;
  display: inline-flex;
  position: relative;

  text-align: center;
  line-height: 30px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24);

  margin: 12px 0;
  padding: 0.3rem 2rem;
  border-radius: 15px;

  &__image {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    height: 10px;
    line-height: 35px;
    margin-left: 5px;
  }
`;