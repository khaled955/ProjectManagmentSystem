
import { Card, Row, Col, Badge } from 'react-bootstrap';
import type { Project } from '../../../../Interfaces/Project.interface';

export default function ProjectDetails({currentProject:{manager,creationDate,description,modificationDate,title},handleHideProjectCard}:{currentProject:Project,handleHideProjectCard:()=>void}) {


  return (
    <section className='card-details position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center' style={{zIndex:99999 ,backgroundColor:"#42696180"}}>
      <Card className="shadow-lg border-0 rounded-4 p-3 bg-white position-relative">
   <div className="close-btn position-absolute top-0 end-0">
<i onClick={handleHideProjectCard} className="fa-solid fa-circle-xmark fs-4"></i>
   </div>

      <Row>
        <Col md={4} className="text-center">
         
          <h5 className="mt-3 text-primary">{manager.userName}</h5>
          <Badge bg={manager.isVerified ? 'success' : 'danger'}>
            {manager.isVerified ? 'Verified' : 'Unverified'}
          </Badge>
          <div className="text-muted mt-2 small">Manager ID: {manager.id}</div>
        </Col>

        <Col md={8}>
          <h4 className="text-info">{title}</h4>
          <p className="text-muted mb-1">{description}</p>
          <hr />
          <Row className="mb-2">
            <Col sm={6}><strong>Created:</strong> {new Date(creationDate).toLocaleDateString()}</Col>
            <Col sm={6}><strong>Updated:</strong> {new Date(modificationDate).toLocaleDateString()}</Col>
          </Row>

          <h6 className="text-secondary">Manager Details</h6>
          <Row>
            <Col sm={6}><strong>Email:</strong> {manager.email}</Col>
            <Col sm={6}><strong>Phone:</strong> {manager.phoneNumber}</Col>
            <Col sm={6}><strong>Country:</strong> {manager.country}</Col>
            <Col sm={6}><strong>Status:</strong> {manager.isActivated ? 'Active' : 'Inactive'}</Col>
          </Row>
        </Col>
      </Row>
    </Card>
    </section>
  );
}
