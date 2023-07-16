import styled from "styled-components";
import QuantityCounter from "components/QuantityCounter";
import { Product } from "api/products";
import { addCartItem } from "api/cartItems";
import { cartSelector } from "recoil/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import { serverSelectState } from "recoil/server";

interface Props {
  item: Product;
}

const Item = ({ item }: Props) => {
  const selectedServer = useRecoilValue(serverSelectState);
  const [cartItem, setCartItem] = useRecoilState(cartSelector(item.id));

  const handleCartClicked = async () => {
    const cartItemId = await addCartItem(selectedServer, item.id);

    if (!cartItemId) {
      alert("서버와의 통신이 원활하지 않습니다. 잠시후 다시 시도해주세요.");
      return;
    }

    setCartItem({ id: Number(cartItemId), quantity: 1, isChecked: true, product: item });
  };

  return (
    <Wrapper>
      <ImageBox>
        <img src={item.imageUrl} alt={`${item.name} 상품 이미지`} />
      </ImageBox>
      <NameBox>{item.name}</NameBox>
      <PriceBox>{item.price.toLocaleString()}원</PriceBox>
      <IconContainer>
        {cartItem ? (
          <QuantityCounter itemId={item.id} />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/assets/cart-gray-icon.svg"}
            alt={"카트"}
            onClick={handleCartClicked}
          />
        )}
      </IconContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;

  position: relative;
`;

const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;

  margin-bottom: 18px;

  & > img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 5px;
  }

  &:hover {
    scale: 1.1;
    box-shadow: 0 10px 10px -3px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
  }
`;

const NameBox = styled.div`
  width: 190px;
  margin: 10px 0 10px 10px;

  font-size: 17px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    margin: 5px 0 5px 5px;
    font-size: 18px;
  }
`;

const PriceBox = styled.p`
  margin-left: 10px;

  font-size: 20px;

  @media screen and (max-width: 800px) {
    margin-left: 5px;

    font-size: 20px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;

  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;

    transition: all 0.4s ease-out;

    &:hover {
      transform: scale(1.12);
      opacity: 60%;
    }
  }

  @media screen and (max-width: 1200px) {
    bottom: -5px;
  }
`;

export default Item;
