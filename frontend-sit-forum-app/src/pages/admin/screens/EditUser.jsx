import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from '../../../services/index/users';

function EditUser(props) {
  const [show, setShow] = useState(false);
  const [adminStatus, setadminStatus] = useState(props.adminstatus);
  const [selectedValue, setSelectedValue] = useState(props.adminstatus);
  const userState = useSelector(state => state.user);
  const token = userState.userInfo.token;

  const customButton = {
    backgroundColor: 'rgb(147 51 234)',
    color: 'white',
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancel = () => {
    if (adminStatus !== selectedValue) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      );
      if (confirmCancel) {
        // User confirmed to cancel
        setadminStatus(selectedValue); // Reset the value to selectedValue
        handleClose(); // Close the modal
      }
    } else {
      // No changes have been made, directly close the modal
      handleClose();
    }
  };
  
    
  async function handleSave() {
    try {
      console.log(props.email);
      // Check if changes have been made
      if (adminStatus !== selectedValue) {
        // Perform the update logic here
        await updateUser({ token,email:props.email, admin:adminStatus });
        handleClose(); // Close the modal
        //reload the main admin page to show changes
        window.location.reload();
      } else {
        // No changes have been made, directly close the modal
        handleClose();
      }
    } catch (error) {
      console.error('Admin status cannot be saved: ', error);
    }
  };

  return (
    <>
     <Button variant = "custom" onClick={handleShow} style = {customButton}>
        Edit
     </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e) => {
          //to prevent autofresh
          e.preventDefault();
        }}
        
        className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label 
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
              for="name">
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="name" 
                type="text" 
                value={props.name}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label 
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
              for="email">
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              id="email" type="text" 
              value={props.email} />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label 
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
              for="adminstatus">
                Admin Status
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                id="adminstatus"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                value={adminStatus}
                onChange={(e) => {
                   setadminStatus(e.target.value);
                }}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
            </div>
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="shadow bg-slate-400 hover:bg-slate-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
          type="button" onClick={handleCancel}>
                Cancel
          </button>
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
          type="button" onClick={handleSave}>
                Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;