const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => "Your Notes..."

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find(note => note.title == title)
    // console.log(duplicateNotes)
    if(!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.blue('Note added !'))
    }
    else {
        printErr('Title already used !')
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const findToRemove = notes.findIndex(note => note.title == title)
    // console.log(findToRemove)
    if(findToRemove!==-1) {
        notes.splice(findToRemove, 1)
        saveNotes(notes)
        console.log(chalk.green('Note removed !'))
    }
    else {
        printErr('Title not found !')
    }
}

const listNote = () => {
    const notes = loadNotes()
    for(const note of notes) {
        console.log('Title: ' + chalk.green(note.title) + '\tBody: ' + chalk.green(note.body))
    }
}

const readNote = title => {
    const notes = loadNotes()
    const findToRead = notes.find(note => note.title == title)
    if(findToRead) {
        console.log(findToRead)
        printSuccess(findToRead)
    }
    else {
        printErr('Title not found !')
    }

}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e) {
        return []
    }
}

const printSuccess = str => console.log(chalk.green(str))
const printErr = str => console.log(chalk.red(str))

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}