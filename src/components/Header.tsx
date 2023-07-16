import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ROUTER_PATH } from "router";
import { cartListState } from "recoil/cart";
import ServerSelector from "./ServerSelector";

const Header = () => {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartListState).length;

  const goToMain = () => {
    navigate(ROUTER_PATH.Main);
  };

  const goToCart = () => {
    navigate(ROUTER_PATH.Cart);
  };

  const goToOrderList = () => {
    navigate(ROUTER_PATH.OrderList);
  };

  return (
    <Wrapper>
      <TitleContainer onClick={goToMain}>
        <img src={process.env.PUBLIC_URL + "/assets/cart-icon.svg"} alt="홈카트" />
        <Title>SHOP</Title>
      </TitleContainer>
      <ServerSelector />
      <ButtonBox onClick={goToOrderList}>주문 목록</ButtonBox>
      <CartContainer onClick={goToCart}>
        장바구니
        <ItemQuantityBox quantity={cartCount}>{cartCount}</ItemQuantityBox>
      </CartContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 1;
  top: 0;

  width: 100%;
  height: 70px;
  padding: 0 5%;

  background: #333333;
`;

const TitleContainer = styled.section`
  display: flex;
  align-items: end;
  align-items: center;
  gap: 20px;

  cursor: pointer;

  & > img {
    width: 46px;
    height: 46px;
    margin: 5% 0;
  }
`;

const Title = styled.h2`
  color: white;
  font-weight: 900;
  font-size: 2rem;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const CartContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 24px;
  font-weight: 500;
  color: white;

  cursor: pointer;

  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const ItemQuantityBox = styled.div<{ quantity: number }>`
  visibility: ${(props) => (props.quantity < 1 ? "hidden" : "visible")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;

  background: #04c09e;
  border-radius: 50%;

  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

export default Header;

const ButtonBox = styled.button`
  margin-left: auto;
  margin-right: 1.5%;

  background: none;
  font-size: 24px;
  font-weight: 500;
  color: white;

  cursor: pointer;

  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
