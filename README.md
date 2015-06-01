===============================================================================
                             CSE134B TEAM BREAD
                              SHINYSTACK - HW4
===============================================================================

# # # # # # # # # # # # # # # 
#      Application Use      #
# # # # # # # # # # # # # # #

Navigation:
	Start with index.html as the login/signup page. All other pages are named
	as such:

	index.html - Login/signup page with demo
	home.html - Home page with Total Coin Value and graphs for all coins
	inventory.html - Inventory page that shows all of your specified metal's info
	view.html - Be able to view a specific bullion and it's details
	new.html - New Item page to add new items to a bullion stack.

# # # # # # # # # # # # # # # 
#   Cross-Platform Issues   #
# # # # # # # # # # # # # # #

Chrome:
	We mainly developed on Chrome, so there were issues with compatibility in
	that department. 

Firefox:
	Firefox also seemed to work perfectly well with no issues. Did not note any
	major problems, if any problems at all, with that browser. The only slight
	difference that we noticed is that the dropdown selector in wire5.html was 
	styled a little bit differently in Firefox (not as nice looking as we would
	have hoped and seen in Chrome).

Safari:
	Here, the dropdown selector in wire5.html was also a little bit different, 
	although not as ugly as in Firefox. One of the major issues we bumped into,
	however, was that a lot of our SVG elements were not showing. This turned
	out to be this really annoying problem that with SVG symbols, all other 
	browsers let you call "use" before declaring the symbol EXCEPT Safari. 
	This required an insane amount of browsing through all the files and 
	doing a move of that line of code below the symbol declaration for pretty
	much every single SVG element we used. Overall, testing on Safari brought
	out the key point that some browsers will care about the order of certain
	markup while others wont. 

	Another thing we noticed is that Safari renders fonts a little bit 
	differently from all the other browsers, and especially font-size. We used
	font-size: 0 to bring some divs flush close to each other but on Safari
	that doesn't work for some strange reason, so we compensated with some
	white-space: nowrap so that our mobile toggling selectors didn't overflow.

Internet Explorer:
	Internet Explorer will not load the Parse data. More on that later in the
	README.



# # # # # # # # # # # # # # # 
#     Validation Issues     #
# # # # # # # # # # # # # # #	

HTML:
	All the HTML validation checked out so there was no problem there.

CSS:
	The errors in CCS validation were broken down into only two problems:

	Property fill Doesn't Exist:
		CSS3 validator doesn't recognize fill as a valid attribute, but
		as we tested it with Chrome, Firefox, Safari, and IE, we're willing
		to forgo solving of this validation flag to implement the fill 
		attribute. After some further research, this seems to be a bug in 
		the validator, much like the one that will be described next.

	Calc() parse errors:
		Anywhere we used calc() in our CSS, the CSS validator threw a parse
		error. However, with research, we determined that this was a bug with 
		the CSS validator. 

		Source: https://www.w3.org/Bugs/Public/show_bug.cgi?id=18913 



# # # # # # # # # # # # # # # # # # # # # # #
#    Implementation Tech and Explanation    #
# # # # # # # # # # # # # # # # # # # # # # #

Inherited the same tech that the previous team used with some additions. Here
are some notes about how we decided to implement certain features of the app.

	1) Because we are inheriting the code from the previous team, we decided
	   that we should use very minimal amount of libraries, and mostly stuck
	   with vanilla js and jQuery to get the job done.

	2) For implementation of the backend, we decided to use Parse because of
	   how fast and easy it is to get up an running. Unfortunately it wasn't
	   until after we started using this technology that we found out that
	   Parse requires a https protocol to run properly on Internet Explorer.
	   This wouldn't be a problem when the code is fully deployed to a server,
	   but when stepping through the website in development the website will
	   not work as intended because we can't get the Parse data in Internet
	   Explorer.

	3) Retrieving the Bid/Ask/Change prices was one hell of a task. First we had
		 to find a website that has this information, which took more than an hour!
		 Then, we need to figure out a way to parse all the information from the 
		 website. Because of Chrome's same-origin policy, we cannot parse htmls
		 directly in javascript. Therefore, I wrote a php script on my server to
		 parse the html instead. It uses curl to retrieve the html, then parse it
		 and create an array of json objects. To make it work, I also added two 
		 headers, one is the content type, used to specify the content format as 
		 json. Secondly, I set the access-control-allow-origin header to accept
		 origin from anywhere, this allows any client side javascript to retrieve
		 the information. Finally, all we had to do is to issue an ajax request 
		 to that php file in our javascript. The returned json objects would contain
		 the information.
		 The url we used to retrieve bid/ask/change prices is:
		 http://www.frankieliu.com/ucsd/cse134b/prices.php
		 The actual php script can be viewed here (view page source):
		 http://www.frankieliu.com/ucsd/cse134b/prices.html

	4) When getting the details (purity, weight, etc) of each type of bullion,
	   we went to the bullion coin Wikipedia page for this data, and hardcoded
	   the information into a json object in bulliondetail.js. We figured that
	   this type of information does not change that frequently and thought
	   this would be best to get the information when the user is adding an
	   new bullion to their stack.

	5) In order to get the historic prices of each bullion metal, we decided to
	   use the Quandl api service as a baseline for each coin value for every
	   specific date. We also use the Quandl data to calculate the approximate
	   value of each coin when adding new coins to the list.

	6) In order to change the metal's and colors on the inventory.html page we
	   decided to use the url query string to set the metal and do a quick
	   data-bind to loop through all the classes that have a data-binded
	   'variable' and replace it with that metal. The user will see flashes
	   of {{metal}} but will quickly go away.

	7) We decided to asynchronously load the data from the Parse database,
	   Quandl database, and the webpage at the same time. However this created
	   problems on what time we could actually start writing to the webpage. In
	   order to fix this, we just added appropriate flags to every one of these
	   events, and whichever task finished last will start loading all the data
	   onto the web page in the form of either graphs, percentages, or lists of
	   bullion a user owns.


	8) Unfortunately, we did not have time to plot the graph for our "My Stack"
	   totals. Considering how many users that would potentially use this application,
	   we felt that it would be impractical to store all of the historic data for the
	   total value of each of the user's bullions. In other words, we couldn't
	   (didn't have enough time) figure out an efficient method/formula to store &
	   calculate the historic price of each of the user's bullions (we tried though!).

	9) We didn't prioritize adding an edit feature for view.html when we were
	   looking at each individual bullion since we didn't see a whole lot of 
	   functionality in implementing this feature. THe only situation would be
	   if data was inputted incorrectly when the coin was first added, but in
	   order to prevent clients from mis-editing it unnecessarily, we decided 
	   not to implement this feature.
=======   


