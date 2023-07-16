import { ChangeEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { serverSelectState } from "recoil/server";
import { styled } from "styled-components";
import { ServerId } from "recoil/server";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "router";
import { useReloadFromServer } from "hooks/useReloadFromServer";

const ServerSelector = () => {
  const navigate = useNavigate();
  const [serverState, setServerState] = useRecoilState(serverSelectState);
  const { reloadCartList, reloadOrderList } = useReloadFromServer();

  const changeServer = (e: ChangeEvent<HTMLInputElement>) => {
    setServerState(e.target.id as ServerId);
    navigate(ROUTER_PATH.Main);
  };

  useEffect(() => {
    reloadCartList();
    reloadOrderList();
  }, [serverState]);

  const serverList: { [key in ServerId]: string } = {
    msw: "MSW",
    "ttaengchil-server": "땡칠",
    "ori-server": "오리",
  };

  return (
    <Wrapper>
      {Object.entries(serverList).map(([id, name]) => (
        <InputBox key={id}>
          <Input
            type="radio"
            name="server"
            id={id}
            checked={serverState === id}
            onChange={changeServer}
          />
          {name}
        </InputBox>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.fieldset`
  display: flex;
  justify-content: space-around;
  margin-left: auto;

  width: 200px;

  padding: 8px;
  border: 1px solid white;
  border-radius: 4px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: fit-content;
    margin-left: 4%;
    padding: 4px;

    font-size: 13px;
  }
`;

const InputBox = styled.label`
  color: white;
`;

const Input = styled.input`
  margin-right: 6px;
`;

export default ServerSelector;
