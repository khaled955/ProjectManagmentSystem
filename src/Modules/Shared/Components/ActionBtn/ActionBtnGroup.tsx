import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEye, BsPencil, BsTrash } from 'react-icons/bs';





const ActionBtnGroup = () => {




  return (
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        className="btn btn-link p-0 border-0"
        id="dropdown-custom-button"
      >
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm rounded-3">

{/*  view btn */}
        <Dropdown.Item >
          <BsEye className="me-2 text-success" />
          View
        </Dropdown.Item>

        

 

 {/* edit btn */}
        <Dropdown.Item >
          <BsPencil className="me-2 text-primary" />
          Edit
        </Dropdown.Item>

{/* delet btn */}
      <Dropdown.Item >
          <BsTrash className="me-2 text-danger" />
          Delete
        </Dropdown.Item>



      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionBtnGroup;
