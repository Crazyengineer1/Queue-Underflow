import './App.css'
import Home from './pages/Home'

function App() {
  return (

    <Home />
  );

  //   const CommentDataList = [
  //     {
  //       userId : 'User1',
  //       comment : 'Comment 1',
  //       likes : 0,
  //     },
  //     {
  //       userId : 'User2',
  //       comment : 'Comment 2',
  //       likes : 0,
  //     },
  //     {
  //       userId : 'User3',
  //       comment : 'Comment 3',
  //       likes : 0,
  //     },
  //     {
  //       userId : 'User4',
  //       comment : 'Comment 4',
  //       likes : 0,
  //     }
  //   ];

  //   return (
  //     <>
  //       <div className='wrapper'>
  //         <div className='phone-screen'>
  //           <div className='comment-section'>
  //             {CommentDataList.map((user, index) => {
  //               return (
  //               <div>
  //               <p className='user-id'> {'@'+ user.userId} </p>
  //               <p className='comment'> {user.comment} </p> 
  //               <button className='like'> {user.likes} </button>;
  //               </div>
  //               );
  //               }
  //             )}
  //           </div>

  //           {/* <div>
  //             <p> Comment 2 </p> 
  //             <button></button>
  //           </div>

  //           <div>
  //             <p> Comment 3 </p>
  //             <button></button> 
  //           </div>

  //           <div>
  //             <p> Comment 4 </p> 
  //             <button></button>
  //           </div> */}

  //           {/* ChatGPT
  //           {CommentDataList.map((user, index) => (
  //             <div className="comment-item" key={index}>

  //               <div className="comment-left">
  //                 <p className="user-id">{user.userId}</p>
  //                 <p className="comment-text">{user.comment}</p>
  //               </div>

  //               <div className="comment-right">
  //                 <button className="like-btn">❤️</button>
  //                 <span className="like-count">{user.likes}</span>
  //               </div>

  //             </div>
  //           ))}
  //            */}
  //         </div>
  //       </div>
  //     </>
  //   )
}

export default App

