
import type { UserDetailsProps } from "../../../../Interfaces/Users.interface";
import {  Row, Col, Badge } from 'react-bootstrap';
import { baseURL } from "../../../../Services/URL";
import avatar from "../../../../assets/images/th.jpeg";

export default function UserDetails({ currentUser, handleHideUserCard }: UserDetailsProps) {
  return (
    <section
      className="card-details position-fixed top-0 bottom-0 start-0 end-0 row justify-content-center align-items-center"
      style={{ zIndex: 99999, backgroundColor: '#42696180' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-details-heading"
    >
      <article className="shadow-lg border-0 rounded-4 p-3 bg-white position-relative col-md-6" role="document">
        <header className="d-flex justify-content-end">
          <button
            onClick={handleHideUserCard}
            className="btn btn-link text-danger p-0"
            aria-label="Close user details"
          >
            <i className="fa-solid fa-circle-xmark fs-4"></i>
          </button>
        </header>

        <Row>
          <Col md={4} className="text-center">
            <img
              src={currentUser.imagePath ? `${baseURL}/${currentUser.imagePath}` : avatar}
              alt={`${currentUser.userName}'s profile`}
              className="img-fluid rounded-circle border border-2 border-primary"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <h2 id="user-details-heading" className="mt-3 text-primary h5">{currentUser.userName}</h2>
            <Badge bg={currentUser.isActivated ? 'success' : 'danger'}>
              {currentUser.isActivated ? 'Active' : 'Inactive'}
            </Badge>
            <div className="text-muted mt-2 small">User ID: {currentUser.id}</div>
          </Col>

          <Col md={8}>
            <p className="text-info fw-bold" aria-label="Email">{currentUser.email}</p>
            <p className="text-muted mb-1" aria-label="Phone number">Phone: {currentUser.phoneNumber}</p>
            <hr aria-hidden="true" />
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

            <h3 className="text-secondary h6">User Details</h3>
            <Row>
              <Col sm={6}><strong>Country:</strong> {currentUser.country}</Col>
              <Col sm={6}><strong>Status:</strong> {currentUser.isActivated ? 'Active' : 'Inactive'}</Col>
            </Row>
          </Col>
        </Row>
      </article>
    </section>
  );
}
