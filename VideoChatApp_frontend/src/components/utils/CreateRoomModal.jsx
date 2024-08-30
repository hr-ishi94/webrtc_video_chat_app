import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ChatRoomPost } from '../../axios/Userserver';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from '../../redux/slices/ChatRoomSlice';
import { jwtDecode } from 'jwt-decode';

const CreateRoomModal = ({show,handleClose}) => {
  const dispatch = useDispatch()
  const UserToken = useSelector((state)=>state.UserToken)
  const {users,status, error} =useSelector((state)=>state.UserList) 
  const user_id  = jwtDecode(UserToken.access).user_id || null
  const [user] = users.filter((user)=>user.id === user_id)
  // console.log(user,'kk')
  const [formData, setFormData] = useState({
    Room_name:'',
    subject:'',
    created_by :user_id
  })
  
  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const res = await ChatRoomPost(formData)
      dispatch(addRoom(res.data))
      handleClose()
      setFormData({
        Room_name:'',
        subject:''
      })
      
    }catch(error){
      console.log(error,'error')
    }
  }

  // console.log(formData,'kk')
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#00796b"}}>Create Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                name='subject'
                value= {formData.subject}
                placeholder="Topic"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Room name"
                name ="Room_name"
                value={formData.Room_name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:'#00796b'}} variant="" className='text-light' type='submit'>
            Create Room
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form> 
    </Modal>
  )
}

export default CreateRoomModal