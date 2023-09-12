import "./Modal.scss";

import { Modal as AntdModal } from 'antd';

const Modal = ({
    open,
    title = "",
    content = <></>,
    close
               }) => {
    return <AntdModal title={title}
                      className={"__modal-container"}
                      open={open}
                      footer={null}
                      onCancel={close}>
                        
        {content}
    </AntdModal>
}

export default Modal;