import styled from "styled-components";

export const UserMediaLayout = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 1rem;
  background: var(--color-black);
`;

export const LocalNameView = styled.p`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  padding: 1rem 2rem;
  place-content: center;
  border-radius: 1rem;
  box-shadow: var(--box-shadow-1);

  background: var(--color-blue);
  color: var(--color-white);
`;

export const UserNameView = styled(LocalNameView)`
  background: rgba(0, 0, 0, 0.7);
`;

export const UserVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
`;
