'use client';
import Accordion from 'react-bootstrap/Accordion';
import EventSearchCard from '../home/EventSearchCard';
import { Container } from 'react-bootstrap';
function CollapsibleEventSearch() {
  return (
    <Container fluid>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Advanced Search</Accordion.Header>
          <Accordion.Body>
            <EventSearchCard />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default CollapsibleEventSearch;
