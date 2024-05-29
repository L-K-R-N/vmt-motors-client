import styled from 'styled-components';
import { ReactElement } from 'react';
import { CloseBtn } from './CloseBtn';

const ModalContainer = styled.div<ModalContainerProps>`
   width: 100vw;
   height: 100vh;
   background: rgba(0, 0, 0, 0.462);
   position: fixed;
   z-index: 9999;
   top: 0;
   left: 0;
   overflow: hidden;
   display: ${(props) => (props.isShow ? 'block' : 'none')};
   /* transform: ${(props) =>
      props.isShow ? 'translateY(0)' : 'translateY(1000vh)'}; */
`;

interface ModalContainerProps {
   isShow: boolean;
}

const ModalContent = styled.div`
   width: auto;
   height: auto;
   max-width: 50%;
   max-height: 70%;
   position: absolute;
   border-radius: 20px;
   background-color: rgb(255, 255, 255);
   -webkit-backdrop-filter: blur(7px);
   backdrop-filter: blur(7px);
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   overflow: hidden;
`;

const ModalHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   padding: 15px 15px;
   color: black;
`;

const ModalMain = styled.div`
   padding: 10px 15px;
`;

const ModalTitle = styled.h4`
   font-size: 26px;
`;

interface Props {
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   isShow: boolean;
   title: string;
   children: ReactElement;
}

export const Modal: React.FC<Props> = ({
   setShow,
   title,
   children,
   isShow,
}) => {
   return (
      <ModalContainer isShow={isShow}>
         <ModalContent>
            <ModalHeader>
               <ModalTitle>{title}</ModalTitle>
               <CloseBtn setState={setShow} color="black" />
            </ModalHeader>
            <ModalMain>{children}</ModalMain>
         </ModalContent>
      </ModalContainer>
   );
};
