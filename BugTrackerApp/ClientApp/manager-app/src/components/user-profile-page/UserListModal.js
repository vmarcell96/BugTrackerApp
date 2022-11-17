// import React from 'react'
// import { forwardRef } from 'react';

// const UserListModal = forwardRef(({ title, users, handleSubmit }, ref) => {
//     return (
//         <>
            
//                 <Modal show={show} onHide={() => { setShow(false); }}>
//                     <Modal.Title className="page-title">{title}</Modal.Title>
//                     <Modal.Body>
//                         <ListGroup as="ul">
//                             {
//                                 users.map(u => {
//                                     return (
//                                         <ListGroup.Item as="li" value={u.id} active={u.id === userId} onClick={onChange}>{u.userName}</ListGroup.Item>
//                                     )
//                                 })
//                             }
//                         </ListGroup>
//                         <div className="d-flex justify-content-center">
//                             <Button disabled={userId === 0} className="button mt-2" onClick={handleSubmit}>
//                                 Send Request
//                             </Button>
//                         </div>
//                     </Modal.Body>
//                 </Modal>
//         </>
//     )
// });

// export default UserListModal