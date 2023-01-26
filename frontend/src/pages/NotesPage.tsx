import React from 'react'
import { Container } from 'react-bootstrap'
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import { User } from '../models/user';
import styles from '../styles/NotePage.module.css';

interface NotesPagesProps {
    loggedInUser: User | null
}


const NotesPage = ({ loggedInUser }: NotesPagesProps) => {
  return (
    <Container className={styles.notesPage} >
      <>
      {
        loggedInUser ?
        <NotesPageLoggedInView /> :
        <NotesPageLoggedOutView />
      }
      </>
      
      
    </Container>
  )
}

export default NotesPage