import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import TextInfutField from './form/TextInfutField'

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss : () => void,
    onNoteSaved : (note: Note) => void

}


const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved} : AddEditNoteDialogProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    })

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note
            if(noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            } else {
                noteResponse = await NotesApi.createNote(input)
            }

            onNoteSaved(noteResponse)
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

  return (
    <Modal show onHide={onDismiss} >
        <Modal.Header closeButton >
            <Modal.Title  >
                {noteToEdit ? "Edit Note" : "Add A New Note"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)} >
                <TextInfutField
                name='title'
                label='Title'
                type="text"
                register={register}
                registerOptions={{required: "Required"}}
                error={errors.title}
                />
                <TextInfutField 
                name='text'
                label='Text'
                placeholder="Text"
                as="textarea"
                register={register}
                rows={5}

                />
               
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button type='submit' form='addEditNoteForm' disabled={isSubmitting} >
                Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog