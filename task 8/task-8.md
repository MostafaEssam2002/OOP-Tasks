# OOP Task 8: Social Media Platform

## Objective
Build a Social Media Platform to practice advanced OOP concepts including composition, aggregation, many-to-many relationships, and complex data structures.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language.

**Code Examples:** The code examples below use C#-like syntax for illustration. Adapt them to your language's syntax (e.g., use `print()` instead of `Console.WriteLine()`, adjust variable declarations, use language-specific date/time handling, etc.).

## Task Description
Create a social media system that manages users, posts, comments, likes, and friendships. The system should demonstrate:
- Complex object relationships
- Many-to-many associations
- Event-driven updates
- Data privacy and access control
- Working with timestamps and chronological ordering

## Requirements

### 1. User Class
Create a `User` class:
- **Properties/Attributes:**
  - `userId` (string)
  - `username` (string)
  - `email` (string)
  - `displayName` (string)
  - `bio` (string)
  - `profilePicture` (string): URL or path
  - `dateJoined` (Date/DateTime)
  - `friends` (List/Array of User objects)
  - `posts` (List/Array of Post objects)
  - `isPrivate` (boolean): Private account setting

- **Methods:**
  - Constructor
  - `createPost(content)`: Creates a new post
  - `addFriend(user)`: Adds mutual friendship
  - `removeFriend(user)`: Removes friendship
  - `isFriendsWith(user)`: Checks friendship status
  - `getFriendCount()`: Returns number of friends
  - `getPostCount()`: Returns number of posts
  - `canView(viewer)`: Checks if viewer can see this user's content
  - `getUserProfile()`: Returns formatted profile information

### 2. Post Class
Create a `Post` class:
- **Properties/Attributes:**
  - `postId` (string)
  - `author` (User)
  - `content` (string)
  - `timestamp` (Date/DateTime)
  - `likes` (List/Array of User objects): Users who liked the post
  - `comments` (List/Array of Comment objects)
  - `isEdited` (boolean)
  - `lastEditTime` (Date/DateTime, optional)

- **Methods:**
  - Constructor
  - `addLike(user)`: User likes the post
  - `removeLike(user)`: User unlikes the post
  - `getLikeCount()`: Returns number of likes
  - `hasLiked(user)`: Checks if user has liked
  - `addComment(comment)`: Adds a comment
  - `editPost(newContent)`: Edits post content
  - `deleteComment(commentId)`: Removes a comment
  - `getPostSummary()`: Returns formatted post information

### 3. Comment Class
Create a `Comment` class:
- **Properties/Attributes:**
  - `commentId` (string)
  - `author` (User)
  - `content` (string)
  - `timestamp` (Date/DateTime)
  - `likes` (List/Array of User objects)
  - `parentPost` (Post)

- **Methods:**
  - Constructor
  - `addLike(user)`: User likes comment
  - `removeLike(user)`: User unlikes comment
  - `getLikeCount()`: Returns number of likes
  - `getCommentInfo()`: Returns formatted comment

### 4. Timeline Class
Create a `Timeline` class for displaying posts:
- **Properties/Attributes:**
  - `owner` (User)
  - `posts` (List/Array of Post objects)

- **Methods:**
  - Constructor
  - `getTimelinePosts(viewer)`: Returns posts visible to viewer
  - `getNewsFeed(count)`: Returns recent posts from friends
  - `getPostsByDate(startDate, endDate)`: Filtered posts
  - `searchPosts(keyword)`: Search in post content

### 5. Notification Class
Create a `Notification` class:
- **Properties/Attributes:**
  - `notificationId` (string)
  - `recipient` (User)
  - `type` (string): "Like", "Comment", "FriendRequest", "Mention"
  - `relatedUser` (User): User who triggered the notification
  - `relatedPost` (Post): Post related to notification (if applicable)
  - `message` (string)
  - `timestamp` (Date/DateTime)
  - `isRead` (boolean)

- **Methods:**
  - Constructor
  - `markAsRead()`: Marks notification as read
  - `getNotificationText()`: Returns formatted notification message

### 6. SocialMediaPlatform Class
Create a `SocialMediaPlatform` class to manage everything:
- **Properties/Attributes:**
  - `platformName` (string)
  - `users` (Map/Dictionary/Associative Array): By userId
  - `allPosts` (List/Array of Post objects)
  - `notifications` (Map/Dictionary/Associative Array): By userId

- **Methods:**
  - Constructor
  - `registerUser(user)`: Adds user to platform
  - `findUser(username)`: Finds user by username
  - `getUserById(userId)`: Gets user by ID
  - `createFriendship(user1, user2)`: Creates mutual friendship
  - `removeFriendship(user1, user2)`: Removes friendship
  - `getTrendingPosts(count)`: Returns posts with most engagement
  - `getMutualFriends(user1, user2)`: Returns common friends
  - `sendNotification(notification)`: Adds notification
  - `getUnreadNotifications(user)`: Returns unread notifications
  - `searchUsers(query)`: Search users by name or username
  - `getPlatformStatistics()`: Returns usage statistics

### 7. FriendSuggestion Class
Create a `FriendSuggestion` class:
- **Properties/Attributes:**
  - `suggestedUser` (User)
  - `mutualFriends` (List/Array of User objects)
  - `score` (integer): Relevance score

- **Methods:**
  - Constructor
  - `calculateScore()`: Calculates suggestion relevance
  - `getSuggestionInfo()`: Returns formatted suggestion

## Example Usage

```
// Create platform
platform = new SocialMediaPlatform("ConnectHub")

// Create users
alice = new User("U001", "alice_j", "alice@email.com", "Alice Johnson")
bob = new User("U002", "bob_smith", "bob@email.com", "Bob Smith")
charlie = new User("U003", "charlie_b", "charlie@email.com", "Charlie Brown")
diana = new User("U004", "diana_w", "diana@email.com", "Diana Wilson")

// Register users
platform.registerUser(alice)
platform.registerUser(bob)
platform.registerUser(charlie)
platform.registerUser(diana)

// Create friendships
platform.createFriendship(alice, bob)
platform.createFriendship(alice, charlie)
platform.createFriendship(bob, charlie)

print("Alice has " + alice.getFriendCount() + " friends")
print("Mutual friends between Alice and Bob: " + platform.getMutualFriends(alice, bob).count)

// Alice creates posts
post1 = alice.createPost("Hello everyone! Excited to be here!")
post2 = alice.createPost("Beautiful day for a hike in the mountains!")

// Friends interact with posts
post1.addLike(bob)
post1.addLike(charlie)

comment1 = new Comment("C001", bob, "Welcome, Alice!", now, post1)
post1.addComment(comment1)

comment2 = new Comment("C002", charlie, "Great to have you here!", now, post1)
post1.addComment(comment2)

// Display post
print("\n" + post1.getPostSummary())

// Send notifications
notification1 = new Notification(
    "N001", alice, "Like", bob, post1,
    bob.displayName + " liked your post", now
)
platform.sendNotification(notification1)

notification2 = new Notification(
    "N002", alice, "Comment", bob, post1,
    bob.displayName + " commented on your post", now
)
platform.sendNotification(notification2)

// Check notifications
var unreadNotifications = platform.GetUnreadNotifications(alice);
Console.WriteLine($"\n{alice.DisplayName} has {unreadNotifications.Count} unread notifications:");
foreach (var notif in unreadNotifications)
{
    Console.WriteLine($"- {notif.GetNotificationText()}");
    notif.MarkAsRead();
}

// Bob creates and shares a post
Post post3 = bob.CreatePost("Just finished a great book! Highly recommend.");
post3.AddLike(alice);
post3.AddLike(charlie);

Comment comment3 = new Comment("C003", alice, "What book? I'm looking for recommendations!", DateTime.Now, post3);
post3.AddComment(comment3);

// Get timeline
Timeline aliceTimeline = new Timeline(alice);
var newsFeed = aliceTimeline.GetNewsFeed(10);
Console.WriteLine($"\n=== {alice.DisplayName}'s News Feed ===");
foreach (var post in newsFeed)
{
    Console.WriteLine($"\n{post.Author.DisplayName} - {post.Timestamp:g}");
    Console.WriteLine(post.Content);
    Console.WriteLine($"Likes: {post.GetLikeCount()} | Comments: {post.Comments.Count}");
}

// Get trending posts
var trending = platform.GetTrendingPosts(3);
Console.WriteLine("\n=== Trending Posts ===");
for (int i = 0; i < trending.Count; i++)
{
    var post = trending[i];
    int engagement = post.GetLikeCount() + post.Comments.Count;
    Console.WriteLine($"{i + 1}. {post.Author.Username}: {engagement} engagements");
}

// Platform statistics
platform.GetPlatformStatistics();
```

## Expected Output Example

```
Alice has 2 friends
Mutual friends between Alice and Bob: 1

=== Post ===
Author: Alice Johnson (@alice_j)
Posted: 12/06/2025 3:45 PM
Content: Hello everyone! Excited to be here!

Likes: 2 (bob_smith, charlie_b)
Comments: 2
  - Bob Smith: Welcome, Alice!
  - Charlie Brown: Great to have you here!

Alice Johnson has 2 unread notifications:
- Bob Smith liked your post (12/06/2025 3:46 PM)
- Bob Smith commented on your post (12/06/2025 3:46 PM)

=== Alice Johnson's News Feed ===

Bob Smith - 12/06/2025 3:50 PM
Just finished a great book! Highly recommend.
Likes: 2 | Comments: 1

Alice Johnson - 12/06/2025 3:48 PM
Beautiful day for a hike in the mountains!
Likes: 0 | Comments: 0

Alice Johnson - 12/06/2025 3:45 PM
Hello everyone! Excited to be here! 🎉
Likes: 2 | Comments: 2

=== Trending Posts ===
1. alice_j: 4 engagements
2. bob_smith: 3 engagements
3. alice_j: 0 engagements

=== ConnectHub Platform Statistics ===
Total Users: 4
Total Posts: 3
Total Comments: 3
Total Friendships: 3
Average Friends per User: 1.5
Most Active User: Alice Johnson (2 posts)
Total Engagement: 7 (likes + comments)
```

## Bonus Challenges (Optional)
1. Implement hashtags and trending topics
2. Add photo/video posts with media storage
3. Create user stories (temporary posts)
4. Implement direct messaging between users
5. Add blocking and reporting functionality
6. Create user groups and pages
7. Implement post sharing/reposting
8. Add emoji reactions (beyond just like)
9. Create activity feed (recent activities of friends)
10. Implement privacy settings (who can see posts, send friend requests)
11. Add user verification/badges
12. Create recommendation algorithm for friend suggestions

## Learning Goals
- Managing complex object relationships (one-to-many, many-to-many)
- Working with bidirectional associations
- Implementing access control and privacy
- Chronological data sorting
- Aggregation vs composition
- Event handling and notifications
- Working with dictionary and list collections
- Modeling real-world social interactions

## Getting Started
Create a file in your chosen language. Start with the basic User and Post classes, then add Comments, then implement the platform management and notifications.

Good luck!
