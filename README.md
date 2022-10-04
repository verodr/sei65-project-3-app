# PROJECT 3 - “Read it” 
## Description
For my third project with General Assembly, I’ve built with my colleagues, Mark and Rokas, a full-stack React app using Node.js, Express & MongoDB.
We decided to create an app inspired by the more famous “Reddit” which we have humorously called “Read it”, on which the user, once registered, can add and delete topics with images, comment on other users’ topics and like or dislike a topic.
<img width="1440" alt="Screenshot 2022-09-28 at 16 15 50" src="https://user-images.githubusercontent.com/106544788/193927746-35dcc4ff-09e9-467f-bf7e-3e0070fc6359.png">

## Deployment link
[https://ga-read-it.netlify.app/](https://ga-read-it.netlify.app/)

## Project Members:
- Veronica De Ronzi [github.com/verodr ](https://github.com/verodr)
- Mark Muyuela:https: [github.com/markmuy40](https//github.com/markmuy40)
- Rokas Arlauskas: [github.com/rokster112](https://github.com/rokster112)

## Timeframe
5 days

## Technologies Used
- HTML
- CSS
- SASS
- React
- Express
- MongoDB
- Insomnia
- React Bootstrap
- Heroku
- Netlify
- JavaScript
- Git
- GitHub
- Google Fonts
- Excalidraw 
- GIMP 2.10 
- Google Dev tools
- VSCode

## Brief
- Build a full-stack application by making your own backend and your own frontend using  Express API to serve your data from a MongoDb database;
- Consume your API with a separate front-end built with React;
- Be deployed online so it's publicly accessible.

## Planning
First of all, my colleagues and I decided together what kind of app we were going to build. Then we built our wireframe with all the details regarding the frontend and backend using Excalidraw, as well as the organization of the work. We have coordinated our tasks using GitHub and communicating through Slack and Zoom.

## Timeline 
### Backend
Day 1 and 2:

1. Create backend wireframe: 
  - import dependencies,
  - create files,
  - add routes,
  - check endpoints.
2. Check Routes;
3. Upload to GitHub;
4. Git pull repos to work on individual pages;
5. Split work up;
6. Test through Insomnia.

### Frontend
Day 3/4/5:

1. Create frontend wireframe;
2. Check endpoints;
3. Upload to GitHub;
4. Branch repo and work on pages individually;  
5. Check functionalities;
6. Styling.

![image3](https://user-images.githubusercontent.com/106544788/193930153-611c1106-8780-4a76-adeb-0e3f1467f1ae.png)
## Build/Code Process
Once we received the green light from our instructors, we divided the work to be done, each choosing a different file.js, to avoid creating too many conflicts at the time of the merge on GitHub.
Mark built the Homepage, writing the functions that allowed him to filter the Latest Topic, the topic with Most Comments and that with Most Likes through three different axios.get requests.
```javascript
useEffect(() => {
   const getData = async () => {
     try {
 
       const { data: latestTopic } = await axios.get('https://readit-project.herokuapp.com/latest-topic')
       const { data: mostComments } = await axios.get('https://readit-project.herokuapp.com/highest-comment')
       const { data: mostLikes } = await axios.get('https://readit-project.herokuapp.com/most-likes')
       setTopics([...topics, { ...latestTopic, title: 'Latest Topic' }, { ...mostComments, title: 'Most Comments' }, { ...mostLikes, title: 'Most Likes' }])
     } catch (errors) {
       console.log(errors)
       setErrors(true)
     }
   }
   getData()
 }, [])
 ```
 He also created the All Topics  route, which shows all the topics added from the users, including the user’s name and the date it was uploaded.
 ```javascript
  <div>
         {Object.values(topics).length > 0
           ?
           Object.values(topics).map((topic, index) => (
             <div key = {index}>
               <div className="home-title">{topic.title}</div>
               <div key={topic[0]._id} className="topic">
                 <div className="topic-text">
                   <Link to ={`/topic/${topic[0]._id}`}>
                     <div className="topic-date">{topic[0].topicUser} Added on: {topic[0].createdAt.split('T')[0]} at: {topic[0].createdAt.split('T')[1].split('.')[0]}</div>
                     <div className="title">{topic[0].topic}</div>
                     <div className="description">{topic[0].description}</div>
                   </Link>
```
Meanwhile Rockas was busy creating the login and registration pages, which allow the user to interact with the functionalities of the app, only after receiving its own token.
```javascript
const onSubmit = async (e) => {
   e.preventDefault()
    try {
     const res = await axios.post('https://readit-project.herokuapp.com/login', loginData)
     const { token } = res.data
     localStorage.setItem('token', token)
     localStorage.setItem('userName', loginData.userName)
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
     navigate('/')
   } catch (error) {
     console.log(error)
     setErrors(error.response.data.message)
   }
 }
```
Personally I’ve been working mostly on the back-end of the Comments Page, building add/delete/update-comments functionalities as well as “like” and “dislike” buttons, and on the creating/deleting-topic functionalities of the  Create Topic Page.
### Comments Page
![image2](https://user-images.githubusercontent.com/106544788/193930625-c8e59b1f-6e3a-4953-bcea-a33c639ae73e.png)
```javascript
const newComment = { ...req.body, createdBy: req.currentUser.id, commentUser: req.currentUser.userName }
   topic.comments.push(newComment)
```
The function above allows me to take the userName and the ID of the creator to attach them to the new comment.
I made an Axios request using the endpoints that we created in the server to get a topic with a unique ID and to make the user able to create, delete and update related comments.
```javascript
 const deleteComment = async (single, commentId) => {
   try {
     const res = await axios.delete(`http://localhost:4000/comment/${single}/${commentId}`)
     setResStatus(res)
   } catch (error){
     setResStatus(error.response)
   }
 }
```
I created the useState(‘’) resStatus in order to make the comment disappear once deleted and gave to the function setResStatus the parameter (res) to trigger the useEffect and query again all the comments. Then I recycled it to make the error messages appear if an unauthorized or not logged user tries to delete.
```javascript
const updateDocument = async (single, commentId) => {
   const body = { text: updateInput }
   console.log(body, single, commentId)
   try {
     const res = await axios.put(`http://localhost:4000/comment/${single}/${commentId}`, body)
     setResStatus(res)
     setUpdating('')
   } catch (error){
     console.log(error.response)
     setResStatus(error.response)
   }
 }
 ```
1. The user writes his text in the text line of the form,
2. The form input uses OnChange which is activated every time the user presses a key in the text space itself. OnChange in turn calls the function that you put in it, handleUpdateChange which calls the setUpdateInput function which being a useState Hook takes the text that the user gives it and stores it in its associated variable updateInput.
3. At this point we have the elements to compose the body of our request, which we put at the end of the endpoint in axios put.
```javascript
{commentList.map(c => {
             return (
               <li key={c._id}>
                 { updating !== c._id &&
                 <> <p> {c.text} </p>
                   <p> created by: {c.commentUser} </p>
                   <button onClick={() => {
                     if (checkLogin(c)) {
                       deleteComment(data._id, c._id)
                     }
                   }
                   }> DELETE </button>
                   <button value={commentList.indexOf(c)} onClick={() => {
                     if (checkLogin(c)){
                       setUpdating(c._id)
                       setUpdateInput(c.text)
                       setResStatus('')
                     }
                   }} > UPDATE </button>
                 </> }
                 { updating === c._id &&
                 ( <form name ='update-com' onSubmit={(text) => openUpdateForm(text, data._id, c._id)}>
                   <input type="text"
                     name= 'up-com'
                     defaultValue={c.text}
                     placeholder= 'edit comment'
                     onChange = {handleUpdateChange}>
                   </input>
                   <button type="submit">EDIT</button> or <button onClick={ cancelUpdating }>CANCEL</button>
                 </form> )
                 }
               </li>
```
5. And I call the setUpdating ('') function to close the form that was opened. To make this work, I had to add two blocks of functions in JSX starting from mapping the commentList obtained with Api request:
- UseState updating! == from the comment id then show the content of the fragment on the page.
- UseState updating === from the comment id then open the write form.
6. The update button first of all through the checkLogin function checks if  the user is authorized and logged fetching the variable token in the local storage, then the setUpdating functions (ID of the comment) are called respectively to open the form and go to the second block in case you send an empty request.
7. In the form to update, for the message to come out we use defaultValue equal to the comment text. If the user no longer wants to update, the CANCEL button allows him to return to the previous state using the cancel updating function which resets the value of "updating" to its original value, making the updating form disappear.
```javascript
const checkLogin = (comm) => {
  if (!localStorage.getItem('token')){
     setResStatus({ status: 'NoToken' })
     return false
   }
   const currentUserName = localStorage.getItem('userName')
   if (currentUserName !== comm.commentUser){
     setResStatus({ status: 'WrongToken' })
     return false
   }
   console.log(localStorage.getItem('userName'))
   return true
 }
```
8. checkLogin returns false if there is no token, if it finds the username in the localstorage and compares it with the user who wrote the comment and it returns false and wrong token. Otherwise, it returns true and allows the functionalities.
### Create Topic Page
I have stored in the variable topicData the elements of the topicSchema which were important for our page, then I reused the function to check if the user is logged in, followed by the condition to verify the userName of the user.
To create the topic page, I set the condition that allows any registered user to create a new topic giving as only a barrier the presence of a token.
I’ve also implemented a form that includes:
- text input for the title;
- text-area for the description;
- text input in the form that allows the user to copy/paste imageUrls.
```javascript
const createTopic = async (e) => {
   e.preventDefault()
   if (!checkLogin({ topicUser: localStorage.getItem('userName') })){
     return
   }
   //the code below is to check if the url is the right format to be printed
   const body = { ...topicData, createdAt: Date.now() }
   if (body.imageUrl.match(/\.(jpeg|jpg|gif|png)$/) === null && body.imageUrl !== '')  {
     setResStatus('wrong-url')
     return
   }
```
![image1](https://user-images.githubusercontent.com/106544788/193931295-e2850ba7-df96-4fe2-8c47-c108c088af17.png)
I used the axios.post to allow the user to create and upload their own content on the All Topics page.
```javascript
try {
     console.log(body)
     const res = await axios.post('https://readit-project.herokuapp.com/topic', body)
     setResStatus(res)
     navigate('/topic')
   } catch (error){
     console.log(error.response)
     setErrors(error.response.data.message)
   }
   setTopicData({
     topic: '',
     description: '',
     imageUrl: '' })
 }
```
## Challenges
Coordinate three different people on three different editors working together on one project using GitHub.

## Wins
```javascript
// ! if in the request there is a like run the code below
   if (updatedTopic.like){
     if (documentToUpdate.likedBy.indexOf(req.currentUser.id) !== -1 && documentToUpdate.like ){
       documentToUpdate.like -= 1
       documentToUpdate.likedBy.splice(documentToUpdate.likedBy.indexOf(req.currentUser.id), 1)
       await documentToUpdate.save()
       return res
         .status(200)
         .json({ message: 'Liked removed!' }) 
     }
```
While we were testing the app, we found out that the “likes” did not  work properly, because the incorrect user was removed from the likeBy list: this was due to a wrong index being accessed in the array. I fixed the splice() function in order to point to the correct index.
We found out this problem only when testing the like button with more than one user.

## Key Learnings/Takeaways
- Organizing the work ahead when working in a team is crucial and GitHub was our perfect ally because it allowed us to collaborate better.
- We deployed our backend on Heroku, learning the related procedure.

## Bugs
We managed to eliminate all the obvious bugs that appeared during the creation of the project.

## Future Improvements:.
I would like to add more functionalities to the page as:
- galleries;
- community rooms;
- favourites.

