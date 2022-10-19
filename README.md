# Vinyl-Makert-Place

<h1>discoid-002</h1>
<h2>By Einar Skreslett and Ivan Craig
 <h3>Start of the Planning</h3><a href="https://ibb.co/8r0Vv7H"><img src="https://i.ibb.co/HtVQwHj/Screenshot-2022-09-09-at-12-17-41.png" alt="Screenshot-2022-09-09-at-12-17-41" border="0"></a><br>

<h3>Wire Frames</h3>
<a href="https://ibb.co/zfKWkwQ"><img src="https://i.ibb.co/ThzDC5Y/Untitled-Artwork-4.png" alt="Untitled-Artwork-4" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'></a><br/>

<h3>First Design</h3>
<a href="https://ibb.co/ZB90vyC"><img src="https://i.ibb.co/YcgxJvG/Untitled-Artwork-5.png" alt="Untitled-Artwork-5" border="0"></a>
<br>


Description

In this project I wanted to create and deploy an e-commerce website that would allow users to sign-up and view their profiles as well as list items for sale. The name for the website is Discoid which stands for a round disk and our website specialises on the selling and buying of vinyl records. 


Deployment link

Find our website here https://discoidappsei66.herokuapp.com/auth/signin 


Timeframe & Working Team (Solo/Pair/Group)

This was a paired project in which I was working alongside Einar Skreslett, this was my first experience working as a pair and I believe it was a great success. 



Technologies Used

HTML, CSS, JavaScript, multer, Git, GitHub, express, MongoDB, Bootstrap, Heroku



Brief

Design, build and deploy an active and functional website which needs to fulfil these requirements 

Build a web application from scratch must be your own work.
Use Express framework to build your application
Deploy on Heroku so application is live on the web
User must have a profile
User must be able to edit their profile
User must be able to change password
User must be able to sign up
User must be able to sign in
User must be able to sign out
User must be able to create a resource
User must be able to edit a resource
User must be able to view all resources they created
User must be able to view a single resource they created
User must not be able to edit or delete other users' resources


Planning

During our first meeting we had decided on a path we wanted to go down and from then we sketched some ruff wire frames and our ERD that lays out our user paths.   
The ERD shows the relationship that the database on mongoDB will have, from creating an account to listing an item for sale. The one to many relationship is the foundation of most e-commerce as one seller can have many items for sale. 

At this point we also created a Trello Board in order to assign work and keep a track of what jobs we were taking on.  



Build/Code Process 


/layout.ejs

This is our layout.ejs master page. This is the starting page for anyone to enter the site. The navigation allows users to sign-in, sign-up or view the product, I also included a div called welcome that projects a welcome message from Mongobd showing their name and profile pic.



views/index.ejs

Index page renders all the items available  to purchase, for this I turned to Bootstrap, by defining the class as “row row-col 3” it will form rows of 3 that will be automatically rendered from the database.



routes/records.js

This routes file provides the path for record APIs; it is also where I required Multer to allow the adding of album artwork. As seen router.post(“/records/sell" ,  upload.single-(‘image’), recordsCntrl.record_create_post);

 

controller/records.js

In the controller is where we code the functionality of the website as well as implementing the APIs. In this image we can see the application of the Spotify API that allows the website user to search Spotify's database and return them the artist's name, album and year of release. This provides a more fluid user experience.  



Challenges
 

The main challenge I came across during the project was providing the user with an index of all products that users have listed for sale. Within the index.ejs document I had to use a forEach loop to go through the mongoDB database then retrieve all the objects stored within then display them in rows and columns. The whole process of adding and displaying images I had to tackle in this code path, using Multer and Bootstrap I discovered was the quickest way to tackle this challenge. Another challenging part of this project was comets terms with GitHub, as this was my first group project it did take a few tries to go through the commit, pull upstream and merge processes. But at the end we had the whole process down, the main learning point I took away from GitHub was to be in clear communication with our team members and try your best not to work in the same files at the same time to avoid merge conflicts. 




Wins

Overall I believe this project was a great success, as a team we worked well and went above and beyond the brief requirements, this was down to strong planning, good exaction and very late nights. But at the end of the project we both could step back and be proud of what we have created. For example we also created a Cart basket, this takes the products id and stores it in one's cart in their account page. The visual design of the project was also a success and we stuck to our initial concept. 

Key Learnings/Takeaways



This was my first project using an NoSQL database in MongoDB, the processes of updating and adding to the database through the controller I found the most satisfying, however my what I took away from the project was how important it is to communicate with your partner as-well as ask for help, I could not count the amount of time a pair of fresh eyes can save you.


Bugs

The main bug I will be solving in the future will be this issue I’m having with the images saved in the database; it is seen after a few days they no longer show on the deployed website.  


Future Improvements

The one task we put on the possible and unlikely to achieve tile on our Trello Board was creating a payment section for the site. This would really bring together the whole user functionality of the site, going from making an account, login into the account, listing an item for sale, then being able to buy that item and input your banking details, while we knew that it was unlikely we would achieve this in such a short timeframe I do believe that it is the one thing still missing.  
