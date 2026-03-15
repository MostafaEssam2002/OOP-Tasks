enum NotificationType {
    Like="Like",
    Comment="Comment",
    FriendRequest="FriendRequest",
    Mention="Mention"
}
class User {
    private userId :string;
    private username :string;
    private email :string;
    private displayName :string;
    private bio :string;
    private profilePicture :string;
    private dateJoined :Date;
    private friends : User[]=[];
    private posts : Post[]=[];
    private isPrivate :boolean=false;
    constructor(userId:string,username:string, email:string, displayName :string){
        this.userId=userId;
        this.username=username;
        this.email=email;
        this.displayName=displayName;
        this.bio=""
        this.profilePicture=""
        this.dateJoined=new Date()
    }
    get UserName():string{
        return this.username
    }
    getDisplayName(): string {
        return this.displayName;
    }
    get UserFriends():User[]{
        return this.friends;
    }
    get UserID():string{
        return this.userId;
    }
    get Posts():Post[]{return this.posts}
    set Bio(bio:string){
        this.bio = bio
    }
    set ProfilePicture(profilePicture:string){
        this.profilePicture = profilePicture
    }
    set DateJoined(dateJoined:Date){
        this.dateJoined = dateJoined
    }
    createPost(content: string, platform?: SocialMediaPlatform): Post {
        const post = new Post(this, content, new Date());
        this.posts.push(post);

        // إذا تم تمرير المنصة، أضف البوست لقائمة كل البوستات
        if (platform) {
            platform.addPost(post);
        }

        return post;
    }
    get Friends():User[]{
        return this.friends
    }
    addFriend(user:User): void{
        if(!this.friends.includes(user)){
            this.friends.push(user);
        }
    }
    // Removes friendship
    removeFriend(user:User): void{
        const index = this.friends.indexOf(user)
        if(index===-1){
            console.log("user not found ")
            return
        }
        this.friends.splice(index,1)
    }
    // Checks friendship status
    isFriendsWith(user:User):boolean{
        return  this.friends.includes(user)
    }
    // Returns number of friends
    getFriendCount():number{
        return this.friends.length
    }
    // Returns number of posts
    getPostCount():number{
        return this.posts.length
    }
    // Checks if viewer can see this user's content
    canView(viewer:User):boolean{
        if(!this.isPrivate) return true
        return this.isFriendsWith(viewer)
    }
    // Returns formatted profile information
    getUserProfile():string {
        return `
            ===== User Profile =====
            Name: ${this.displayName}
            Username: @${this.username}
            Email: ${this.email}
            Bio: ${this.bio || "No bio"}
            Friends: ${this.getFriendCount()}
            Posts: ${this.getPostCount()}
            Private Account: ${this.isPrivate ? "Yes" : "No"}
            Joined: ${this.dateJoined ? this.dateJoined.toDateString() : "Unknown"}
            ========================
            `
    }
}

class Post{
    private postId :string;
    private author :User;
    private content :string;
    private timestamp :Date;
    private likes : User[]=[];
    private comments : PostComment []=[];
    private isEdited :boolean=false;
    private lastEditTime :Date=new Date();
    constructor(author:User,content:string,timestamp:Date){
        this.postId=crypto.randomUUID()
        this.author=author
        this.content=content
        this.timestamp=timestamp
    }
    get Content():string{
        return this.content
    }
    get UserID():string{
        return this.author.UserID
    }
    get commentsLength():number{
        return this.comments.length
    }
    // get likesLength():number{
    //     return this.likes.length
    // }
    get TimeStamp():Date{
        return this.timestamp
    }
    // User likes the post
    addLike(user:User):void{
        if(this.likes.includes(user)){
            console.log("User already liked this post")
            return
        }
        this.likes.push(user)
    }
    // User unlikes the post
    removeLike(user:User):void{
        const index:number = this.likes.findIndex(usr=>usr===user)
        if(index===-1){
            console.log("user not found")
            return ;
        }
        this.likes.splice(index,1)
    }
    // Returns number of likes
    getLikeCount():number{
        return this.likes.length
    }
    hasLiked(user:User):boolean {
        return this.likes.includes(user)
    }
    addComment(comment:PostComment ):void {
        this.comments.push(comment)
    }
    // Edits post content
    editPost(newContent:string){
        this.isEdited = true;                  // علامة على أن البوست تم تعديله
        this.lastEditTime=new Date()
        this.content=newContent;
    }
    // Removes a comment
    deleteComment(commentId:string):void{
        const index:number =this.comments.findIndex(comment=>comment.ID===commentId) 
        if(index===-1){
            console.log("no comment found ")
            return 
        }
        this.comments.splice(index,1)
    }
    // Returns formatted post information
    // getPostSummary(){
    //     // array of users
    //     const names:string[] = []
    //     const comments:string[] = []
    //     for(let user of this.likes){
    //         names.push(user.getDisplayName())
    //     }
    //     for(let comment of this.comments){
    //         comments.push(`${comment.Author.UserName}: ${comment.Content} \n`)
    //     }
    //     return `
    //         ======= Post Summary =======
    //         Author: ${this.author.getDisplayName()} (@${this.author.UserName})
    //         Posted: Posted: ${this.timestamp.toLocaleString("en-US", {day: "2-digit",month: "2-digit",year: "numeric",hour: "numeric",minute: "2-digit",hour12: true})}
    //         Content: ${this.content}
    //         Likes: ${this.getLikeCount()} (${[...names]})
    //         Comments: ${this.comments.length}
    //             ${[...comments]}
    //         `;
    // }
    getPostSummary() {
    // array of user display names who liked the post
    const likeNames: string[] = this.likes.map(user => user.getDisplayName());

    // array of comment strings
    const commentTexts: string[] = this.comments.map(
        comment => `${comment.Author.getDisplayName()}: ${comment.Content}`
    );

    return `
        ======= Post Summary =======
        Author: ${this.author.getDisplayName()} (@${this.author.UserName})
        Posted: ${this.timestamp.toLocaleString("en-US", {day: "2-digit",month: "2-digit",year: "numeric",hour: "numeric",minute: "2-digit",hour12: true})}${this.isEdited ? ` (Edited: ${this.lastEditTime.toLocaleString()})` : ""}
        Content: ${this.content}
        Likes: ${this.getLikeCount()} (${likeNames.join(", ")})
        Comments: ${this.comments.length}
        ${commentTexts.join("\n  ")}
        ============================
        `;
        }
}

class PostComment  {
    private commentId :string;
    private author :User;
    private content :string;
    private timestamp :Date;
    private likes :User[]=[];
    private parentPost :Post;
    constructor (commentId :string, author :User,content :string, timestamp :Date, parentPost :Post){
        this.commentId=commentId;
        this.author=author;
        this.content=content;
        this.timestamp=timestamp;
        this.parentPost=parentPost;
    }
    get Author():User{
        return this.author
    }
    get ID():string{
        return this.commentId;
    }
    get Content():string{
        return this.content
    }
    // User likes comment
    addLike(user: User): void {
        if (!this.likes.includes(user)) {
            this.likes.push(user);
        } else {
            console.log("User already liked this");
        }
    }
    // User unlikes comment
    removeLike(user:User):void{
        const index:number = this.likes.findIndex(usr=>usr===user)
        if(index===-1){
            console.log("user not found")
            return ;
        }
        this.likes.splice(index,1)
    }
    // Returns number of likes
    getLikeCount():number{
        return this.likes.length
    }
    getCommentInfo():string {
        return `
            ===== Comment Info =====
            Comment ID: ${this.commentId}
            Author: ${this.author.getDisplayName()}
            Content: ${this.content}
            Likes: ${this.getLikeCount()}
            Posted At: ${this.timestamp.toLocaleString()}
            ========================
        `;
    }
}

class Timeline {
    private owner :User;
    constructor(user:User){
        this.owner=user;
    }
    // Returns posts visible to viewer
    getTimelinePosts(viewer:User):string[] {
        if(!this.owner.canView(viewer)){
            console.log("You are not allowed to view this timeline");
            return [];
        }
        return this.owner.Posts.map(post=>post.getPostSummary())
    }
    // : Returns recent posts from friends
    getNewsFeed(count:number){
        const friends:User[] =  this.owner.Friends
        let feed:Post[] =[] 
        for(const friend of friends){
            feed.push(... friend.Posts)
        }
        feed.sort((a:Post,b:Post)=>b.TimeStamp.getTime()-a.TimeStamp.getTime())
        return feed.slice(0,count).map(post=>post.getPostSummary())
    }
    // getPostsByDate(startDate, endDate): Filtered posts
    getPostsByDate(startDate:Date, endDate:Date){
        return this.owner.Posts.filter(post=>post.TimeStamp.getTime()>startDate.getTime()&&post.TimeStamp.getTime()<endDate.getTime())
    }
    // Search in post content
    searchPosts(keyword:string){
        return this.owner.Posts.filter(post=>post.Content.toLowerCase().includes(keyword.toLowerCase())).map(post=>post.getPostSummary())
    }
}

class Notifications {
    notificationId:string;
    recipient:User;
    type:NotificationType;
    relatedUser:User;
    relatedPost:Post;
    message:string;
    timestamp:Date;
    isRead:boolean=false;
    // Notification("N001", alice, "Like", bob, post1,bob.displayName + " liked your post", now)
    constructor(notificationId:string,recipient:User,type:NotificationType,relatedUser:User,relatedPost:Post,message:string,timestamp:Date){
        this.notificationId=notificationId
        this.recipient=recipient
        this.type=type
        this.relatedUser=relatedUser
        this.relatedPost=relatedPost
        this.message=message
        this.timestamp=timestamp
    }
    get IsRead():boolean{
        return this.isRead;
    }
    get Recipient():User{
        return this.recipient
    }
    markAsRead():void {
        this.isRead=true;
    }
    // Returns formatted notification message
    getNotificationText(): string {
        switch(this.type){
            case NotificationType.Like:
                return `${this.relatedUser.getDisplayName()} liked your post (${this.timestamp.toLocaleString("en-US", {day: "2-digit",month: "2-digit",year: "numeric",hour: "numeric",minute: "2-digit",hour12: true})})`;
            case NotificationType.Comment:
                return `${this.relatedUser.getDisplayName()} commented on your post (${this.timestamp.toLocaleString("en-US", {day: "2-digit",month: "2-digit",year: "numeric",hour: "numeric",minute: "2-digit",hour12: true})})`;
            case NotificationType.FriendRequest:
                return `${this.relatedUser.getDisplayName()} send friendRequest (${this.timestamp.toLocaleString("en-US", {day: "2-digit",month: "2-digit",year: "numeric",hour: "numeric",minute: "2-digit",hour12: true})})`;
            case NotificationType.Mention:
                return `${this.relatedUser.getDisplayName()} Mentioned your post (${this.timestamp.toLocaleString("en-US", {day: "2-digit",month: "2-digit",year: "numeric",hour: "numeric",minute: "2-digit",hour12: true})})`;
            default:
                return `${this.message} (${this.timestamp.toLocaleString("en-US", {day: "2-digit",month: "2-digit",year: "numeric",hour: "numeric",minute: "2-digit",hour12: true})})`;
        }
    }
}
class SocialMediaPlatform{
    private platformName:string
    private users:Map<string,User>=new Map()
    private allPosts:Post []=[]
    private notifications:Map<string,Notifications[]>=new Map();
    constructor(platformName:string){
        this.platformName=platformName;
    }
    addPost(post: Post) {
        this.allPosts.push(post);
    }
    // Adds user to platform
    registerUser(user:User):void{
        this.users.set(user.UserID,user)
    }
    // Finds user by username
    findUser(username:string):User|undefined{
        for(let user of this.users.values()){
            if(user.UserName===username){
                return user;
            }
        }
        return undefined
    }
    // Gets user by ID
    getUserById(userId:string):User|undefined{
        return this.users.get(userId)
    }
    // Creates mutual friendship
    createFriendship(user1:User, user2:User):void{
        if(!user1.isFriendsWith(user2)){
            user1.addFriend(user2)
        }
        if(!user2.isFriendsWith(user1)){
            user2.addFriend(user1)
        }
    }
    // Removes friendship
    removeFriendship(user1:User, user2:User):void{
        user1.removeFriend(user2)
        user2.removeFriend(user1)
    }
    // Returns posts with most engagement
    getTrendingPosts(count:number):Post[]{
        const posts = [...this.allPosts]
        posts.sort((a,b)=>{
            const engagementA = a.getLikeCount() + a.commentsLength
            const engagementB = b.getLikeCount() + b.commentsLength
            return engagementB - engagementA
        })
        return posts.slice(0,count)
    }
    getMutualFriends(user1:User, user2:User):User[]{
        const user2FriendsSet =new Set(user2.UserFriends);
        return user1.UserFriends.filter(user=>user2FriendsSet.has(user))
    }
    // Adds notification
    sendNotification(notification:Notifications){
        const userID:string=notification.Recipient.UserID
        if(!this.notifications.has(userID)){
            this.notifications.set(userID, []);
        }
        this.notifications.get(userID)!.push(notification)
    }
    // Returns unread notifications
    getUnreadNotifications(user:User):Notifications[]{
        if(!this.notifications.has(user.UserID)){
            return []
        }
        const notifications:Notifications[] = this.notifications.get(user.UserID)!.filter(notification=>notification.IsRead===false)
        return notifications
    }
    // Search users by name or username
    searchUsers(query:string):User[]{
        return [... this.users.values()].filter(user=>user.UserName.toLowerCase().includes(query.toLowerCase())||user.getDisplayName().toLowerCase().includes(query.toLowerCase()))
    }
    // Returns usage statistics
    getPlatformStatistics():string{
        let totalComments = 0;
        let totalLikes = 0;
        let totalFriendships = 0;
        for(let post of this.allPosts){
            totalComments+=post.commentsLength
            totalLikes+=post.getLikeCount()
        }
        for(let user of this.users.values()){
            totalFriendships+=user.Friends.length
        }
        const usersArray = [...this.users.values()];
        const MostActiveUser = usersArray.length > 0 ? usersArray.reduce((max, user) => user.getPostCount() > max.getPostCount() ? user : max) : null;
        const mostActiveUserText = MostActiveUser? `${MostActiveUser.getDisplayName()} (${MostActiveUser.getPostCount()} posts)`: "No users yet";
        const avgFriends = this.users.size === 0 ? 0 : (totalFriendships / 2) / this.users.size;
        return `
        === ${this.platformName} Platform Statistics ===
        Total Users: ${this.users.size}
        Total Posts: ${this.allPosts.length}
        Total Comments: ${totalComments}
        Total Friendships: ${totalFriendships}
        Average Friends per User: ${avgFriends}
        Most Active User: ${mostActiveUserText}
        Total Engagement: ${totalLikes+totalComments} (likes + comments)`
    }
}
class FriendSuggestion{
    suggestedUser :User;
    mutualFriends : User []=[];
    score :number;
    constructor(suggestedUser :User, mutualFriends:User[]){
        this.suggestedUser = suggestedUser;
        this.mutualFriends = mutualFriends;
        this.score = 0;
    }
    // Calculates suggestion relevance
    calculateScore():number {
        let score = 0;
        // mutual friends weight
        score += this.mutualFriends.length * 10;
        // bonus if mutual friends > 2
        if (this.mutualFriends.length >= 2) {
            score += 5;
        }
        this.score = score;
        return this.score;
    }
    getSuggestionInfo(): string{
        const names = this.mutualFriends.map(user=>user.getDisplayName())
        
        return  `
            === Friend Suggestion ===
            Suggested User: ${this.suggestedUser.getDisplayName()}
            Mutual Friends: ${this.mutualFriends.length}
            Score: ${this.score} (${names.join(", ")})
            =========================
            `;
    }
}

// Create platform
const platform = new SocialMediaPlatform("ConnectHub");

// Create users
const alice = new User("U001", "alice_j", "alice@email.com", "Alice Johnson");
const bob = new User("U002", "bob_smith", "bob@email.com", "Bob Smith");
const charlie = new User("U003", "charlie_b", "charlie@email.com", "Charlie Brown");
const diana = new User("U004", "diana_w", "diana@email.com", "Diana Wilson");

// Register users
platform.registerUser(alice);
platform.registerUser(bob);
platform.registerUser(charlie);
platform.registerUser(diana);

// Create friendships
platform.createFriendship(alice, bob);
platform.createFriendship(alice, charlie);
platform.createFriendship(bob, charlie);

console.log(`Alice has ${alice.getFriendCount()} friends`);
console.log(`Mutual friends between Alice and Bob: ${platform.getMutualFriends(alice, bob).length}`);

// Alice creates posts
const post1 = alice.createPost("Hello everyone!", platform);
const post2 = alice.createPost("Beautiful day!", platform);
alice.createPost("Hello everyone! Excited to be here!"); // optional if createPost already adds to posts
alice.createPost("Beautiful day for a hike in the mountains!");

// Friends interact with posts
post1.addLike(bob);
post1.addLike(charlie);

const comment1 = new PostComment("C001", bob, "Welcome, Alice!", new Date(), post1);
post1.addComment(comment1);

const comment2 = new PostComment("C002", charlie, "Great to have you here!", new Date(), post1);
post1.addComment(comment2);

// Display post summary
console.log("\n" + post1.getPostSummary());

// Send notifications
const notification1 = new Notifications(
    "N001",
    alice,
    NotificationType.Like,
    bob,
    post1,
    `${bob.getDisplayName()} liked your post`,
    new Date()
);
platform.sendNotification(notification1);

const notification2 = new Notifications(
    "N002",
    alice,
    NotificationType.Comment,
    bob,
    post1,
    `${bob.getDisplayName()} commented on your post`,
    new Date()
);
platform.sendNotification(notification2);

// Check unread notifications
const unreadNotifications = platform.getUnreadNotifications(alice);
console.log(`\n${alice.getDisplayName()} has ${unreadNotifications.length} unread notifications:`);
for (const notif of unreadNotifications) {
    console.log(`- ${notif.getNotificationText()}`);
    notif.markAsRead();
}

// Bob creates and shares a post
const post3 = bob.createPost("Just finished a great book! Highly recommend.",platform);
post3.addLike(alice);
post3.addLike(charlie);

const comment3 = new PostComment("C003", alice, "What book? I'm looking for recommendations!", new Date(), post3);
post3.addComment(comment3);

// Get timeline for Alice
const aliceTimeline = new Timeline(alice);
const newsFeed = aliceTimeline.getNewsFeed(10);
console.log(`\n=== ${alice.getDisplayName()}'s News Feed ===`);
for (const post of newsFeed) {
    console.log(post); // post is a string from getPostSummary()
}

// Get trending posts
const trending = platform.getTrendingPosts(3);
console.log("\n=== Trending Posts ===");
trending.forEach((post, i) => {
    const engagement = post.getLikeCount() + post.commentsLength;
    console.log(`${i + 1}. ${post.UserID}: ${engagement} engagements`);
});

// Platform statistics
console.log(platform.getPlatformStatistics());
const mutual = platform.getMutualFriends(alice, diana)

const suggestion = new FriendSuggestion(diana, mutual)

suggestion.calculateScore()

console.log(suggestion.getSuggestionInfo())