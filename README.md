# Vinyl-Makert-Place

<h1>discoid-002</h1>
<br>
<h2>By Einar Skreslett and Ivan Craig</h2>
<hr>


<h2>Description</h2>

In this project I wanted to create and deploy an e-commerce website that would allow users to sign-up and view their profiles as well as list items for sale. The name for the website is Discoid which stands for a round disk and our website specialises on the selling and buying of vinyl records. 

<hr>
<h2>Deployment link</h2>

Find our website here <a href="https://discoidappsei66.herokuapp.com/auth/signin"> Click here<a> 
<hr>

<h2>Timeframe & Working Team (Solo/Pair/Group)</h2>

This was a paired project in which I was working alongside Einar Skreslett, this was my first experience working as a pair and I believe it was a great success, the Project lasted 5 days in total.



<h3>Technologies Used</h3>
<ul>
<li>HTML  </li>
<li>CSS </li>
<li>JavaScript   </li>
<li>multer   </li>
<li>Git   </li>
<li>GitHub   </li>
<li>Express   </li>
<li>MongoDB   </li>
<li>Bootstrap   </li>
<li>Heroku   </li>
</ul>


<hr>

<h3>Brief</h3>

Design, build and deploy an active and functional website which needs to fulfil these requirements 
<ul>
<li>Build a web application from scratch must be your own work.</li>
<li>Use Express framework to build your application</li>
<li>Deploy on Heroku so application is live on the web</li>
<li>User must have a profile</li>
<li>User must be able to edit their profile</li>
<li>User must be able to change password</li>
<li>User must be able to sign up</li>
<li>User must be able to sign in</li>
<li>User must be able to sign out</li>
<li>User must be able to create a resource</li>
<li>User must be able to edit a resource</li>
<li>User must be able to view all resources they created</li>
<li>User must be able to view a single resource they created</li>
<li>User must not be able to edit or delete other users' resources</li>
</ul>
<hr>
<h3>Planning</h3>

During our first meeting we had decided on a path we wanted to go down and from then we sketched some ruff wire frames and our ERD (Entity Relationship Diagram)that lays out our user paths.   
The ERD shows the relationship that the database on mongoDB will have, from creating an account to listing an item for sale. The one to many relationship is the foundation of most e-commerce as one seller can have many items for sale. 
We also mapped out our plans on Trello adding cards for each aspect of the project allowing us to track our progress.

At this point we also created a Trello Board in order to assign work and keep a track of what jobs we were taking on, Einar was keen to tackle implementing the APIs while I started work on the views. We used Slack for written communication and Zoom for vocal discussions.

<img  src="/photos/9.png" width="100%"/>
<br>

<br>
<img  src="/photos/8.png" width="100%"/>
<img  src="/photos/7.png" width="100%"/>
<img  src="/photos/6.png" width="100%"/>
<hr>
<h2>Build/Code Process</h2> 


<h3>/layout.ejs</h3>

This is our layout.ejs master page. This is the starting page for anyone to enter the site. The navigation allows users to sign-in, sign-up or view the product. I also included a div called welcome that projects a welcome message from MongoDB showing their name and profile pic. The if statement verifies whether the user is logged in or not and filters what they can access and see, in this case if the user is logged in they have access to a Logout and My Account pages whereas if the user is not logged in they can only see Sign In and Sign Up options. 
<img  src="/photos/5.png" width="100%">

<h3>views/index.ejs</h3>

Index page renders all the items available to purchase, for this I turned to Bootstrap, by defining the class as “row row-col 3” it will form rows of 3 that will be automatically rendered from the database. The forEach loop I used to render the bootstrap cards populates them with all the for-sale albums stored in MongoDB, providing an image, title, artist and asking price which is all pulled from the record schema. After one card is completed the loop will repeat until and the cards in the database have been rendered.

<img  src="/photos/4.png" width="100%">

<h3>routes/records.js</h3>

This routes file provides the path for record APIs; it is also where I required Multer to allow the adding of album artwork. As seen router.post(“/records/sell" ,  upload.single-(‘image’), recordsCntrl.record_create_post);

I also added authorization checks to all the routes apart from the records/index and records.details as me and Einar decided that if a user is not logged in they still should have the ability to view all the products for sale but not have the access required to buy. For this I require helper/isLoggedIn.js which verifies if the user is not logged in then redirects them to the home page if not next() which renders the desired page.


<img  src="/photos/3.png" width="100%"> 

<h3>controller/records.js</h3>

In the controller is where we code the functionality of the website as well as implementing the APIs. In this image we can see the application of the Spotify API that allows the website user to search Spotify's database and return them the artist's name, album and year of release. This provides a more fluid user experience. We also set the maximum limit of song recommendation to 20, as seen after the req.body.seach request. 

<img  src="/photos/2.png" width="100%">

We used Coolors.co to select our colour scheme in such a way that we can keep a consistent theme throughout our application. Using ProCreate and PhotoShop to design and build the UX of the site allowed me to blend a modern interface with a retro theme. Bootstrap allowed me to fully customise the record cards and kept the index clear and simple to the user. I also used JQuery to select HTML elements in the <nav> that allowed me to animate their properties making them interactive and responsive.

<h3>Challenges</h3>
 

The main challenge I came across during the project was providing the user with an index of all products that users have listed for sale. Within the index.ejs document I had to use a forEach loop to go through the mongoDB database then retrieve all the objects stored within then display them in rows and columns. The whole process of adding and displaying images I had to tackle in this code path, using Multer and Bootstrap I discovered was the quickest way to tackle this challenge. Another challenging part of this project was comets terms with GitHub, as this was my first group project it did take a few tries to go through the commit, pull upstream and merge processes. But at the end we had the whole process down, the main learning point I took away from GitHub was to be in clear communication with our team members and try your best not to work in the same files at the same time to avoid merge conflicts. 


<img  src="/photos/1.png" width="100%">
<img  src="/photos/editgit.png" width="100%">


<h2>Wins</h2>

Overall, I believe this project was a great success, as a team we worked well and went above and beyond the brief requirements, this was down to strong planning, good exaction and very late nights. But at the end of the project we both could step back and be proud of what we have created. For example, we also created a Cart basket, this takes the products id and stores it in one's cart in their account page. The visual design of the project was also a success and we stuck to our initial concept. 

<h2>Key Learnings/Takeaways</h2>




This was my first project using an NoSQL database in MongoDB, the processes of updating and adding to the database through the controller I found the most satisfying, however, what I took away from the project was how important it is to communicate with your partner as-well as ask for help, I could not count the amount of times a pair of fresh eyes can save you.



<h2>Bugs</h2>

The main bug I will be solving in the future is having the images saved in the database; it is seen after a few days they no longer show on the deployed website.   


<h2>Future Improvements</h2>

The one task we put on the possible and unlikely to achieve tile on our Trello Board was creating a payment section for the site. This would really bring together the whole user functionality of the site, going from making an account, login into the account, listing an item for sale, then being able to buy that item and input your banking details, while we knew that it was unlikely we would achieve this in such a short timeframe I do believe that it is the one thing still missing.  
