import type { UserDetailsProps } from "../../../../Interfaces/Users.interface";
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { baseURL } from "../../../../Services/URL";
import avatar from "../../../../assets/images/th.jpeg"

export default function UserDetails({ currentUser, handleHideUserCard }: UserDetailsProps) {
  return (
    <section
      className="card-details position-fixed top-0 bottom-0 start-0 end-0 row justify-content-center align-items-center"
      style={{ zIndex: 99999, backgroundColor: '#42696180' }}
    >
      <Card className="shadow-lg border-0 rounded-4 p-3 bg-white position-relative col-md-6">
        <div className="close-btn position-absolute top-0 end-0">
          <i onClick={handleHideUserCard} className="fa-solid fa-circle-xmark fs-4"></i>
        </div>

        <Row>
          <Col md={4} className="text-center">
            <img
              src={ currentUser.imagePath ?`${baseURL}/${currentUser.imagePath}`:avatar}
              alt={currentUser.userName}
              className="img-fluid rounded-circle border border-2 border-primary"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <h5 className="mt-3 text-primary">{currentUser.userName}</h5>
            <Badge bg={currentUser.isActivated ? 'success' : 'danger'}>
              {currentUser.isActivated ? 'Active' : 'Inactive'}
            </Badge>
            <div className="text-muted mt-2 small">User ID: {currentUser.id}</div>
          </Col>

          <Col md={8}>
            <h4 className="text-info">{currentUser.email}</h4>
            <p className="text-muted mb-1">Phone: {currentUser.phoneNumber}</p>
            <hr />
            <Row className="mb-2">
              <Col sm={6}>
                <strong>Created:</strong>{' '}
                {new Date(currentUser.creationDate).toLocaleDateString()}
              </Col>
              <Col sm={6}>
                <strong>Updated:</strong>{' '}
                {new Date(currentUser.modificationDate).toLocaleDateString()}
              </Col>
            </Row>

            <h6 className="text-secondary">User Details</h6>
            <Row>
              <Col sm={6}><strong>Country:</strong> {currentUser.country}</Col>
              <Col sm={6}><strong>Status:</strong> {currentUser.isActivated ? 'Active' : 'Inactive'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </section>
  );
}
