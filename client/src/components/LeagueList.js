import React, { useState, useContext } from "react";
import { Button, Table, Modal, Form, Col } from "react-bootstrap";
import { LeagueContext } from "../context/LeagueContext";

const LeagueList = () => {
  const { leagues, addLeague, updateLeague, deleteLeague, inviteFriend } =
    useContext(LeagueContext);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [currentLeague, setCurrentLeague] = useState({});
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (league) => {
    setCurrentLeague(league);
    setForm({ title: league.title, description: league.description });
    setShowEdit(true);
  };

  const handleInviteClose = () => setShowInvite(false);
  const handleInviteShow = (league) => {
    setCurrentLeague(league);
    setShowInvite(true);
  };

  const handleCreateLeague = (event) => {
    event.preventDefault();
    addLeague({ ...form, owner: "You" });
    handleClose();
  };

  const handleUpdateLeague = (event) => {
    event.preventDefault();
    updateLeague({ ...currentLeague, ...form });
    handleEditClose();
  };

  const handleInviteFriend = (event) => {
    event.preventDefault();
    inviteFriend(currentLeague._id, email);
    handleInviteClose();
  };

  const handleDeleteLeague = (id) => {
    if (window.confirm("Are you sure you want to delete this league?")) {
      deleteLeague(id);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Leagues</h2>
      <Col className="text-end">
        <Button variant="primary" onClick={handleShow}>
          Create League
        </Button>
      </Col>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Invited Friends</th>
            <th>Owner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => (
            <tr key={league._id}>
              <td>{league.title}</td>
              <td>{league.description}</td>
              <td>{league.members.join(", ")}</td>
              <td>{league.owner}</td>
              <td>
                <Button
                  variant="info"
                  className="mr-2"
                  onClick={() => handleInviteShow(league)}
                >
                  Invite Friend
                </Button>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => handleEditShow(league)}
                >
                  Edit League
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteLeague(league._id)}
                >
                  Delete League
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Create League Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create League</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateLeague}>
          <Modal.Body>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter league title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter league description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create League
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit League Modal */}
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit League</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateLeague}>
          <Modal.Body>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter league title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter league description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update League
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Invite Friend Modal */}
      <Modal show={showInvite} onHide={handleInviteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite Friend</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleInviteFriend}>
          <Modal.Body>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter friend's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleInviteClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Invite Friend
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default LeagueList;
