# Models folder
Each model basically creates the structure for which the date is made! Usernames are treated as strings, each post requires an ID, and each comment has a recorded date and time, among others

- **db**: the commands used by the controllers to basically add, create, update, and delete items in the site—they are all treated as individual information!
- **UserModel**: user info has to go somewhere, right? the structure for the storage of that information is handled by this model!
- **PostModel**: a comprehensive structure on how information about a single post—past, present, and future—should be stored in a database
- **CommentModel**: the structure for the comments you and other users made!
- **VotePostModel**: includes the structure of the history of posts upvoted or downvoted
- **VoteCommentModel**: includes the structure of the history of the history of comments upvoted or downvoted
