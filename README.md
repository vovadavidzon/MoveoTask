# MoveoTask
# Real-Time Code Sharing App
    This is a real-time code sharing application built using React, Node.js,mongoDb Socket.IO, and Monaco Editor.
 # Features:
 ## LobbyPage
**Title**: "Choose code block"
  **Code Blocks:**
     Add Two Numbers            
     find the ASCII value of a character
     Swap Two Variables
     Reverse a String
  **Clicking on a code block takes the user to the Code Block page with the details of the selected code block.**
 ## Code Block Page:
  1.Both users (mentor and student) enter this page.
  2.The first user to open the page becomes the mentor; subsequent users are considered students.
  **Mentor View:**
      Read-only mode for the selected code block.
  **Student View:**
      Ability to edit the code block.
  Real-time code changes displayed using Socket.io.
  Syntax highlighting using Highlight.js (supports JavaScript code only).
